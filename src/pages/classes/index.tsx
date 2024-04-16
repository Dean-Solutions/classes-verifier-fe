import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Box, Button, Flex, Select, Text } from '@mantine/core';
import Header from '@/components/Header/Header';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import Table from '@/components/Table/Table';
import { useGetClasses } from '@/query/classes.query';
import { type Course } from '@/types/api.types';
import useClassesTableData from '@/hooks/useClassesTableDefs';
import AddClassModal from '@/components/common/modals/AddClassModal';
import { modals } from '@mantine/modals';
import { useGetTags } from '@/query/tags.query';
import { type SelectDataWithFooter } from '@/types/common.types';
import { Logout } from '@/Icons/Logout';
import { AddTagModal } from '@/components/common/modals/AddTagModal';
import { SelectDropdownItem } from '@/components/common/molecules/SelectDropdownItem/SelectDropdownItem';
import { useClassesSearch } from '@/hooks/useClassesSearch';
import { useFiltersStore } from '@/store/filters.store';

import { getServerSideProps } from '@/server/utils/protectedServerSide.util';

export default function Classes() {
	const t = useTranslations('Classes');
	const tModal = useTranslations('Modals');

	const [isOpen, { toggle }] = useDisclosure(false);
	const {
		data: tags,
		isLoading: isTagsLoading,
		isError: isTagsError,
	} = useGetTags();
	const mappedTags: SelectDataWithFooter[] = useMemo(() => {
		const data: SelectDataWithFooter[] =
			tags?.map((tag) => ({
				label: tag.name,
				value: tag.name,
			})) || [];

		data.push({
			label: t('Select.addTag'),
			value: 'addTag',
			footer: {
				isFirst: true,
				IconComp: <Logout />,
				onClick: () => openModal('TAG'),
				color: 'orange.0',
			},
		});
		return data;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tags, t]);
	const [semesterTag, setSemesterTag] = useState<string | undefined>();
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const {
		data: classes,
		isLoading: isClassLoading,
		isError: isClassesError,
	} = useGetClasses(pagination.pageIndex, pagination.pageSize, semesterTag);
	const classesColumnDefs = useClassesTableData();

	const searchValue = useFiltersStore((state) => state.searchValue);

	const { filteredClasses } = useClassesSearch(searchValue, classes);

	const openModal = (type: 'TAG' | 'CLASS') => {
		modals.open({
			title:
				type === 'CLASS'
					? t('addClassModal.title')
					: tModal('AddTagModal.title'),
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
			children: type === 'CLASS' ? <AddClassModal /> : <AddTagModal />,
		});
	};

	const isLoading = isTagsLoading || isClassLoading;
	const isError = isTagsError || isClassesError;

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				<Flex direction='row' gap='lg' justify='space-between' align='center'>
					<Select
						w={200}
						placeholder={t('selectPlaceholder')}
						value={semesterTag}
						data={mappedTags}
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
						variant='bigSelect'
					/>

					<Button
						onClick={() => openModal('CLASS')}
						radius='70rem'
						py='xs'
						px='md'
						leftIcon={<Text fz='lg'>+</Text>}
					>
						{t('addClass')}
					</Button>
				</Flex>

				{(filteredClasses && filteredClasses.length === 0) ||
				!filteredClasses ? (
					<EmptyState
						title={t('Table.emptyTitle')}
						description={t('Table.emptyDescription')}
					/>
				) : (
					<Table<Course>
						data={filteredClasses || []}
						isLoading={isLoading}
						isError={isError}
						columns={classesColumnDefs.columns}
						pagination={pagination}
						setPagination={setPagination}
					/>
				)}
			</Flex>
		</AppLayout>
	);
}

export { getServerSideProps };
