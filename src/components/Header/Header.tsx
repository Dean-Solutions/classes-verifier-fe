import { Flex, Title, Button } from '@mantine/core';
import { Flex, Title, Button } from '@mantine/core';
import React from 'react';
import Search from '../Search/Search';
import { useStudentsStore } from '@/store/students.store';
import { useStudentsStore } from '@/store/students.store';

type HeaderProps = {
	title: string;
	searchPlaceholder: string;
};

const Header = ({ title, searchPlaceholder }: HeaderProps) => {
	const { toggleRole } = useStudentsStore((state) => ({
		toggleRole: state.toggleRole,
	}));

	return (
		<Flex
			align='center'
			justify='center'
			sx={(theme) => ({
				borderBottom: `0.5px solid ${theme.colors.neutral[4]}`,
				paddingBlock: theme.spacing.md,
			})}
		>
			<Title>{title}</Title>
			<Flex ml='auto' align='center' gap='md'>
				{/* TODO to remove in S2 */}
				<Button onClick={toggleRole}>Change role</Button>
				<Search placeholder={searchPlaceholder} />
			</Flex>
		</Flex>
	);
};

export default Header;
