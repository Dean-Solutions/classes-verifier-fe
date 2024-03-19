import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Text } from '@mantine/core';
import { getStaticProps } from '@/pages/index';

export default function Students() {
	return (
		<AppLayout>
			<Text>src/pages/students/index.tsx</Text>
		</AppLayout>
	);
}

export { getStaticProps };
