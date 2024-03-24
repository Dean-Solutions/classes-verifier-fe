import { Flex, Text, rem } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Loader } from './Loader';

type CenteredLoaderProps = {
	topOffset?: number;
};

const CenteredLoader = ({ topOffset }: CenteredLoaderProps) => {
	const t = useTranslations('Common');

	return (
		<Flex
			w='100%'
			h={topOffset ? `calc(100% - ${rem(topOffset)})` : '100%'}
			justify='center'
			align='center'
		>
			<Loader
				mb={8}
				bottomLabel={
					<Text size='s' align='center' color='white'>
						{t('loading')}
					</Text>
				}
			/>
		</Flex>
	);
};

export default CenteredLoader;
