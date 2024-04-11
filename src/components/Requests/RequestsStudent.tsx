import { useGetUserRequests } from '@/query/request.query';
import {
	Flex,
	rem,
	Grid,
	Text,
	Divider,
	Badge,
	ScrollArea,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { EmptyState } from '../EmptyState/EmptyState';

export const RequestsStudent = () => {
	const t = useTranslations('Requests');
	const { data: userRequests } = useGetUserRequests(4);
	console.log(userRequests);

	type Map = Record<string, string | undefined>;

	const colorMap: Map = {
		ACCEPTED: 'green.0',
		PENDING: 'yellow.0',
		REJECTED: 'red.0',
	};

	const getColor = (status: string | undefined) => {
		if (status === 'ACCEPTED') {
			return colorMap.ACCEPTED;
		} else if (status === 'PENDING') {
			return colorMap.PENDING;
		} else return colorMap.REJECTED;
	};

	return (
		<>
			{!userRequests?.content || userRequests?.content.length === 0 ? (
				<EmptyState
					title={t('emptyTitle')}
					description={t('emptyDescription')}
				/>
			) : (
				<Grid p={8}>
					{userRequests.content.map((request) => (
						<Grid.Col span={4} key={request.requestId}>
							<Flex
								h={300}
								bg='neutral.0'
								direction='column'
								sx={(theme) => ({
									boxShadow: theme.shadows.md,
									borderRightColor: theme.colors.neutral[3],
									borderRadius: rem(10),
								})}
							>
								<Text fz='xl' mt='5%' ml='5%'>
									{request.requestEnrollments[0]?.subject.name}
								</Text>
								<Badge
									color={getColor(request.requestEnrollments[0]?.requestStatus)}
									size='md'
									radius='lg'
									variant='filled'
									mb={15}
									ml={15}
									w={120}
								>
									{request.requestEnrollments[0]?.requestStatus}
								</Badge>
								<Divider pb='md' w='90%' ml='5%' />
								<ScrollArea h={175} ml={15} mr={15}>
									<Text fz='s'>{request.description}</Text>
								</ScrollArea>
							</Flex>
						</Grid.Col>
					))}
				</Grid>
			)}
		</>
	);
};
