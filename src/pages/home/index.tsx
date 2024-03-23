import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Flex } from '@mantine/core';
import { getStaticProps } from '@/pages/index';
import { Classes } from '@/components/Classes/Classes';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header/Header';

export default function Home() {
	const t = useTranslations('HomeStudent');

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header
					title={t('headerTitle')}
					searchPlaceholder={t('searchPlaceholder')}
				/>
				<Classes />
			</Flex>
		</AppLayout>
	);
}

export { getStaticProps };
