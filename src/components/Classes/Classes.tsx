import { useState } from 'react';
import {
	Flex,
	Accordion,
	rem,
	Button,
	Textarea,
	Text,
	CheckIcon,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { modals } from '@mantine/modals';
import { ConfirmModal } from '../common/modals/ConfirmModal';
import { useGetStudentEnrollments } from '@/query/enrollment.query';
import { type Student } from '@/types/api.types';
import { EmptyState } from '../EmptyState/EmptyState';
import { type RequestEnroll, type UserRequest } from '@/types/request.types';
import { EnrollStatus } from '@/types/enrollments.types';
import { useAddRequest } from '@/mutations/request.mutate';

type ClassesProps = { student: Student };

export const Classes = (p: ClassesProps) => {
	const t = useTranslations('HomeStudent');
	const c = useTranslations('Common');

	const [confirmed, setConfirmed] = useState(false);
	const [openedClass, setOpenedClass] = useState<string | null>(null);
	const [requestDescription, setRequestDescription] = useState('');
	const { mutate: addRequest } = useAddRequest();

	const { data: studentEnrollments } = useGetStudentEnrollments(
		p.student.indexNumber,
		p.student.userId,
		1,
		[EnrollStatus.ACCEPTED, EnrollStatus.PENDING, EnrollStatus.PROPOSED],
	);

	const handleSendRequest = (subjectId: number, semesterId?: number) => {
		const currentTime = new Date();
		const requestEnrolls: RequestEnroll[] = [
			{
				semesterId: semesterId,
				requestStatus: 'PENDING',
				userId: p.student.userId,
				subjectId: subjectId,
			},
		];
		const newRequest: UserRequest = {
			description: requestDescription,
			submissionDate: currentTime.toISOString(),
			requestType: 'ADD',
			senderId: p.student.userId,
			requestEnrolls: requestEnrolls,
		};
		addRequest(newRequest);
	};

	const openModal = () =>
		modals.openConfirmModal({
			withCloseButton: false,
			centered: true,
			children: (
				<ConfirmModal title={t('warning')} description={t('warningText')} />
			),
			labels: { confirm: c('confirm'), cancel: c('cancel') },
			confirmProps: { color: 'green.0' },
			cancelProps: { color: 'blue.5' },
			onConfirm: () => {
				setConfirmed(true);
			},
		});

	return (
		<Flex direction='column' p={8}>
			<Flex justify='flex-start' align='center' direction='row'>
				<Button
					color='green.0'
					radius='md'
					size='md'
					m={10}
					mb={20}
					onClick={() => openModal()}
				>
					{t('confirmButton')}
				</Button>
			</Flex>
			{!studentEnrollments || studentEnrollments.length === 0 ? (
				<EmptyState
					title={t('emptyTitle')}
					description={t('emptyDescription')}
				/>
			) : (
				<Accordion
					variant='separated'
					value={openedClass}
					onChange={setOpenedClass}
				>
					{studentEnrollments.map((enrollment) => (
						<Accordion.Item
							key={enrollment.subject.subjectId}
							value={enrollment.subject.name}
							bg='neutral.0'
							mih={rem(70)}
							sx={(theme) => ({
								boxShadow: theme.shadows.sm,
								borderRightColor: theme.colors.neutral[3],
								alignContent: 'center',
							})}
						>
							<Accordion.Control fz='md'>
								<Flex direction='row' justify='space-between'>
									<Text fz='md' fw={700}>
										{enrollment.subject.name}
									</Text>
									{confirmed && (
										<CheckIcon
											color='lime'
											style={{
												width: '20px',
												height: '20px',
											}}
										/>
									)}
								</Flex>
							</Accordion.Control>
							<Accordion.Panel>
								<Flex p='xs' direction='column'>
									<Textarea
										placeholder={t('textPlaceholder')}
										variant='filled'
										radius='md'
										w='100%'
										minRows={4}
										maxLength={350}
										value={requestDescription}
										onChange={(event) =>
											setRequestDescription(event.currentTarget.value)
										}
									/>
									<Button
										color='red.0'
										radius='md'
										size='sm'
										m={8}
										w={100}
										onClick={() => {
											handleSendRequest(
												enrollment.subject.subjectId,
												enrollment.semester.semesterId,
											);
										}}
									>
										{t('errorButton')}
									</Button>
								</Flex>
							</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			)}
			<Accordion variant='separated' pt='lg'>
				<Accordion.Item
					value={t('standardRequest')}
					bg='neutral.0'
					mih={rem(70)}
					sx={(theme) => ({
						boxShadow: theme.shadows.sm,
						borderRightColor: theme.colors.neutral[3],
						alignContent: 'center',
					})}
				>
					<Accordion.Control fz='md'>
						<Flex direction='row' justify='space-between'>
							<Text fz='md' fw={700}>
								{t('standardRequest')}
							</Text>
							{confirmed && (
								<CheckIcon
									color='lime'
									style={{
										width: '20px',
										height: '20px',
									}}
								/>
							)}
						</Flex>
					</Accordion.Control>
					<Accordion.Panel>
						<Flex p='xs' direction='column'>
							<Textarea
								placeholder={t('textPlaceholder')}
								variant='filled'
								radius='md'
								w='100%'
								minRows={4}
								maxLength={350}
								onChange={() => setRequestDescription}
							/>
							<Button
								color='red.0'
								radius='md'
								size='sm'
								m={8}
								w={100}
								// tyle sie pozmienialo na tym backendzie nagle pol ze mnie cos trafi zara nie
								// onClick={handleSendRequest(

								// )}
							>
								{t('errorButton')}
							</Button>
						</Flex>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Flex>
	);
};
