import { type ThemeComponent, type NumberInputProps } from '@mantine/core';

export const NumberInput: ThemeComponent & {
	defaultProps?: Partial<NumberInputProps>;
} = {
	defaultProps: {
		hideControls: true,
		labelProps: {
			fz: 'md',
		},
		errorProps: {
			fz: 'xs',
			color: 'red',
		},
	},
};
