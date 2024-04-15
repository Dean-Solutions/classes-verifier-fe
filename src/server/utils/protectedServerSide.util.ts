/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Routes } from '@/types/routes';
import { type GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '../auth';
import { REFRESH_ACCESS_TOKEN_ERROR } from './sessionHandlers.util';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerAuthSession({
		req: context.req,
		res: context.res,
	});
	if (!session) {
		return {
			redirect: { destination: Routes.SignIn },
			props: {
				messages: (await import(`/src/messages/${context.locale}.json`))
					.default,
			},
		};
	} else {
		if (
			session.error === REFRESH_ACCESS_TOKEN_ERROR ||
			session.expires_at < Date.now()
		) {
			return {
				redirect: { destination: Routes.Logout },
				props: {
					messages: (await import(`/src/messages/${context.locale}.json`))
						.default,
				},
			};
		}
	}

	return {
		props: {
			messages: (await import(`/src/messages/${context.locale}.json`)).default,
		},
	};
}
