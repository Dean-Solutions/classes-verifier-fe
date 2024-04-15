import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Box, Flex, Select } from '@mantine/core';
import { Classes } from '@/components/Classes/Classes';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header/Header';
import { useStudentsStore } from '@/store/students.store';
import { ClassesDean } from '@/components/Classes/ClassesDean';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { getServerSideProps } from '@/server/utils/protectedServerSide.util';

const data = [
	{ label: 'Semestr 1', value: 'Semestr 1' },
	{ label: 'Semestr 2', value: 'Semestr 2' },
	{ label: 'Semestr 3', value: 'Semestr 3' },
	{ label: 'Semestr 4', value: 'Semestr 4' },
	{ label: 'Semestr 5', value: 'Semestr 5' },
	{ label: 'Semestr 6', value: 'Semestr 6' },
];

export default function Home() {
	const t = useTranslations('Classes');

	const { role } = useStudentsStore((state) => ({ role: state.role }));
	const [isOpen, { toggle }] = useDisclosure(false);
	const [semesterTag, setSemesterTag] = useState<string>(data[0]?.value || '');

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				{role === 'dean' ? (
					<>
						<Select
							w={200}
							placeholder={t('selectPlaceholder')}
							variant='bigSelect'
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
						<ClassesDean />
					</>
				) : (
					<Classes />
				)}
			</Flex>
		</AppLayout>
	);
}

export { getServerSideProps };
