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
import { RequestStatus, RequestType } from '@/types/request.types';
import { useEditRequest } from '@/mutations/request.mutate';
import { type Student, type Request } from '@/types/api.types';
import {
	useAddEnrollment,
	useDeleteEnrollment,
} from '@/mutations/enrollment.mutate';
import { EnrollStatus } from '@/types/enrollments.types';

type RequestsProps = { dean: Student };

export const RequestsDean = (p: RequestsProps) => {
	const t = useTranslations('Requests');

	const { data: studentsRequests } = useGetRequests();
	const { mutate: editRequest } = useEditRequest();
	const { mutate: addEnrollment } = useAddEnrollment();
	const { mutate: deleteEnrollment } = useDeleteEnrollment();

	const handleEditRequest = (
		request: Request,
		userId: number,
		subjectId: number,
		status: RequestStatus,
		requestEnrollId: number,
		newSubjectId?: number,
	) => {
		const currentTime = new Date();
		if (status === RequestStatus.REJECTED) {
			editRequest({
				requestId: request.requestId,
				description: t('rejectMessage'),
				submissionDate: currentTime.toISOString(),
				requestType: RequestType.ACCEPT,
				senderId: p.dean.userId,
				requestEnrolls: [
					{
						requestEnrollId: requestEnrollId,
						semesterId: 1,
						requestStatus: status,
						userId: userId,
						subjectId: subjectId,
					},
				],
			});
		}
		if (status === RequestStatus.ACCEPTED) {
			editRequest({
				requestId: request.requestId,
				description: t('acceptMessage'),
				submissionDate: currentTime.toISOString(),
				requestType: RequestType.ACCEPT,
				senderId: p.dean.userId,
				requestEnrolls: [
					{
						requestEnrollId: requestEnrollId,
						semesterId: 1,
						requestStatus: status,
						userId: userId,
						subjectId: subjectId,
					},
				],
			});

			if (request.requestType === RequestType.ADD) {
				addEnrollment({
					userId: userId,
					subjectId: subjectId,
					semesterId: 1,
					enrollStatus: EnrollStatus.PROPOSED,
				});
			} else if (request.requestType === RequestType.DELETE) {
				deleteEnrollment({
					userId: userId,
					subjectId: subjectId,
					semesterId: 1,
					enrollStatus: EnrollStatus.REJECTED,
				});
			} else if (request.requestType === RequestType.CHANGE_SUBJECT) {
				if (newSubjectId) {
					addEnrollment({
						userId: userId,
						subjectId: newSubjectId,
						semesterId: 1,
						enrollStatus: EnrollStatus.PROPOSED,
					});
				}
				deleteEnrollment({
					userId: userId,
					subjectId: subjectId,
					semesterId: 1,
					enrollStatus: EnrollStatus.REJECTED,
				});
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
														RequestStatus.ACCEPTED,
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
														RequestStatus.REJECTED,
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
