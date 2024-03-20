import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Text } from '@mantine/core';
import { type NextPage } from 'next';
import React from 'react';
import { getStaticProps } from '@/pages/index';

const RequestsPage: NextPage = () => {
	return (
		<AppLayout>
			<Text> src/pages/requests/index.tsx</Text>
		</AppLayout>
	);
};

export { getStaticProps };

export default RequestsPage;
