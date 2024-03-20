import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Text } from '@mantine/core';
import { getStaticProps } from '@/pages/index';

export default function Home() {
	return (
		<AppLayout>
			<Text>src/pages.tsx</Text>
		</AppLayout>
	);
}

export { getStaticProps };
