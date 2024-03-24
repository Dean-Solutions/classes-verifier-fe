import { AppLayout } from '@/components/common/Layout/AppLayout';
import { getStaticProps } from '@/pages/index';
import Header from '@/components/Header/Header';
import { Box, Flex, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Table from '@/components/Table/Table';
import useStudentsTableData from '@/hooks/useStudentsTableDefs';
import { useGetStudents } from '@/query/students.query';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { useStudentsStore } from '@/store/students.store';
import { useStudentSearch } from '@/hooks/useStudentSearch';
import { type Student } from '@/types/api.types';

// TODO Fetch from BE
const data = [
	{ label: 'INF_23-24', value: 'INF_23-24' },
	{ label: 'INF_22-23', value: 'INF_22-23' },
	{ label: 'INF_21-22', value: 'INF_21-22' },
	{ label: 'INF_20-21', value: 'INF_20-21' },
	{ label: 'INF_19-20', value: 'INF_19-20' },
];

export default function Students() {
	const [isOpen, { toggle }] = useDisclosure(false);
	const [semesterTag, setSemesterTag] = useState<string>(data[0]?.value || '');
	const studentsColumnDefs = useStudentsTableData();
	const { data: students, isLoading, isError } = useGetStudents(semesterTag);
	const searchValue = useStudentsStore((state) => state.searchValue);
	const { filteredStudents } = useStudentSearch(students || [], searchValue);
	const t = useTranslations('Students');

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				<Select
					w={200}
					placeholder={t('selectPlaceholder')}
					value={semesterTag}
					data={data}
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

				{filteredStudents && filteredStudents.length === 0 ? (
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
