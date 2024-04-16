import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Box, Button, Flex, Select, Text } from '@mantine/core';
import { Classes } from '@/components/Classes/Classes';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header/Header';
import { ClassesDean } from '@/components/Classes/ClassesDean';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from '@/Icons/ChevronDown';
import { getServerSideProps } from '@/server/utils/protectedServerSide.util';
import { useSession } from 'next-auth/react';
import { semesters } from '@/data/common.data';
import { modals } from '@mantine/modals';
import { AddSemesterModal } from '@/components/common/modals/AddSemesterModal';

export default function Home() {
	const t = useTranslations('Classes');
	const tModal = useTranslations('Modals');
	const session = useSession();
	const [isOpen, { toggle }] = useDisclosure(false);
	const [semesterTag, setSemesterTag] = useState<string>('');
	const role = session.data?.user.role || 'STUDENT';

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
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
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
								variant='bigSelect'
								value={semesterTag}
								data={semesters}
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
							<Button
								onClick={() => openModal()}
								radius='70rem'
								py='xs'
								px='md'
								leftIcon={<Text fz='lg'>+</Text>}
							>
								{tModal('AddSemesterModal.addBtn')}
							</Button>
						</Flex>

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
