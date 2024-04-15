import {
	type DefaultMantineColor,
	type MantineTheme,
	rem,
	type Tuple,
	type MantineThemeOverride,
} from '@mantine/core';
import { type CustomColorKeys, customColors } from './colors';
import { Title } from './components/Title';
import { Select } from './components/Select';
import { TextInput } from './components/TextInput';
import { NumberInput } from './components/NumberInput';
import { MultiSelect } from './components/MultiSelect';
import { Input } from './components/Input';

const globalFont = 'Inter, sans-serif';

type ExtendedCustomColors = CustomColorKeys | DefaultMantineColor;

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
	}
	export type ThemeComponent = MantineTheme['components'][string];
	export type HeadingStyle = {
		fontSize: string;
		lineHeight: string;
		fontWeight: number;
	};
}

export const theme: MantineThemeOverride = {
	globalStyles: (theme) => ({
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		body: {
			...theme.fn.fontStyles(),
			color: theme.colors.textColor[0],
			background: theme.colors.bg[0],
		},
		'@font-face': {
			fontFamily: 'Inter',
			src: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap',
		},
	}),
	colorScheme: 'light',
	fontFamily: globalFont,
	headings: {
		fontFamily: globalFont,
		sizes: {
			h1: {
				// Heading large
				fontSize: rem(32),
				lineHeight: rem(40),
				fontWeight: 400,
			},
			h2: {
				// Heading Medium
				fontSize: rem(28),
				lineHeight: rem(36),
				fontWeight: 400,
			},
			h3: {
				// Heading Small
				fontSize: rem(24),
				lineHeight: rem(36),
				fontWeight: 400,
			},
			h4: {
				// Title large
				fontSize: rem(22),
				lineHeight: rem(28),
				fontWeight: 500,
			},
			h5: {
				// Title Medium
				fontSize: rem(16),
				lineHeight: rem(24),
				fontWeight: 500,
			},
			h6: {
				// Title Small
				fontSize: rem(14),
				lineHeight: rem(24),
				fontWeight: 500,
			},
		},
	},
	radius: {
		xs: rem(4),
		sm: rem(6),
		md: rem(8),
		lg: rem(12),
		xl: rem(14),
	},
	spacing: {
		xs: rem(10),
		sm: rem(12),
		md: rem(16),
		lg: rem(20),
		xl: rem(22),
	},
	defaultRadius: 'md',
	fontSizes: {
		// body small
		sm: rem(12),
		// body medium
		md: rem(14),
		// body large
		lg: rem(16),
		xl: rem(24),
	},
	primaryColor: 'blue',
	primaryShade: 4,
	colors: customColors as MantineThemeOverride['colors'],
	components: {
		Title,
		Select,
		NumberInput,
		TextInput,
		MultiSelect,
		Input,
	},
};
