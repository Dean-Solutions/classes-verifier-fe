/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { rem, type InputProps, type ThemeComponent } from '@mantine/core';

export const Input: ThemeComponent & {
	defaultProps: Partial<InputProps>;
} = {
	defaultProps: { size: 'md' },
	sizes: {
		md: () => ({
			input: {
				height: 40,
				minHeight: 40,
				fontSize: rem(16),
			},
		}),
	},
	styles: (theme) => {
		return {
			input: {
				color: theme.colors.textColor[0],
				borderColor: theme.colors.neutral[5],
				background: theme.colors.neutral[3],
				'&:hover:not(:focus):not([data-invalid]):not(:disabled)': {
					borderColor: theme.colors.neutral[2],
					background: theme.colors.neutral[5],
				},
				'&[data-invalid]': {
					borderColor: theme.colors.error[4],
				},
				'&[data-invalid]::placeholder': {
					color: theme.colors.error[4],
				},
				'&[data-invalid]:not(:focus):hover': {
					background: theme.colors.neutral[5],
				},
				'&:focus:not([data-invalid])': {
					borderColor: theme.colors.blue[4],
				},
				'&:disabled': {
					borderColor: theme.colors.dark[0],
					color: theme.colors.dark[0],
					background: theme.colors.dark[5],
				},
				'&::placeholder': {
					color: theme.colors.dark[3],
				},
			},
			icon: {
				color: theme.colors.dark[5],
			},
			rightSection: {
				color: theme.colors.dark[5],
			},
		};
	},
};
