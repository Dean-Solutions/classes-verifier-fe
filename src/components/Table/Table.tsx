import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	type ColumnDef,
} from '@tanstack/react-table';
import useStyles from '@/components/Table/Table.styles';
import React from 'react';
import { Box, Button, Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { DataFetchErrorReload } from '../common/molecules/DataFetchError/DataFetchError';
import { TableLoader } from './TableLoader';

type TokensTableProps<T> = {
	data: T[];
	isLoading: boolean;
	isError: boolean;
	columns: ColumnDef<T, string>[];
	pageCount?: number;
	pagination: {
		pageIndex: number;
		pageSize: number;
	};
	setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
};

const Table = <T,>({
	data,
	columns,
	isLoading,
	isError,
	pagination,
	setPagination,
	pageCount,
}: TokensTableProps<T>) => {
	const { classes } = useStyles();
	const t = useTranslations('Common.Table');

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		pageCount: pageCount || 1,
		state: {
			pagination,
		},
	});

	if (isLoading) {
		return <TableLoader />;
	}

	if (isError) {
		return <DataFetchErrorReload />;
	}

	return (
		<table className={classes.table}>
			<thead className={classes.thead}>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id}>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr className={classes.tableRow} key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className={classes.tableCell}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
			<tfoot className={classes.tfoot}>
				<tr>
					<td colSpan={columns.length}>
						<Flex justify='space-between' align='center' px='md'>
							<Text>
								{t('pagination', {
									currentPage: pagination.pageIndex + 1,
									pageCount: table.getPageCount(),
								})}
							</Text>
							<Box>
								<Button
									variant='subtle'
									color='gray'
									radius={18}
									sx={{
										':hover': {
											backgroundColor: 'var(--mantine-color-metalic-0)',
										},
										':disabled': {
											backgroundColor: 'unset',
										},
									}}
									onClick={() =>
										setPagination({
											...pagination,
											pageIndex: pagination.pageIndex - 1,
										})
									}
									disabled={!table.getCanPreviousPage()}
								>
									{'<'}
								</Button>
								<Button
									variant='subtle'
									color='gray'
									radius={18}
									sx={{
										':hover': {
											backgroundColor: 'var(--mantine-color-metalic-0)',
										},
										':disabled': {
											backgroundColor: 'unset',
										},
									}}
									onClick={() =>
										setPagination({
											...pagination,
											pageIndex: pagination.pageIndex + 1,
										})
									}
									disabled={!table.getCanNextPage()}
								>
									{'>'}
								</Button>
							</Box>
						</Flex>
					</td>
				</tr>
			</tfoot>
		</table>
	);
};

export default React.memo(Table) as typeof Table;
