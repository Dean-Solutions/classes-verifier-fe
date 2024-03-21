import { Renew } from '@/Icons/Renew';
import { type FlexProps, Text, rem } from '@mantine/core';
import { Flex, RingProgress, Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

type DataFetchErrorReloadProps = FlexProps & {
	offset?: number;
};

export const DataFetchErrorReload = ({
	offset = 100,
	...rest
}: DataFetchErrorReloadProps) => {
	const t = useTranslations('Common');
	const router = useRouter();
	return (
		<Flex
			w='100%'
			h={`calc(100% - ${rem(offset)})`}
			justify='center'
			align='center'
			direction='column'
			{...rest}
		>
			<RingProgress rootColor='neutral.6' sections={[]} />
			<Text size='md' align='center' w={240}>
				{t('error')}
			</Text>
			<Button
				variant='outline'
				mt='md'
				leftIcon={<Renew />}
				onClick={router.reload}
			>
				{t('retry')}
			</Button>
		</Flex>
	);
};
