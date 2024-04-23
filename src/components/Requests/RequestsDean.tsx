import {
	Flex,
	rem,
	Button,
	Grid,
	Text,
	Divider,
	ScrollArea,
	Badge,
	Accordion,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useGetRequests } from '@/query/request.query';
import { EmptyState } from '../EmptyState/EmptyState';
import { RequestStatus, RequestType } from '@/types/request.types';
import { useEditRequest } from '@/mutations/request.mutate';
import { type Student, type Request } from '@/types/api.types';
import {
	useDeleteEnrollment,
	useEditEnrollment,
	useAddEnrollment,
} from '@/mutations/enrollment.mutate';
import { EnrollStatus } from '@/types/enrollments.types';
import { useGetCurrentSemester } from '@/query/semesters.query';
import { getColor } from '@/utils/colors.util';

type RequestsProps = { dean: Student };

export const RequestsDean = (p: RequestsProps) => {
	const t = useTranslations('Requests');

	const { data: studentsRequests } = useGetRequests();
	const { data: currentSemester } = useGetCurrentSemester();
	const { mutate: editRequest } = useEditRequest();
	const { mutate: editEnrollment } = useEditEnrollment();
	const { mutate: deleteEnrollment } = useDeleteEnrollment();
	const { mutate: addEnrollment } = useAddEnrollment();

	const pendingRequests = studentsRequests?.filter(
		(request) =>
			request.requestEnrollments.length > 0 &&
			request.requestEnrollments[0]!.requestStatus === RequestStatus.PENDING,
	);

	const finishedRequests = studentsRequests?.filter(
		(request) =>
			request.requestEnrollments.length > 0 &&
			request.requestEnrollments[0]!.requestStatus !== RequestStatus.PENDING,
	);

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
			editRequest(
				{
					requestId: request.requestId,
					description: t('rejectMessage'),
					submissionDate: currentTime.toISOString(),
					requestType: request.requestType,
					senderId: p.dean.userId,
					requestEnrolls: [
						{
							requestEnrollId: requestEnrollId,
							semesterId: currentSemester?.semesterId || 1,
							requestStatus: status,
							userId: userId,
							subjectId: subjectId,
							newSubjectId: newSubjectId || undefined,
						},
					],
				},
				{
					onSuccess: () => {
						if (request.requestType === RequestType.ADD) {
							deleteEnrollment({
								userId: userId,
								subjectId: subjectId,
								semesterId: currentSemester?.semesterId || 1,
								enrollStatus: EnrollStatus.REJECTED,
							});
						} else if (request.requestType === RequestType.DELETE) {
							editEnrollment({
								userId: userId,
								subjectId: subjectId,
								semesterId: currentSemester?.semesterId || 1,
								enrollStatus: EnrollStatus.PENDING,
							});
						} else if (request.requestType === RequestType.CHANGE_SUBJECT) {
							editEnrollment({
								userId: userId,
								subjectId: subjectId,
								semesterId: currentSemester?.semesterId || 1,
								enrollStatus: EnrollStatus.PENDING,
							});
						}
					},
				},
			);
		}
		if (status === RequestStatus.ACCEPTED) {
			editRequest(
				{
					requestId: request.requestId,
					description: t('acceptMessage'),
					submissionDate: currentTime.toISOString(),
					requestType: RequestType.ACCEPT,
					senderId: p.dean.userId,
					requestEnrolls: [
						{
							requestEnrollId: requestEnrollId,
							semesterId: currentSemester?.semesterId || 1,
							requestStatus: status,
							userId: userId,
							subjectId: subjectId,
							newSubjectId: newSubjectId || undefined,
						},
					],
				},
				{
					onSuccess: () => {
						if (request.requestType === RequestType.ADD) {
							editEnrollment({
								userId: userId,
								subjectId: subjectId,
								semesterId: currentSemester?.semesterId || 1,
								enrollStatus: EnrollStatus.PENDING,
							});
						} else if (request.requestType === RequestType.DELETE) {
							deleteEnrollment({
								userId: userId,
								subjectId: subjectId,
								semesterId: currentSemester?.semesterId || 1,
								enrollStatus: EnrollStatus.REJECTED,
							});
						} else if (request.requestType === RequestType.CHANGE_SUBJECT) {
							if (newSubjectId) {
								addEnrollment({
									userId: userId,
									subjectId: newSubjectId,
									semesterId: currentSemester?.semesterId || 1,
									enrollStatus: EnrollStatus.PENDING,
								});
								console.log('Added: ' + newSubjectId);
							}
							deleteEnrollment({
								userId: userId,
								subjectId: subjectId,
								semesterId: currentSemester?.semesterId || 1,
								enrollStatus: EnrollStatus.REJECTED,
							});
						}
					},
				},
			);
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
				<Flex direction='column' w='100%'>
					<Accordion
						w='100%'
						bg='brown.0'
						sx={(theme) => ({
							borderRadius: rem(6),
							boxShadow: theme.shadows.sm,
							overflow: 'hidden',
						})}
						defaultValue='1'
					>
						<Accordion.Item value='1'>
							<Accordion.Control
								sx={{
									':hover': {
										backgroundColor: 'brown.1',
									},
								}}
							>
								<Text w='100%' fw='bold' fz='lg'>
									{t('pendingRequests')}
								</Text>
							</Accordion.Control>
							<Accordion.Panel>
								{pendingRequests && pendingRequests.length > 0 && (
									<Grid p={8}>
										{pendingRequests.map((request, index) => (
											<Grid.Col span={4} key={index}>
												<Flex
													h={300}
													bg='neutral.0 '
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
															<Text fz='xs' ml='5%' mb={5}>
																{re.user.firstName +
																	' ' +
																	re.user.lastName +
																	' | ' +
																	re.user.indexNumber +
																	' | ' +
																	re.user.semester +
																	' semestr'}
															</Text>
															<Badge
																color={getColor(re.requestStatus)}
																size='md'
																radius='lg'
																variant='filled'
																ml={15}
																w={100}
															>
																{re.requestStatus}
															</Badge>
															<Divider pb='xs' w='90%' ml='5%' mt={15} />
															<ScrollArea h={175} ml={15} mr={15}>
																<Text fz='s'>{request.description}</Text>
															</ScrollArea>
															<Flex
																justify='center'
																align='center'
																direction='row'
															>
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
																			re.newSubjectId,
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
																			re.newSubjectId,
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
							</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item value='2'>
							<Accordion.Control
								sx={{
									':hover': {
										backgroundColor: 'brown.1',
									},
								}}
							>
								<Text w='100%' fw='bold' fz='lg'>
									{t('finishedRequests')}
								</Text>
							</Accordion.Control>
							<Accordion.Panel>
								{finishedRequests && finishedRequests.length > 0 && (
									<Grid p={8}>
										{finishedRequests.map((request, index) => (
											<Grid.Col span={4} key={index}>
												<Flex
													h={300}
													bg='neutral.0 '
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
															<Text fz='xs' ml='5%' mb={5}>
																{re.user.firstName +
																	' ' +
																	re.user.lastName +
																	' | ' +
																	re.user.indexNumber +
																	' | ' +
																	re.user.semester +
																	' semestr'}
															</Text>
															<Badge
																color={getColor(
																	request.requestEnrollments[0]?.requestStatus,
																)}
																size='md'
																radius='lg'
																variant='filled'
																ml={15}
																w={100}
															>
																{request.requestEnrollments[0]?.requestStatus}
															</Badge>
															<Divider pb='xs' w='90%' ml='5%' mt={15} />
															<ScrollArea h={175} ml={15} mr={15}>
																<Text fz='s'>{request.description}</Text>
															</ScrollArea>
														</>
													))}
												</Flex>
											</Grid.Col>
										))}
									</Grid>
								)}
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				</Flex>
			)}
		</>
	);
};
