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
import { useGetLoggedStudent } from '@/query/students.query';

const RequestsPage: NextPage = () => {
	const t = useTranslations('Requests');
	const session = useSession();
	const role = session.data?.user.role || 'STUDENT';
	const { data: student } = useGetLoggedStudent();
	const h = useTranslations('HomeStudent');

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
					showSearch={true}
				/>
				{role === 'DEAN' ? (
					<>
						{!student ? (
							<Flex justify='center'>{h('studentNotFound')}</Flex>
						) : (
							<RequestsDean dean={student} />
						)}
					</>
				) : (
					<>
						{!student ? (
							<Flex justify='center'>{h('studentNotFound')}</Flex>
						) : (
							<RequestsStudent student={student} />
						)}
					</>
				)}
			</Flex>
		</AppLayout>
	);
};

export { getServerSideProps };

export default RequestsPage;
