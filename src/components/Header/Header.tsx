import { Flex, Title } from '@mantine/core';
import React from 'react';
import Search from '../Search/Search';

type HeaderProps = {
	title: string;
	searchPlaceholder?: string;
	showSearch?: boolean;
};

const Header = ({ title, searchPlaceholder, showSearch }: HeaderProps) => {
	return (
		<Flex
			align='center'
			sx={(theme) => ({
				borderBottom: `0.5px solid ${theme.colors.neutral[4]}`,
				paddingBlock: theme.spacing.md,
			})}
		>
			<Title>{title}</Title>
			{!!showSearch && searchPlaceholder && (
				<Flex ml='auto' align='center' gap='md'>
					<Search placeholder={searchPlaceholder} />
				</Flex>
			)}
		</Flex>
	);
};

export default Header;
