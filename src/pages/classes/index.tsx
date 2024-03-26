import { AppLayout } from '@/components/common/Layout/AppLayout';
import {Box, Button, Flex, Select} from '@mantine/core';
import { getStaticProps } from '@/pages/index';
import Header from '@/components/Header/Header';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import Table from '@/components/Table/Table';
import { useGetClasses } from '@/query/classes.query';
import { type Course } from '@/types/api.types';
import useClassesTableData from '@/hooks/useClassesTableDefs';

const data = [
	{ label: 'Semestr 1', value: 'Semestr 1' },
	{ label: 'Semestr 2', value: 'Semestr 2' },
	{ label: 'Semestr 3', value: 'Semestr 3' },
	{ label: 'Semestr 4', value: 'Semestr 4' },
	{ label: 'Semestr 5', value: 'Semestr 5' },
	{ label: 'Semestr 6', value: 'Semestr 6' },
];

export default function Classes() {
	const t = useTranslations('Classes');
	const [isOpen, { toggle }] = useDisclosure(false);
	const [semesterTag, setSemesterTag] = useState<string>(data[0]?.value || '');
	const { data: classes, isLoading, isError } = useGetClasses(semesterTag);
	const classesColumnDefs = useClassesTableData();

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				<Flex direction='row' gap='lg' justify="space-between" align='center'>
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

					<Button radius="70px" p="10px, 16px, 10px, 16px" h="70px" w="165px">{t("addClass")}</Button>
				</Flex>

				{classes && classes.length === 0 ? (
					<EmptyState
						title={t('Table.emptyTitle')}
						description={t('Table.emptyDescription')}
					/>
				) : (
					<Table<Course>
						data={classes || []}
						isLoading={isLoading}
						isError={isError}
						columns={classesColumnDefs.columns}
					/>
				)}
			</Flex>
		</AppLayout>
	);
}

export { getStaticProps };
