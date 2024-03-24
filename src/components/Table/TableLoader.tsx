import { Flex, rem, Text } from '@mantine/core';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Loader } from '../common/molecules/Loader/Loader';
import { DataFetchErrorReload } from '../common/molecules/DataFetchError/DataFetchError';

type TableLoaderProps = {
	isError?: boolean;
};

export const TableLoader = ({ isError }: TableLoaderProps) => {
	const t = useTranslations('Common');

	return (
		<Flex
			justify='center'
			align='center'
			w='100%'
			mt={24}
			sx={({ radius }) => ({
				borderRadius: radius.md,
				height: `calc(100vh - ${rem(128)})`,
			})}
		>
			{isError ? (
				<DataFetchErrorReload mt={40} />
			) : (
				<Loader
					size={30}
					mb={8}
					bottomLabel={
						<Text size='md' align='center' color='neutral.1'>
							{t('loading')}
						</Text>
					}
				/>
			)}
		</Flex>
	);
};
