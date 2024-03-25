import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Text, Flex } from '@mantine/core';
import { type NextPage } from 'next';
import React from 'react';
import { getStaticProps } from '@/pages/index';
import Header from '@/components/Header/Header';
import { useTranslations } from 'next-intl';
import { RequestsStudent } from '@/components/Requests/RequestsStudent'; 
import { RequestsDean } from '@/components/Requests/RequestsDean'; 

const RequestsPage: NextPage = () => {
	const t = useTranslations('Requests');

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				<RequestsDean />
			</Flex>
		</AppLayout>
	);
};

export { getStaticProps };

export default RequestsPage;
