import { useGetUserRequests } from '@/query/request.query';
import {
	Flex,
	rem,
	Grid,
	Text,
	Divider,
	Badge,
	ScrollArea,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { EmptyState } from '../EmptyState/EmptyState';
import { getColor } from '@/utils/colors.util';
import { type Student } from '@/types/api.types';
import { useFiltersStore } from '@/store/filters.store';
import { useStudentRequestsSearch } from '@/hooks/useStudentRequestSearch';

type RequestsProps = { student: Student };

export const RequestsStudent = (p: RequestsProps) => {
	const t = useTranslations('Requests');
	const { data: userRequests } = useGetUserRequests(p.student.userId);

	const searchValue = useFiltersStore((state) => state.searchValue);
	const { filteredRequests } = useStudentRequestsSearch(
		searchValue,
		userRequests,
	);

	return (
		<>
			{!filteredRequests || filteredRequests.length === 0 ? (
				<EmptyState
					title={t('emptyTitle')}
					description={t('emptyDescription')}
				/>
			) : (
				<Grid p={8}>
					{filteredRequests.map((request) => (
						<Grid.Col span={4} key={request.requestId}>
							<Flex
								h={300}
								bg='neutral.0'
								direction='column'
								sx={(theme) => ({
									boxShadow: theme.shadows.md,
									borderRightColor: theme.colors.neutral[3],
									borderRadius: rem(10),
								})}
							>
								<Text fz='xl' mt='5%' ml='5%'>
									{request.requestEnrollments[0]?.subject.name}
								</Text>
								<Badge
									color={getColor(request.requestEnrollments[0]?.requestStatus)}
									size='md'
									radius='lg'
									variant='filled'
									mb={15}
									ml={15}
									w={120}
								>
									{request.requestEnrollments[0]?.requestStatus}
								</Badge>
								<Divider pb='md' w='90%' ml='5%' />
								<ScrollArea h={175} ml={15} mr={15}>
									<Text fz='s'>{request.description}</Text>
								</ScrollArea>
							</Flex>
						</Grid.Col>
					))}
				</Grid>
			)}
		</>
	);
};
