import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Box, Flex, Select } from '@mantine/core';
import { getStaticProps } from '@/pages/index';
import { Classes } from '@/components/Classes/Classes';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header/Header';
import { useStudentsStore } from '@/store/students.store';
import { ClassesDean } from '@/components/Classes/ClassesDean';
import { useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { useGetTags } from '@/query/tags.query';
import { SelectDataWithFooter } from '@/types/common.types';
import { SelectDropdownItem } from '@/components/common/molecules/SelectDropdownItem/SelectDropdownItem';
import { useGetClasses } from '@/query/classes.query';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { useGetStudentByIndex } from '@/query/students.query';

export default function Home() {
	const t = useTranslations('Classes');
	const h = useTranslations('HomeStudent');

	const { role } = useStudentsStore((state) => ({role: state.role}));
	const [isOpen, { toggle }] = useDisclosure(false);
	const [semesterTag, setSemesterTag] = useState<string | undefined>();

	const {
		data: tags,
	} = useGetTags();
	const mappedTags: SelectDataWithFooter[] = useMemo(() => {
		const data: SelectDataWithFooter[] =
			tags?.map((tag) => ({
				label: tag.name,
				value: tag.name,
			})) || [];
	
		return data;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tags, t]);

	const { data: classes } = useGetClasses(0, 15, semesterTag);

	// MOCK STUDENT FOR NOW - LOGIN docelowo
	const { data: student } = useGetStudentByIndex("101010");

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={h('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				{role === "dean" ? (
					<>
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
					{!classes || classes.length === 0 ? (
						<EmptyState
							title={t('Table.emptyTitle')}
							description={t('Table.emptyDescription')}
						/>
					) : (
						<ClassesDean
							classes={classes} 
						/>
					)}
					</>
				) : <>
					{!student ? (
						<Flex justify='center'>
							{h('studentNotFound')}
						</Flex>
					) : (
						<Classes
							student={student}
						/>
					)}
					</>
				}
			</Flex>
		</AppLayout>
	);
}

export { getStaticProps };
