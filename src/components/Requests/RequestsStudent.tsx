import {
	Flex,
	rem,
	Grid,
	Text,
	Divider,
	Badge,
	ScrollArea,
} from '@mantine/core';

export const RequestsStudent = () => {
	const requests_list = [
		{
			class: 'Inżynieria Oprogramowania',
			status: 'Zrobione',
			descripton:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at scelerisque felis. Mauris arcu magna, ullamcorper ut dignissim non, viverra vel orci. Fusce semper metus a tincidunt condimentum. Cras in leo dapibus, cursus mi quis, porta velit. Phasellus vehicula nibh id tincidunt ornare. Suspendisse sapien mi, rutrum at ex sit amet erat curae.',
		},
		{
			class: 'Systemy Wbudowane',
			status: 'Dostarczono',
			descripton:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at scelerisque felis. Mauris arcu magna, ullamcorper ut dignissim non, viverra vel orci. Fusce semper metus a tincidunt condimentum. Cras in leo dapibus, cursus mi quis, porta velit. Phasellus vehicula nibh id tincidunt ornare. Suspendisse sapien mi, rutrum at ex sit amet erat curae.',
		},
		{
			class: 'Systemy Wbudowane',
			status: 'Odrzucono',
			descripton:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at scelerisque felis. Mauris arcu magna, ullamcorper ut dignissim non, viverra vel orci. Fusce semper metus a tincidunt condimentum. Cras in leo dapibus, cursus mi quis, porta velit. Phasellus vehicula nibh id tincidunt ornare. Suspendisse sapien mi, rutrum at ex sit amet erat curae.',
		},
	];

	type Map = Record<string, string | undefined>;

	const color_map: Map = {
		Zrobione: 'green.0',
		Dostarczono: 'yellow.0',
		Odrzucono: 'red.0',
	};

	return (
		<Grid p={8}>
			{requests_list.map((item) => (
				<Grid.Col span={4} key={item.class}>
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
							{item.class}
						</Text>
						<Badge
							color={color_map[item.status]}
							size='md'
							radius='lg'
							variant='filled'
							mb={15}
							ml={15}
							w={120}
						>
							{item.status}
						</Badge>
						<Divider pb='md' w='90%' ml='5%' />
						<ScrollArea h={175} ml={15} mr={15}>
							<Text fz='s'>{item.descripton}</Text>
						</ScrollArea>
					</Flex>
				</Grid.Col>
			))}
		</Grid>
	);
};
