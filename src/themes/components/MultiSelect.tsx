import { type MultiSelectProps, rem, type ThemeComponent } from '@mantine/core';

export const MultiSelect: ThemeComponent & {
	defaultProps: Partial<MultiSelectProps>;
} = {
	defaultProps: {
		size: 'md',
		errorProps: {
			fz: 'xs',
			color: 'error',
		},
	},
	sizes: {
		md: () => ({
			input: {
				minHeight: 40,
				fontSize: rem(14),
			},
		}),
	},
};
