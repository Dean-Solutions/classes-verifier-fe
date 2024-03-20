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

const inter = Inter({
	subsets: ['latin'],
});

const MyApp: AppType<{
	session: Session | null;
	messages?: AbstractIntlMessages;
}> = ({ Component, pageProps: { session, messages, ...pageProps } }) => {
	const router = useRouter();

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<NextIntlClientProvider
				locale={router.locale}
				messages={messages}
				timeZone='Europe/Warsaw'
			>
				<SessionProvider session={session}>
					<main className={inter.className}>
						<Component {...pageProps} />
					</main>
				</SessionProvider>
			</NextIntlClientProvider>
		</MantineProvider>
	);
};

export { getStaticProps };
export default MyApp;

