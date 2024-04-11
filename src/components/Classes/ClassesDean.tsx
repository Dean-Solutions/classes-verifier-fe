import { useGetClassesStudentsByTag } from '@/query/classes.query';
import {
	Flex,
	Accordion,
	rem,
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
	useEditEnrollment,
} from '@/mutations/enrollment.mutate';
import { EnrollStatus, type PostEnroll } from '@/types/enrollments.types';
import { EmptyState } from '../EmptyState/EmptyState';

type ClassesDeanProps = { semesterTag: string };

export const ClassesDean = (p: ClassesDeanProps) => {
	const d = useTranslations('HomeDean');
	const t = useTranslations('Classes');
	const [nameIndexInput, setNameIndexInput] = useState('');
	const { mutate: addEnrollment } = useAddEnrollment();
	const [openedClass, setOpenedClass] = useState<string | null>(null);
	const { mutate: editEnrollment } = useEditEnrollment();

	const { data: classesStudents } = useGetClassesStudentsByTag(p.semesterTag);

	const { data: studentData } = useGetAllStudents();
	const studentNames =
		studentData?.map(
			({ firstName, lastName, indexNumber }) =>
				`${firstName} ${lastName} ${indexNumber}`,
		) || [];

	const handleTrashButton = (
		userId: number,
		subjectId: number,
		semesterId: number,
		enrollStatus: EnrollStatus,
	) => {
		const enrollment: PostEnroll = {
			userId: userId,
			subjectId: subjectId,
			semesterId: semesterId,
			enrollStatus: enrollStatus,
		};
		editEnrollment(enrollment);
	};

	const handleStudentForm = () => {
		const student = studentData?.find(
			(item) => item.indexNumber === nameIndexInput.split(' ').pop(),
		);
		if (student) {
			const newEnrollment: PostEnroll = {
				userId: student.userId,
				subjectId: parseInt(openedClass || ''),
				semesterId: 1,
				enrollStatus: EnrollStatus.PROPOSED,
			};
			addEnrollment(newEnrollment);
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
							mih={rem(70)}
							sx={(theme) => ({
								boxShadow: theme.shadows.sm,
								borderRightColor: theme.colors.neutral[3],
								alignContent: 'center',
							})}
						>
							<Accordion.Control fz='md'>
								<Text fz='md' fw={700}>
									{classStudents.class.name}
								</Text>
							</Accordion.Control>
							<Accordion.Panel>
								<Flex p='xs' direction='column'>
									<ScrollArea h={200} ml={15} mr={15}>
										{classStudents.students.map((student) => (
											<>
												<Flex
													key={student.userId}
													direction='row'
													align='center'
													justify='space-between'
													p={10}
												>
													<Flex>
														<Text mr={10} fw={700} fz='md'>
															{`${student.firstName} ${student.lastName} (${student.indexNumber})`}
														</Text>
													</Flex>
													<Button
														radius={80}
														color='red.0'
														size='xs'
														mr={33}
														onClick={() =>
															handleTrashButton(
																student.userId,
																classStudents.class.subjectId,
																1,
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
									</ScrollArea>
									<Flex
										direction='row'
										align='center'
										justify='space-between'
										p={15}
									>
										<Flex>
											<Autocomplete
												placeholder={d('nameIndexInput')}
												mr={10}
												radius='lg'
												limit={3}
												miw={300}
												data={studentNames}
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
