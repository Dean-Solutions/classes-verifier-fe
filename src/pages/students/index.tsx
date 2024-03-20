import { AppLayout } from '@/components/common/Layout/AppLayout';
import { getStaticProps } from '@/pages/index';
import Header from '@/components/Header/Header';
import { Box, Flex, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const data = [
	{ label: 'English', value: 'English' },
	{ label: 'German', value: 'German' },
	{ label: 'Italian', value: 'Italian' },
	{ label: 'French', value: 'French' },
	{ label: 'Polish', value: 'Polish' },
];

export default function Students() {
	const [isOpen, { toggle }] = useDisclosure(false);
	const [semesterTag, setSemesterTag] = useState<string>('');
	const t = useTranslations('Students');

	return (
		<AppLayout>
			<Flex direction='column'>
				<Header title={t('headerTitle')} />
				<Select
					w={200}
					placeholder='Wybierz tag semestru'
					defaultValue={data[0]?.value}
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
			</Flex>
		</AppLayout>
	);
}

export { getStaticProps };

