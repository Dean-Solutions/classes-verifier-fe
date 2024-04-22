import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { Inter } from 'next/font/google';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { getStaticProps } from '@/pages/index';

import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';

const inter = Inter({
	subsets: ['latin'],
});

const queryClient = new QueryClient();

const MyApp: AppType<{
	session: Session | null;
	messages?: AbstractIntlMessages;
}> = ({ Component, pageProps: { session, messages, ...pageProps } }) => {
	const router = useRouter();

	return (
		<MantineProvider
			theme={theme}
			withGlobalStyles
			withNormalizeCSS
			withCSSVariables
		>
			<QueryClientProvider client={queryClient}>
				<NextIntlClientProvider
					locale={router.locale}
					messages={messages}
					timeZone='Europe/Warsaw'
				>
					<SessionProvider session={session}>
						<ModalsProvider>
							<DatesProvider settings={{ locale: 'pl' }}>
								<main className={inter.className}>
									<Notifications autoClose={3500} />
									<Component {...pageProps} />
								</main>
							</DatesProvider>
						</ModalsProvider>
					</SessionProvider>
				</NextIntlClientProvider>
			</QueryClientProvider>
		</MantineProvider>
	);
};

export { getStaticProps };
export default MyApp;
