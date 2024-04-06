/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { rem, type SelectProps, type ThemeComponent } from '@mantine/core';

export const Select: ThemeComponent & {
	defaultProps: Partial<SelectProps>;
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
				height: 40,
				minHeight: 40,
				fontSize: rem(14),
			},
		}),
	},
	variants: {
		default: (theme) => ({
			dropdown: {
				border: `1px solid ${theme.colors.gray[4]}`,
				boxShadow: `0 0 0 1px ${theme.colors.gray[4]}`,
			},
			item: {
				padding: `${rem(10)} ${rem(15)}`,
				fontSize: rem(14),
				color: theme.colors.gray[7],
				borderRadius: 8,
				'&:last-of-type': {
					borderBottom: 'none',
				},
				'&[data-hovered]': {
					backgroundColor: theme.colors.blue[0],
				},
				'&[data-selected]': {
					backgroundColor: theme.colors.blue[3],
					color: theme.white,
				},
			},
			rightSection: {
				color: theme.colors.gray[5],
			},
		}),
		bigSelect: (theme) => ({
			dropdown: {
				background: theme.colors.seaBlue[0],
				borderRadius: 12,
				border: 'none',
			},
			input: {
				padding: `${rem(32)} ${rem(16)}`,
				color: theme.colors.neutral[0],
				backgroundColor: theme.colors.seaBlue[0],
				outline: 'none',
				border: 'none',
				borderRadius: 12,
			},
			itemsWrapper: {
				borderRadius: 12,
				background: theme.colors.seaBlue[0],
				padding: rem(8),
			},
			item: {
				fontSize: rem(16),
				color: theme.colors.neutral[1],
				padding: `${rem(8)} ${rem(16)}`,

				'&[data-selected]': {
					'&, &:hover': {
						backgroundColor: theme.colors.seaBlue[1],
						color: theme.white,
					},
				},

				'&[data-hovered]': {
					background: theme.colors.seaBlue[2],
				},
			},
			rightSection: {
				marginRight: rem(10),
				color: theme.colors.neutral[1],
				pointerEvents: 'none',
			},
		}),
	},
};
