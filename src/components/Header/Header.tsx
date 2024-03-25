import { Box, Flex, Title } from '@mantine/core';
import React from 'react';
import Search from '../Search/Search';

type HeaderProps = {
	title: string;
	searchPlaceholder: string;
};

const Header = ({ title, searchPlaceholder }: HeaderProps) => {
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
			<Box ml='auto'>
				<Search placeholder={searchPlaceholder} />
			</Box>
		</Flex>
	);
};

export default Header;
