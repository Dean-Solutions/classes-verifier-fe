import { useTranslations } from 'next-intl';
import { type ColumnDef } from '@tanstack/react-table';
import { type Course } from '@/types/api.types';
import { useMemo } from 'react';
import { Button, Flex, Text } from '@mantine/core';
import { Trash } from '@/Icons/Trash';
import { CLASSES_TABLE_COLUMNS } from '@/constants/classes.constants';
import { Edit } from '@/Icons/Edit';
import { useDeleteClass, useEditClass} from "@/mutations/classes.mutate";

const useClassesTableData = () => {
	const t = useTranslations('Classes.Table');
	const mutDeleteClass = useDeleteClass();


	const columns: ColumnDef<Course>[] = useMemo(
		() => [
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('name')}
					</Text>
				),

				accessorKey: CLASSES_TABLE_COLUMNS.NAME,
				cell: (props) => <Text>{props.row.original.name}</Text>,
			},
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('description')}
					</Text>
				),
				accessorKey: CLASSES_TABLE_COLUMNS.DESCRIPTION,
				cell: (props) => (
					<Text>{props.row.original.description || t('noDescription')}</Text>
				),
			},
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('actions')}
					</Text>
				),
				accessorKey: CLASSES_TABLE_COLUMNS.ACTIONS,
				cell: (props) => (
					<Flex gap='md'>
						<Button
							radius={80}
							color='orange.0'
							onClick={() => {
								console.log("Edit");
							}}
						>
							<Edit />
						</Button>
						<Button
							radius={80}
							color='error.4'
							loading={mutDeleteClass.isPending}
							onClick={() => {
								mutDeleteClass.mutate(props.row.original);
							}}
						>
							<Trash />
						</Button>
					</Flex>
				),
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return { columns };
};

export default useClassesTableData;
