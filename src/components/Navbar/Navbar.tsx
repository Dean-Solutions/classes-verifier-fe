import {
	Flex,
	Box,
	Divider,
	ActionIcon,
	Text,
	rem,
	Navbar as MantineNavbar,
} from '@mantine/core';
import Link from 'next/link';
import { Routes } from '@/types/routes';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Home } from '@/Icons/Home';
import { Bell } from '@/Icons/Bell';
import { People } from '@/Icons/People';
import { Study } from '@/Icons/Study';
import { Piechart } from '@/Icons/Piechart';
import { Logout } from '@/Icons/Logout';
import { Logo } from '@/Icons/Logo';

export const Navbar = () => {
	const router = useRouter();
	const t = useTranslations('Navigation');

	const navbarItems = [
		{
			label: t('home'),
			link: Routes.Home,
			icon: <Home />,
		},
		{
			label: t('requests'),
			link: Routes.Requests,
			icon: <Bell />,
		},
		{
			label: t('classes'),
			link: Routes.Classes,
			icon: <Study />,
		},
		{
			label: t('students'),
			link: Routes.Students,
			icon: <People />,
		},
	];

	const bottomNavbarItems = [
		{
			label: t('settings'),
			link: Routes.Settings,
			icon: <Piechart />,
		},
		{
			label: t('logout'),
			link: Routes.Logout,
			icon: <Logout />,
		},
	];

	const activeStyles = {
		color: 'neutral.0',
		fw: 'bold',
	};

	const isActive = (link: string) =>
		router.pathname.includes(link.split('?')[0] || '');

	return (
		<MantineNavbar
			width={{
				base: 300,
			}}
			pl='md'
			pr='lg'
			py='xl'
			bg='neutral.0'
			sx={(theme) => ({
				boxShadow: theme.shadows.xl,
				borderRightColor: theme.colors.neutral[3],
			})}
		>
			<Flex direction='column' justify='space-between' h='100%'>
				<Box>
					<Flex
						align='center'
						justify='space-between'
						direction={'row'}
						pb='xl'
						gap='xl'
					>
						<Link href={Routes.Home}>
							<Flex align='center' gap={16}>
								<Logo />
								<Text color='black.0' fw='bold' fz='lg'>
									{t('AppName')}
								</Text>
							</Flex>
						</Link>
					</Flex>
					<Divider pb='xl' />
					<Flex direction='column' align='center' gap='sm'>
						{navbarItems.map((item) => (
							<Link
								key={item.link}
								href={item.link}
								passHref
								style={{
									textDecoration: 'none',
									width: '100%',
									display: 'block',
								}}
							>
								<Box
									sx={(theme) => ({
										borderRadius: rem(8),
										backgroundColor: isActive(item.link)
											? theme.colors.primary[0]
											: 'initial',
										':hover': !isActive(item.link)
											? {
													backgroundColor: theme.colors.neutral[5],
											  }
											: {},
									})}
									p={'sm'}
									w={'100%'}
								>
									<Flex align='center'>
										<ActionIcon
											variant='transparent'
											size={24}
											{...(isActive(item.link)
												? activeStyles
												: {
														color: 'black.0',
												  })}
										>
											{item.icon}
										</ActionIcon>
										<Text
											ml='md'
											{...(isActive(item.link)
												? activeStyles
												: {
														color: 'black.0',
												  })}
										>
											{item.label}
										</Text>
									</Flex>
								</Box>
							</Link>
						))}
					</Flex>
				</Box>
				<Box>
					<Divider mb='xl' mt='md' />
					<Flex direction='column' align='center' gap='xs'>
						{bottomNavbarItems.map((item) => (
							<Link
								key={item.link}
								href={item.link}
								passHref
								style={{
									textDecoration: 'none',
									width: '100%',
									display: 'block',
								}}
							>
								<Box
									sx={(theme) => ({
										borderRadius: rem(8),
										backgroundColor:
											router.pathname === item.link
												? theme.colors.primary[0]
												: 'initial',
										':hover': !isActive(item.link)
											? {
													color: 'neutral.0',
													backgroundColor: theme.colors.neutral[5],
											  }
											: {},
									})}
									p='md'
									w={'100%'}
								>
									<Flex align='center'>
										<ActionIcon variant='transparent' color='black.0' size={24}>
											{item.icon}
										</ActionIcon>
										<Text color='black.0' ml='md' size='lg'>
											{item.label}
										</Text>
									</Flex>
								</Box>
							</Link>
						))}
					</Flex>
				</Box>
			</Flex>
		</MantineNavbar>
	);
};
