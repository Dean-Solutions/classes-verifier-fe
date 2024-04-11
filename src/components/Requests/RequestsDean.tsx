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
import { type Request } from '@/types/api.types';
import {
	useAddEnrollment,
	useEditEnrollment,
} from '@/mutations/enrollment.mutate';
import { EnrollStatus, type PostEnroll } from '@/types/enrollments.types';

export const RequestsDean = () => {
	const t = useTranslations('Requests');

	const { data: studentsRequests } = useGetRequests();
	const { mutate: editRequest } = useEditRequest();
	const { mutate: editEnrollment } = useEditEnrollment();
	const { mutate: addEnrollment } = useAddEnrollment();

	const handleEditRequest = (
		request: Request,
		userId: number,
		subjectId: number,
		status: string,
		requestEnrollId: number | undefined,
	) => {
		const currentTime = new Date();
		const requestEnrolls: RequestEnroll[] = [
			{
				requestEnrollId: requestEnrollId,
				semesterId: 1,
				requestStatus: status,
				userId: userId,
				subjectId: subjectId,
			},
		];
		if (status === 'REJECTED') {
			const changedRequest: UserRequest = {
				requestId: request.requestId,
				description: t('rejectMessage'),
				submissionDate: currentTime.toISOString(),
				requestType: 'ACCEPT',
				// dziekan
				senderId: 4,
				requestEnrolls: requestEnrolls,
			};
			editRequest(changedRequest);
		}
		if (status === 'ACCEPTED') {
			const changedRequest: UserRequest = {
				requestId: request.requestId,
				description: t('acceptMessage'),
				submissionDate: currentTime.toISOString(),
				requestType: 'ACCEPT',
				// dziekan
				senderId: 4,
				requestEnrolls: requestEnrolls,
			};
			editRequest(changedRequest);

			if (request.requestType === 'ADD') {
				const enrollment: PostEnroll = {
					userId: userId,
					subjectId: subjectId,
					semesterId: 1,
					enrollStatus: EnrollStatus.PROPOSED,
				};
				addEnrollment(enrollment);
			}
			if (request.requestType === 'DELETE') {
				const enrollment: PostEnroll = {
					userId: userId,
					subjectId: subjectId,
					semesterId: 1,
					enrollStatus: EnrollStatus.REJECTED,
				};
				editEnrollment(enrollment);
			}
		}
	};

	return (
		<>
			{!studentsRequests || studentsRequests.length === 0 ? (
				<EmptyState
					title={t('emptyTitle')}
					description={t('emptyDescription')}
				/>
			) : (
				<Grid p={8}>
					{studentsRequests.map((request, index) => (
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
								{request.requestEnrollments.map((re) => (
									<>
										<Text fz='xl' mt='2%' ml='5%'>
											{re.subject.name}
										</Text>
										<Text fz='xs' ml='5%'>
											{re.user.firstName +
												' ' +
												re.user.lastName +
												' | ' +
												re.user.indexNumber +
												' | ' +
												re.user.semester +
												' semestr'}
										</Text>
										<Divider pb='xs' w='90%' ml='5%' />
										<ScrollArea h={175} ml={15} mr={15}>
											<Text fz='s'>{request.description}</Text>
										</ScrollArea>
										<Flex justify='center' align='center' direction='row'>
											<Button
												color='green.0'
												radius='md'
												size='xs'
												m={10}
												mb={10}
												onClick={() =>
													handleEditRequest(
														request,
														re.user.userId,
														re.subject.subjectId,
														'ACCEPTED',
														re.requestEnrollId,
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
													handleEditRequest(
														request,
														re.user.userId,
														re.subject.subjectId,
														'REJECTED',
														re.requestEnrollId,
													)
												}
											>
												{t('rejectButton')}
											</Button>
										</Flex>
									</>
								))}
							</Flex>
						</Grid.Col>
					))}
				</Grid>
			)}
		</>
	);
};
