import { type ThemeComponent, type TextInputProps } from '@mantine/core';

export const TextInput: ThemeComponent & {
	defaultProps?: Partial<TextInputProps>;
} = {
	defaultProps: {
		labelProps: {
			fz: 'md',
		},
		errorProps: {
			fz: 'xs',
			color: 'error',
		},
	},
};
