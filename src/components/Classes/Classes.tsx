import { useState } from 'react';
import {
	Flex,
	Accordion,
	Button,
	Textarea,
	Text,
	CheckIcon,
	Checkbox,
	Select,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { modals } from '@mantine/modals';
import { ConfirmModal } from '../common/modals/ConfirmModal';
import { useGetStudentEnrollments } from '@/query/enrollment.query';
import { type Student } from '@/types/api.types';
import { EmptyState } from '../EmptyState/EmptyState';
import { RequestStatus, RequestType } from '@/types/request.types';
import { EnrollStatus } from '@/types/enrollments.types';
import { useAddRequest } from '@/mutations/request.mutate';
import { useEditEnrollment } from '@/mutations/enrollment.mutate';
import { useGetAllClasses } from '@/query/classes.query';
import { type ClassWithId } from '@/types/classes.types';
import { useGetCurrentSemester } from '@/query/semesters.query';
import { useEnrollmentSearch } from '@/hooks/useEnrollmentSearch';
import { useFiltersStore } from '@/store/filters.store';

type ClassesProps = { student: Student };

export const Classes = (p: ClassesProps) => {
	const t = useTranslations('HomeStudent');
	const c = useTranslations('Common');

	const { data: classes } = useGetAllClasses();
	const { data: currentSemester } = useGetCurrentSemester();
	const classNames: ClassWithId[] =
		classes?.map(({ name, subjectId }) => ({
			value: subjectId.toString(),
			label: name,
		})) || [];
	const [openedClass, setOpenedClass] = useState<string | null>(null);
	const [requestDescription, setRequestDescription] = useState('');
	const [selectValue, setSelectValue] = useState<ClassWithId | null>(null);
	const [checked, setChecked] = useState(false);

	const handleSetSelectValue = (value: string | null) => {
		const selected = classNames.find((item) => item.value === value);
		setSelectValue(selected || null);
	};

	const { mutate: addRequest } = useAddRequest();
	const { mutate: editEnrollment } = useEditEnrollment();

	const { data: studentEnrollments } = useGetStudentEnrollments(
		p.student.indexNumber,
		[EnrollStatus.ACCEPTED, EnrollStatus.PENDING, EnrollStatus.PROPOSED],
		p.student.userId,
		currentSemester?.semesterId,
	);

	const searchValue = useFiltersStore((state) => state.searchValue);

	const { filteredEnrollments } = useEnrollmentSearch(
		searchValue,
		studentEnrollments,
	);

	console.log(filteredEnrollments);

	const handleConfirmButton = (
		userId: number,
		subjectId: number,
		semesterId: number,
		enrollStatus: EnrollStatus,
	) => {
		editEnrollment({
			userId,
			subjectId,
			semesterId,
			enrollStatus,
		});
	};

	const handleAddRequest = (semesterId: number, subjectIdAdd?: string) => {
		const currentTime = new Date();
		if (subjectIdAdd) {
			addRequest({
				description: t('addSubjectText'),
				submissionDate: currentTime.toISOString(),
				requestType: RequestType.ADD,
				senderId: p.student.userId,
				requestEnrolls: [
					{
						semesterId: semesterId,
						requestStatus: RequestStatus.PENDING,
						userId: p.student.userId,
						subjectId: parseInt(subjectIdAdd),
					},
				],
			});
		}
	};

	const handleRemoveRequest = (semesterId: number, subjectIdDelete: number) => {
		const currentTime = new Date();
		addRequest({
			description: requestDescription,
			submissionDate: currentTime.toISOString(),
			requestType: RequestType.DELETE,
			senderId: p.student.userId,
			requestEnrolls: [
				{
					semesterId: semesterId,
					requestStatus: RequestStatus.PENDING,
					userId: p.student.userId,
					subjectId: subjectIdDelete,
				},
			],
		});
	};

	const handleChangeSubjectRequest = (
		semesterId: number,
		subjectIdDelete: number,
		subjectIdAdd?: string,
	) => {
		const currentTime = new Date();
		if (subjectIdAdd) {
			addRequest({
				description: requestDescription,
				submissionDate: currentTime.toISOString(),
				requestType: RequestType.CHANGE_SUBJECT,
				senderId: p.student.userId,
				requestEnrolls: [
					{
						semesterId: semesterId,
						requestStatus: RequestStatus.PENDING,
						userId: p.student.userId,
						subjectId: subjectIdDelete,
						newSubjectId: parseInt(subjectIdAdd),
					},
				],
			});
		}
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
				studentEnrollments?.forEach((item) =>
					handleConfirmButton(
						p.student.userId,
						item.subject.subjectId,
						currentSemester?.semesterId || 1,
						EnrollStatus.ACCEPTED,
					),
				);
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
			{!filteredEnrollments || filteredEnrollments.length === 0 ? (
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
					{filteredEnrollments.map((enrollment) => (
						<Accordion.Item
							key={enrollment.subject.subjectId}
							value={enrollment.subject.name}
							bg='neutral.0'
							mih={70}
							sx={(theme) => ({
								boxShadow: theme.shadows.sm,
								borderRightColor: theme.colors.neutral[3],
								alignContent: 'center',
							})}
						>
							<Accordion.Control fz='md'>
								<Flex direction='row' justify='space-between' align='center'>
									<Text fz='md' fw={700}>
										{enrollment.subject.name}
									</Text>
									{enrollment.enrollStatus === EnrollStatus.ACCEPTED ? (
										<CheckIcon
											color='lime'
											style={{
												width: '20px',
												height: '20px',
											}}
										/>
									) : (
										<Text fz='xl' fw={1000} color='yellow.0'>
											?
										</Text>
									)}
								</Flex>
							</Accordion.Control>
							<Accordion.Panel>
								<Flex direction='column'>
									<Flex direction='row' align='center'>
										<Textarea
											placeholder={t('textPlaceholder')}
											variant='filled'
											radius='md'
											w='50%'
											mr={30}
											minRows={4}
											maxLength={350}
											value={requestDescription}
											onChange={(event) =>
												setRequestDescription(event.currentTarget.value)
											}
										/>
										<Flex direction='column'>
											<Checkbox
												labelPosition='left'
												label={t('deleteCheckboxLabel')}
												color='red.0'
												radius='md'
												size='md'
												checked={checked}
												onChange={(event) =>
													setChecked(event.currentTarget.checked)
												}
											/>
											<Flex direction='row' mt={25} align='center'>
												<Text fz='md'>{t('setSubjectText')}</Text>
												<Select
													placeholder={t('searchPlaceholder')}
													ml={10}
													miw={200}
													maw={350}
													data={classNames}
													value={selectValue ? selectValue.value : null}
													onChange={handleSetSelectValue}
													allowDeselect
													searchable
												/>
											</Flex>
										</Flex>
									</Flex>
									<Button
										color='red.0'
										radius='md'
										size='sm'
										m={8}
										w={130}
										onClick={() => {
											if (checked && selectValue) {
												handleChangeSubjectRequest(
													enrollment.semester.semesterId,
													enrollment.subject.subjectId,
													selectValue?.value,
												);
											} else if (checked) {
												handleRemoveRequest(
													enrollment.semester.semesterId,
													enrollment.subject.subjectId,
												);
											}
										}}
									>
										{t('errorButton')}
									</Button>
								</Flex>
							</Accordion.Panel>
						</Accordion.Item>
					))}

					<Accordion.Item
						value={t('standardRequest')}
						bg='neutral.0'
						mih={70}
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
							</Flex>
						</Accordion.Control>
						<Accordion.Panel>
							<Flex direction='column'>
								<Flex direction='row' align='center'>
									<Textarea
										placeholder={t('textPlaceholder')}
										variant='filled'
										radius='md'
										w='50%'
										mr={30}
										minRows={4}
										maxLength={350}
										value={requestDescription}
										onChange={(event) =>
											setRequestDescription(event.currentTarget.value)
										}
									/>
									<Flex direction='row' mt={25} align='center'>
										<Text fz='md'>{t('addSubjectText')}</Text>
										<Select
											placeholder={t('searchPlaceholder')}
											ml={10}
											miw={200}
											maw={350}
											data={classNames}
											value={selectValue ? selectValue.value : null}
											onChange={handleSetSelectValue}
											allowDeselect
											searchable
										/>
									</Flex>
								</Flex>
								<Button
									color='red.0'
									radius='md'
									size='sm'
									m={8}
									w={130}
									onClick={() => {
										handleAddRequest(
											currentSemester?.semesterId || 1,
											selectValue?.value,
										);
									}}
								>
									{t('errorButton')}
								</Button>
							</Flex>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			)}
		</Flex>
	);
};
