import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Box, Button, Flex, Select, Text } from '@mantine/core';
import { Classes } from '@/components/Classes/Classes';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header/Header';
import { ClassesDean } from '@/components/Classes/ClassesDean';
import { useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { getServerSideProps } from '@/server/utils/protectedServerSide.util';
import { useSession } from 'next-auth/react';
import { useGetTags } from '@/query/tags.query';
import { type SelectDataWithFooter } from '@/types/common.types';
import { SelectDropdownItem } from '@/components/common/molecules/SelectDropdownItem/SelectDropdownItem';
import { useGetClasses } from '@/query/classes.query';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { useGetLoggedStudent } from '@/query/students.query';
import { TableLoader } from '@/components/StudentsTable/TableLoader';
import { DataFetchErrorReload } from '@/components/common/molecules/DataFetchError/DataFetchError';
import { modals } from '@mantine/modals';
import { AddSemesterModal } from '@/components/common/modals/AddSemesterModal';

export default function Home() {
	const t = useTranslations('Classes');
	const tModal = useTranslations('Modals');
	const h = useTranslations('HomeStudent');
	const session = useSession();
	const role = session.data?.user.role || 'STUDENT';
	const [isOpen, { toggle }] = useDisclosure(false);
	const [semesterTag, setSemesterTag] = useState<string | undefined>();

	const {
		data: classes,
		isLoading,
		isError,
	} = useGetClasses(0, 15, semesterTag);
	const { data: tags } = useGetTags();
	const mappedTags: SelectDataWithFooter[] = useMemo(() => {
		const data: SelectDataWithFooter[] =
			tags?.map((tag) => ({
				label: tag.name,
				value: tag.name,
			})) || [];

		return data;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tags, t]);
	// MOCK STUDENT FOR NOW - LOGIN docelowo

	const { data: student } = useGetLoggedStudent();

	if (isLoading) {
		return <TableLoader />;
	}

	if (isError) {
		return <DataFetchErrorReload />;
	}

	const openModal = () => {
		modals.open({
			title: tModal('AddSemesterModal.title'),
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
			children: <AddSemesterModal />,
		});
	};

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={h('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
					showSearch={true}
				/>
				{role === 'DEAN' ? (
					<>
						<Flex
							direction='row'
							gap='lg'
							justify='space-between'
							align='center'
						>
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
								onClick={() => openModal()}
								radius='70rem'
								py='xs'
								px='md'
								ml={40}
								leftIcon={<Text fz='lg'>+</Text>}
							>
								{tModal('AddSemesterModal.addBtn')}
							</Button>
						</Flex>

						{!classes || classes.length === 0 ? (
							<EmptyState
								title={t('Table.emptyTitle')}
								description={t('Table.emptyDescription')}
							/>
						) : (
							<ClassesDean semesterTag={semesterTag || ''} />
						)}
					</>
				) : (
					<>
						{!student ? (
							<Flex justify='center'>{h('studentNotFound')}</Flex>
						) : (
							<Classes student={student} />
						)}
					</>
				)}
			</Flex>
		</AppLayout>
	);
}

export { getServerSideProps };
