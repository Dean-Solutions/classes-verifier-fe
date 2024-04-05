import { Flex, Accordion, rem, Text } from '@mantine/core';

export const ClassesDean = () => {
	const classes_list = [
		{ label: 'Inżynieria Oprogramowania' },
		{ label: 'Systemy Rozproszone' },
		{ label: 'Pracownia Projektowa' },
		{ label: 'Architektury Komputerów' },
		{ label: 'Inżynieria Bezpieczeństwa' },
		{ label: 'Technologie Internetu Rzeczy' },
	];

	return (
		<Flex direction='column' p={8}>
			<Accordion variant='separated'>
				{classes_list.map((item) => (
					<Accordion.Item
						key={item.label}
						value={item.label}
						bg='neutral.0'
						mih={rem(70)}
						sx={(theme) => ({
							boxShadow: theme.shadows.sm,
							borderRightColor: theme.colors.neutral[3],
							alignContent: 'center',
						})}
					>
						<Accordion.Control fz='md'>
							<Text fz='md' fw={700}>
								{item.label}
							</Text>
						</Accordion.Control>
						<Accordion.Panel>
							<Flex p='xs' direction='column'></Flex>
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</Flex>
	);
};
