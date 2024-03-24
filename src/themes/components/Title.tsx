import { type TitleProps, type ThemeComponent } from '@mantine/core';

export const Title: ThemeComponent & {
	defaultProps?: Partial<TitleProps>;
} = {
	defaultProps: {
		color: 'textColor.0',
		size: 'h2',
		weight: 700,
	},
};
