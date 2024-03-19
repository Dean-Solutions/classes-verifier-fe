/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Text } from '@mantine/core';

export default function Home() {
	return (
		<AppLayout>
			<Text>src/pages.tsx</Text>
		</AppLayout>
	);
}

export async function getStaticProps(context: any) {
	return {
		props: {
			messages: (await import(`/src/messages/${context.locale}.json`)).default,
		},
	};
}

