import { Routes } from '@/types/routes';
import { type GetServerSidePropsContext } from 'next';
import {
	type User,
	getServerSession,
	type DefaultSession,
	type NextAuthOptions,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
	handleJWTCallback,
	processSession,
} from './utils/sessionHandlers.util';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	type UserRole = 'dean' | 'student';

	interface Credentials {
		email: string;
		password: string;
	}

	interface Session extends DefaultSession {
		user: DefaultSession['user'] & {
			id: string;
			role: UserRole;
		};
		expires_at: number;
		error: string;
	}

	// interface User {
	//   // ...other properties
	//   // role: UserRole;
	// }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	pages: {
		signIn: Routes.SignIn,
		signOut: Routes.Logout,
	},
	callbacks: {
		session: processSession,
		jwt: handleJWTCallback,
		redirect({ baseUrl }) {
			return baseUrl;
		},
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				// Add logic here to look up the user from the credentials supplied

				const user = [
					{
						id: '1',
						firstName: 'Paweł',
						lastName: 'Motyka',
						email: 'pgl@gmail.com',
						role: 'student',
					},
					{
						id: '2',
						firstName: 'John',
						lastName: 'Doe',
						email: 'dziekan@gmail.com',
						role: 'dean',
					},
				];

				if (user && credentials?.email === 'admin@agh.edu.pl') {
					// Any object returned will be saved in `user` property of the JWT
					return user[1] as User;
				} else if (user && credentials?.email === 'user@agh.edu.pl') {
					return user[0] as User;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext['req'];
	res: GetServerSidePropsContext['res'];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
