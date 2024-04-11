import {
	Flex,
	rem,
	Button,
	Grid,
	Text,
	Divider,
	ScrollArea,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useGetRequests } from '@/query/request.query';
import { EmptyState } from '../EmptyState/EmptyState';
import { type RequestEnroll, type UserRequest } from '@/types/request.types';
import { useEditRequest } from '@/mutations/request.mutate';

export const RequestsDean = () => {
	const t = useTranslations('Requests');

	const { data: studentsRequests } = useGetRequests();
	const { mutate: editRequest } = useEditRequest();

	const handleSendRequest = (
		userId: number | undefined,
		subjectId: number | undefined,
		status: string,
	) => {
		const currentTime = new Date();
		const requestEnrolls: RequestEnroll[] = [
			{
				semesterId: 1,
				requestStatus: status,
				userId: userId,
				subjectId: subjectId,
			},
		];
		const newRequest: UserRequest = {
			description: 'Prosze dla ciebie studencie',
			submissionDate: currentTime.toISOString(),
			requestType: 'ADD',
			// dziekan
			senderId: 2,
			requestEnrolls: requestEnrolls,
		};
		editRequest(newRequest);
	};

	return (
		<>
			{!studentsRequests?.content || studentsRequests?.content.length === 0 ? (
				<EmptyState
					title={t('emptyTitle')}
					description={t('emptyDescription')}
				/>
			) : (
				<Grid p={8}>
					{studentsRequests.content.map((request, index) => (
						<Grid.Col span={4} key={index}>
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
								<Text fz='xl' mt='2%' ml='5%'>
									{request.requestEnrollments[0]?.subject.name}
								</Text>
								<Text fz='xs' ml='5%'>
									{request.requestEnrollments[0]?.user.firstName +
										' ' +
										request.requestEnrollments[0]?.user.lastName +
										' | ' +
										request.requestEnrollments[0]?.user.indexNumber +
										' | ' +
										request.requestEnrollments[0]?.user.semester +
										' semestr'}
								</Text>
								<Divider pb='xs' w='90%' ml='5%' />
								<ScrollArea h={175} ml={15} mr={15}>
									<Text fz='s'>{request.description}</Text>
								</ScrollArea>
								<Flex justify='flex-end' align='center' direction='row'>
									<Button
										color='green.0'
										radius='md'
										size='xs'
										m={10}
										mb={10}
										onClick={() =>
											handleSendRequest(
												request.requestEnrollments[0]?.user.userId,
												request.requestEnrollments[0]?.subject.subjectId,
												'ACCEPTED',
											)
										}
									>
										{t('confirmButton')}
									</Button>
									<Button
										color='red.0'
										radius='md'
										size='xs'
										m={10}
										mb={10}
										onClick={() =>
											handleSendRequest(
												request.requestEnrollments[0]?.user.userId,
												request.requestEnrollments[0]?.subject.subjectId,
												'REJECTED',
											)
										}
									>
										{t('rejectButton')}
									</Button>
								</Flex>
							</Flex>
						</Grid.Col>
					))}
				</Grid>
			)}
		</>
	);
};
