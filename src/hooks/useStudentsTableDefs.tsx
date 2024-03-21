import { useDeleteStudent } from '@/mutations/students.mutate';
import { useTranslations } from 'next-intl';
import { type ColumnDef } from '@tanstack/react-table';
import { type Student } from '@/types/api.types';
import { useMemo } from 'react';
import { Button, Text } from '@mantine/core';
import { STUDENTS_TABLE_COLUMNS } from '@/constants/students.constants';
import { Trash } from '@/Icons/Trash';

const useStudentsTableData = () => {
	const t = useTranslations('Students.Table');
	const { mutate } = useDeleteStudent();

	const columns: ColumnDef<Student, string>[] = useMemo(
		() => [
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('firstName')}
					</Text>
				),
				accessorKey: STUDENTS_TABLE_COLUMNS.FIRST_NAME,
				cell: (props) => <Text>{props.row.original.firstName}</Text>,
			},
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('lastName')}
					</Text>
				),
				accessorKey: STUDENTS_TABLE_COLUMNS.LAST_NAME,
				cell: (props) => <Text>{props.row.original.lastName}</Text>,
			},
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('indexNumber')}
					</Text>
				),
				accessorKey: STUDENTS_TABLE_COLUMNS.INDEX_NUMBER,
				cell: (props) => <Text>{props.row.original.indexNumber}</Text>,
			},
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('academicYear')}
					</Text>
				),
				accessorKey: STUDENTS_TABLE_COLUMNS.ACADEMIC_YEAR,
				cell: (props) => <Text>{props.row.original.academicYear}</Text>,
			},
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('actions')}
					</Text>
				),
				accessorKey: STUDENTS_TABLE_COLUMNS.ACTIONS,
				cell: (props) => (
					<Button
						radius={80}
						color='error.4'
						onClick={() => {
							mutate(props.row.original.indexNumber);
						}}
					>
						<Trash />
					</Button>
				),
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return { columns };
};

export default useStudentsTableData;
