import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Flex } from '@mantine/core';
import { type NextPage } from 'next';
import React from 'react';
import Header from '@/components/Header/Header';
import { useTranslations } from 'next-intl';
import { RequestsStudent } from '@/components/Requests/RequestsStudent';
import { RequestsDean } from '@/components/Requests/RequestsDean';
import { useStudentsStore } from '@/store/students.store';
import { getServerSideProps } from '@/server/utils/protectedServerSide.util';

const RequestsPage: NextPage = () => {
	const t = useTranslations('Requests');
	const { role } = useStudentsStore((state) => ({ role: state.role }));

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				{role === 'dean' ? <RequestsDean /> : <RequestsStudent />}
			</Flex>
		</AppLayout>
	);
};

export { getServerSideProps };

export default RequestsPage;
