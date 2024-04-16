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
import { env } from '@/env';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	type UserRole = 'DEAN' | 'STUDENT';

	interface Session extends DefaultSession {
		user: DefaultSession['user'] & User;
		expires_at: number;
		accessToken: string;
		refreshToken: string;
		error: string;
	}

	interface User {
		firstName: string;
		lastName: string;
		indexNumber: string;
		email: string;
		semester: 0;
		eduPath: string;
		status: string;
		role: UserRole;
		access_token: string;
		refresh_token: string;
	}
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
				const res = await fetch(`${env.API_URL}/auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(credentials),
				});

				if (!res.ok) {
					console.log('error');
					return null;
				}

				const user: User = await res.json();

				return user;
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
