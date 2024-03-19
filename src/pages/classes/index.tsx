import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Text } from '@mantine/core';
import { getStaticProps } from '@/pages/index';

export default function Classes() {
	return (
		<AppLayout>
			<Text>src/pages/classes/index.tsx</Text>
		</AppLayout>
	);
}

export { getStaticProps };
