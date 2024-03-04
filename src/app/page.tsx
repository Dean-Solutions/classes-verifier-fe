import { Flex, MantineProvider, Text } from '@mantine/core';
import { theme } from '@/theme';

export default function Home() {
	return (
		<MantineProvider theme={theme} defaultColorScheme='dark'>
			<Flex mih='100vh' flex={1} justify='center' align='center'>
				<Text>Lets code something</Text>
			</Flex>
		</MantineProvider>
	);
}

