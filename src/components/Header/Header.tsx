import { Flex, Title } from '@mantine/core';
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
			<Flex ml='auto' align='center'>
				<Search placeholder={searchPlaceholder} />
			</Flex>
		</Flex>
	);
};

export default Header;
