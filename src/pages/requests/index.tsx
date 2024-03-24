import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Text, Flex } from '@mantine/core';
import { type NextPage } from 'next';
import React from 'react';
import { getStaticProps } from '@/pages/index';
import Header from '@/components/Header/Header';
import { useTranslations } from 'next-intl';
import { Requests } from '@/components/Requests/Requests'; 

const RequestsPage: NextPage = () => {
	const t = useTranslations('RequestsStudent');

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				<Requests />
			</Flex>
		</AppLayout>
	);
};

export { getStaticProps };

export default RequestsPage;
