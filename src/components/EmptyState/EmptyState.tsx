import { Box, Flex, Text, rem } from '@mantine/core';

type EmptyStateProps = {
	title: string;
	description: string;
};

export const EmptyState = ({ title, description }: EmptyStateProps) => {
	return (
		<Flex
			align='center'
			justify='center'
			sx={{ height: `calc(100% - ${rem(247)})` }}
		>
			<Box w={371}>
				<Text component='pre' size={28} lh={rem(36)} align='center' mb={0}>
					{title}
				</Text>
				<Text size='lg' mt={8} align='center' lts={0.5}>
					{description}
				</Text>
			</Box>
		</Flex>
	);
};
