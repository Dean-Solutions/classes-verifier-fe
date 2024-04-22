import { useGetClassesStudentsByTag } from '@/query/classes.query';
import {
	Flex,
	Accordion,
	Text,
	ScrollArea,
	Divider,
	Button,
	Autocomplete,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Trash } from '@/Icons/Trash';
import { useState } from 'react';
import { useGetAllStudents } from '@/query/students.query';
import {
	useAddEnrollment,
	useDeleteEnrollment,
} from '@/mutations/enrollment.mutate';
import { EnrollStatus } from '@/types/enrollments.types';
import { EmptyState } from '../EmptyState/EmptyState';
import { statusesToShow } from '@/utils/enrollment.utils';
import { useGetCurrentSemester } from '@/query/semesters.query';

type ClassesDeanProps = { semesterTag: string };

export const ClassesDean = ({ semesterTag }: ClassesDeanProps) => {
	const d = useTranslations('HomeDean');
	const t = useTranslations('Classes');
	const [nameIndexInput, setNameIndexInput] = useState('');
	const { mutate: addEnrollment } = useAddEnrollment();
	const [openedClass, setOpenedClass] = useState<string | null>(null);
	const { data: currentSemester } = useGetCurrentSemester();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const { mutate: deleteEnrollment } = useDeleteEnrollment();

	const { data: classesStudents } = useGetClassesStudentsByTag(
		semesterTag,
		statusesToShow,
	);

	const { data: studentData } = useGetAllStudents();
	const studentNames =
		studentData?.map(({ firstName, lastName, indexNumber }) => ({
			value: `${firstName} ${lastName} ${indexNumber}`,
		})) || [];

	const handleTrashButton = (
		userId: number,
		subjectId: number,
		semesterId: number,
		enrollStatus: EnrollStatus,
	) => {
		deleteEnrollment({
			userId: userId,
			subjectId: subjectId,
			semesterId: semesterId,
			enrollStatus: enrollStatus,
		});
	};

	const handleStudentForm = () => {
		const student = studentData?.find(
			(item) => item.indexNumber === nameIndexInput.split(' ').pop(),
		);
		if (student) {
			addEnrollment({
				userId: student.userId,
				subjectId: parseInt(openedClass || ''),
				semesterId: currentSemester?.semesterId,
				enrollStatus: EnrollStatus.PROPOSED,
			});
			setNameIndexInput('');
		}
	};

	return (
		<Flex direction='column' p={8}>
			{!classesStudents ? (
				<EmptyState
					title={t('Table.emptyTitle')}
					description={t('Table.emptyDescription')}
				/>
			) : (
				<Accordion
					variant='separated'
					value={openedClass}
					onChange={setOpenedClass}
				>
					{classesStudents.map((classStudents) => (
						<Accordion.Item
							key={classStudents.class.subjectId}
							value={classStudents.class.subjectId.toString()}
							bg='neutral.0'
							px='md'
							py='md'
							sx={(theme) => ({
								boxShadow: theme.shadows.sm,
								borderRightColor: theme.colors.neutral[3],
								alignContent: 'center',
								borderRadius: 12,
							})}
						>
							<Accordion.Control fz='md'>
								<Flex direction='row' justify='space-between'>
									<Text fz='md' fw={700}>
										{classStudents.class.name}
									</Text>
									<Text fz='md'>
										{`${classStudents.enrollments.length} ${d('enrollmentQuantityText')}`}
									</Text>
								</Flex>
							</Accordion.Control>
							<Accordion.Panel>
								<Flex p='xs' direction='column'>
									<ScrollArea.Autosize
										placeholder={<Text>{t('Table.emptyDescription')}</Text>}
										mah={300}
										ml={15}
										mr={15}
										onPointerEnterCapture={null}
										onPointerLeaveCapture={null}
									>
										{classStudents.enrollments.map((enrollment) => (
											<>
												<Flex
													key={enrollment.user.userId}
													direction='row'
													align='center'
													justify='space-between'
													p={10}
												>
													<Flex>
														<Text mr={10} fw={700} fz='md'>
															{`${enrollment.user.firstName} ${enrollment.user.lastName} (${enrollment.user.indexNumber})`}
														</Text>
													</Flex>
													<Button
														radius={80}
														color='red.0'
														size='xs'
														mr={33}
														onClick={() =>
															handleTrashButton(
																enrollment.user.userId,
																classStudents.class.subjectId,
																currentSemester?.semesterId || 1,
																EnrollStatus.REJECTED,
															)
														}
													>
														<Trash />
													</Button>
												</Flex>
												<Divider w='96%' />
											</>
										))}
									</ScrollArea.Autosize>
									<Flex
										direction='row'
										align='center'
										justify='space-between'
										px={15}
										pt={15}
									>
										<Flex>
											<Autocomplete
												placeholder={d('nameIndexInput')}
												mr={10}
												radius='lg'
												limit={3}
												miw={300}
												data={studentNames.filter(
													(name) =>
														!classStudents.enrollments.some(
															({
																user: { firstName, lastName, indexNumber },
															}) =>
																`${firstName} ${lastName} ${indexNumber}` ===
																name.value,
														),
												)}
												value={nameIndexInput}
												onChange={setNameIndexInput}
											/>
										</Flex>
										<Button
											radius={80}
											color='blue.5'
											size='sm'
											mr={45}
											onClick={handleStudentForm}
										>
											+
										</Button>
									</Flex>
								</Flex>
							</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			)}
		</Flex>
	);
};
