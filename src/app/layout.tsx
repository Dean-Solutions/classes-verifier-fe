import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { Inter } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata = {
	title: 'Classes Verifier',
	description: 'Designed and Developed by Dean Solutions',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='pl'>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}

