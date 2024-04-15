import { AppLayout } from '@/components/common/Layout/AppLayout';
import Header from '@/components/Header/Header';
import { Box, Button, Flex, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Table from '@/components/Table/Table';
import useStudentsTableData from '@/hooks/useStudentsTableDefs';
import { useGetStudents } from '@/query/students.query';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { useStudentSearch } from '@/hooks/useStudentSearch';
import { type Student } from '@/types/api.types';
import { SelectDropdownItem } from '@/components/common/molecules/SelectDropdownItem/SelectDropdownItem';
import { modals } from '@mantine/modals';
import { AddTagModal } from '@/components/common/modals/AddTagModal';
import { AddStudentModal } from '@/components/common/modals/AddStudentModal';
import { semesters } from '@/data/common.data';
import { useFiltersStore } from '@/store/filters.store';
import { getServerSideProps } from '@/server/utils/protectedServerSide.util';

export default function Students() {
	const [isOpen, { toggle }] = useDisclosure(false);
	const studentsColumnDefs = useStudentsTableData();
	const searchValue = useFiltersStore((state) => state.searchValue);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const [semesterTag, setSemesterTag] = useState<string>();
	const {
		data: students,
		isLoading: isStudentsLoading,
		isError: isStudentsError,
	} = useGetStudents(
		semesterTag || '',
		pagination.pageIndex,
		pagination.pageSize,
	);

	const { filteredStudents } = useStudentSearch(searchValue, students?.content);
	const t = useTranslations('Students');
	const tModal = useTranslations('Modals');

	const isLoading = isStudentsLoading;
	const isError = isStudentsError;

	const openModal = (type: 'TAG' | 'STUDENT') => {
		modals.open({
			title:
				type === 'TAG'
					? tModal('AddTagModal.title')
					: tModal('AddStudentModal.title'),
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
						data={semesters}
						variant='bigSelect'
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
						pagination={pagination}
						setPagination={setPagination}
						columns={studentsColumnDefs.columns}
						pageCount={students?.totalPages}
					/>
				)}
			</Flex>
		</AppLayout>
	);
}

export { getServerSideProps };
