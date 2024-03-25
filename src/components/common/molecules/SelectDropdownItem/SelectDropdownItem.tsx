import { Box, Button, Divider, Flex, Text } from '@mantine/core';
import { forwardRef } from 'react';

type SelectDropdownItemProps = React.ComponentPropsWithoutRef<'div'> & {
	label: string;
	value: string;
	footer?: {
		isFirst?: boolean;
		color?: string;
		isLoading?: boolean;
		IconComp?: React.ReactNode;
		disabled: boolean;
		onClick: () => void;
	};
};

export const SelectDropdownItem = forwardRef<
	HTMLDivElement,
	SelectDropdownItemProps
>(({ label, footer, ...others }: SelectDropdownItemProps, ref) => {
	if (footer) {
		const { disabled, onClick, isFirst, color, IconComp, isLoading } = footer;

		return (
			<Box pt={6} onMouseEnter={others.onMouseEnter}>
				{isFirst && <Divider pb={6} />}
				<Button
					px={14}
					w='100%'
					variant='subtle'
					disabled={disabled}
					onClick={onClick}
					color={color}
					styles={{
						inner: {
							justifyContent: 'flex-start',
						},
					}}
					sx={() => ({
						':hover': {
							backgroundColor: 'var(--mantine-color-seaBlue-2)',
						},
					})}
					loading={isLoading}
				>
					<Flex
						h='100%'
						align='center'
						sx={({ colors }) => ({
							color: disabled ? colors.dark[5] : color || colors.blue[4],
						})}
						c={color}
					>
						<Flex w={24} h={24} align='center'>
							{IconComp}
						</Flex>
						<Text ml={14} color='inherit'>
							{label}
						</Text>
					</Flex>
				</Button>
			</Box>
		);
	} else {
		return (
			<div ref={ref} {...others}>
				<Text>{label}</Text>
			</div>
		);
	}
});

SelectDropdownItem.displayName = 'SelectDropdownItem';
