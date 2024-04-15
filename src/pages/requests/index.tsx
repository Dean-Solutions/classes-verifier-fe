import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Flex } from '@mantine/core';
import { type NextPage } from 'next';
import React from 'react';
import Header from '@/components/Header/Header';
import { useTranslations } from 'next-intl';
import { RequestsStudent } from '@/components/Requests/RequestsStudent';
import { RequestsDean } from '@/components/Requests/RequestsDean';
import { getServerSideProps } from '@/server/utils/protectedServerSide.util';
import { useSession } from 'next-auth/react';

const RequestsPage: NextPage = () => {
	const t = useTranslations('Requests');
	const session = useSession();
	const role = session.data?.user.role || 'STUDENT';

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				{role === 'DEAN' ? <RequestsDean /> : <RequestsStudent />}
			</Flex>
		</AppLayout>
	);
};

export { getServerSideProps };

export default RequestsPage;
