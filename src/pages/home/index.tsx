import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Box, Flex, Select } from '@mantine/core';
import { Classes } from '@/components/Classes/Classes';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header/Header';
import { ClassesDean } from '@/components/Classes/ClassesDean';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { getServerSideProps } from '@/server/utils/protectedServerSide.util';
import { useSession } from 'next-auth/react';

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
	const session = useSession();
	const [isOpen, { toggle }] = useDisclosure(false);
	const [semesterTag, setSemesterTag] = useState<string>(data[0]?.value || '');
	const role = session.data?.user.role || 'STUDENT';

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				{role === 'DEAN' ? (
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
