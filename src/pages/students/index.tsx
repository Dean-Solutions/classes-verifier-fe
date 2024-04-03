import { AppLayout } from '@/components/common/Layout/AppLayout';
import { getStaticProps } from '@/pages/index';
import Header from '@/components/Header/Header';
import { Box, Button, Flex, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Table from '@/components/Table/Table';
import useStudentsTableData from '@/hooks/useStudentsTableDefs';
import { useGetStudents } from '@/query/students.query';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { useStudentsStore } from '@/store/students.store';
import { useStudentSearch } from '@/hooks/useStudentSearch';
import { type Student } from '@/types/api.types';
import { useGetTags } from '@/query/tags.query';
import { Logout } from '@/Icons/Logout';
import { SelectDropdownItem } from '@/components/common/molecules/SelectDropdownItem/SelectDropdownItem';
import { modals } from '@mantine/modals';
import { AddTagModal } from '@/components/common/modals/AddTagModal';
import { type SelectDataWithFooter } from '@/types/common.types';
import { AddStudentModal } from '@/components/common/modals/AddStudentModal';


export default function Students() {
	const [isOpen, { toggle }] = useDisclosure(false);
	const studentsColumnDefs = useStudentsTableData();
	const searchValue = useStudentsStore((state) => state.searchValue);
	const {
		data: semesterTags,
		isLoading: isTagsLoading,
		isError: isTagsError,
	} = useGetTags();
	const [semesterTag, setSemesterTag] = useState<string>();
	const {
		data: students,
		isLoading: isStudentsLoading,
		isError: isStudentsError,
	} = useGetStudents(semesterTag || '');

	const { filteredStudents, filterStudents } = useStudentSearch(
		searchValue,
		students,
	);
	const t = useTranslations('Students');

	const isLoading = isTagsLoading || isStudentsLoading;
	const isError = isTagsError || isStudentsError;

	useEffect(() => {
		if (semesterTags && semesterTags.length > 0) {
			filterStudents();
		}
	}, [semesterTags, filterStudents]);

	const openModal = (type: 'TAG' | 'STUDENT') => {
		modals.open({
			title:
				type === 'TAG' ? t('AddTagModal.title') : t('AddStudentModal.title'),
			centered: true,
			styles(theme) {
				return {
					title: {
						fontWeight: 700,
						fontSize: theme.fontSizes.lg,
					},
					close: {
						color: theme.colors.dark[7],
					},
				};
			},
			children: type === 'TAG' ? <AddTagModal /> : <AddStudentModal />,
		});
	};

	const tags: SelectDataWithFooter[] =
		semesterTags?.map((tag) => ({
			label: tag.name,
			value: tag.subjectTagId.toString(),
		})) || [];

	tags.push({
		label: t('Select.addTag'),
		value: 'addTag',
		footer: {
			isFirst: true,
			IconComp: <Logout />,
			onClick: () => openModal('TAG'),
			color: 'orange.0',
		},
	});

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				<Flex justify='space-between' align='center'>
					<Select
						w={200}
						placeholder={t('selectPlaceholder')}
						value={semesterTag}
						data={tags}
						itemComponent={SelectDropdownItem}
						rightSection={
							<Box
								sx={{
									transition: 'transform .2s',
									transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
								}}
							>
								<ChevronDown fill='var(--mantine-color-neutral-0)' />
							</Box>
						}
						onChange={(value) => setSemesterTag(value || '')}
						onDropdownOpen={toggle}
						onDropdownClose={toggle}
					/>
					<Button
						onClick={() => openModal('STUDENT')}
						sx={{
							borderRadius: 40,
						}}
						leftIcon={<Text fz='lg'>+</Text>}
					>
						{t('addStudent')}
					</Button>
				</Flex>

				{!filteredStudents ||
				(filteredStudents && filteredStudents.length === 0) ? (
					<EmptyState
						title={t('Table.emptyTitle')}
						description={t('Table.emptyDescription')}
					/>
				) : (
					<Table<Student>
						data={filteredStudents || []}
						isLoading={isLoading}
						isError={isError}
						columns={studentsColumnDefs.columns}
					/>
				)}
			</Flex>
		</AppLayout>
	);
}

export { getStaticProps };
