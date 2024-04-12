import { useTranslations } from 'next-intl';
import { type ColumnDef } from '@tanstack/react-table';
import { type Course } from '@/types/api.types';
import { useMemo } from 'react';
import { Button, Flex, Text } from '@mantine/core';
import { Trash } from '@/Icons/Trash';
import { CLASSES_TABLE_COLUMNS } from '@/constants/classes.constants';
import { Edit } from '@/Icons/Edit';
import { useDeleteClass } from '@/mutations/classes.mutate';
import { modals } from '@mantine/modals';
import AddClassModal from '@/components/common/modals/AddClassModal';
import { AddTagModal } from '@/components/common/modals/AddTagModal';

const useClassesTableData = () => {
	const t = useTranslations('Classes');
	const { mutate, isPending } = useDeleteClass();

	const openModal = (c: Course) => {
		modals.open({
			title: t('addClassModal.title'),
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
			children: (
				<AddClassModal
					description={c.description}
					name={c.name}
					subjectId={c.subjectId}
					subjectTags={c.subjectTags}
				/>
			),
		});
	};

	const columns: ColumnDef<Course>[] = useMemo(
		() => [
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('Table.name')}
					</Text>
				),

				accessorKey: CLASSES_TABLE_COLUMNS.NAME,
				cell: (props) => <Text>{props.row.original.name}</Text>,
			},
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('Table.description')}
					</Text>
				),
				accessorKey: CLASSES_TABLE_COLUMNS.DESCRIPTION,
				cell: (props) => {
					return (
						<Text>
							{props.row.original.description || t('Table.noDescription')}
						</Text>
					);
				},
			},
			{
				header: () => (
					<Text fw={600} p='md' size='md'>
						{t('Table.actions')}
					</Text>
				),
				accessorKey: CLASSES_TABLE_COLUMNS.ACTIONS,
				cell: (props) => (
					<Flex gap='md'>
						<Button
							radius={80}
							color='orange.0'
							loading={isPending}
							onClick={() => {
								openModal(props.row.original);
							}}
						>
							<Edit />
						</Button>
						<Button
							radius={80}
							color='error.4'
							loading={isPending}
							onClick={() => {
								mutate(props.row.original);
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
