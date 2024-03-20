import { Flex, Title } from '@mantine/core';
import React from 'react';
import Search from '../Search/Search';

type HeaderProps = {
	title: string;
};

const Header = ({ title }: HeaderProps) => {
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
			<Flex ml='auto' align='center'>
				<Search />
			</Flex>
		</Flex>
	);
};

export default Header;
