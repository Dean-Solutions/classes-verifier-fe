import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	public static getInitialProps = getInitialProps;

	public render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
