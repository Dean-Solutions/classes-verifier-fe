import { createStyles, rem } from '@mantine/core';

export default createStyles(({ colors, radius, fontSizes, fn }) => ({
	root: {
		borderRadius: radius.md,
		border: `1px solid ${colors.dark[6]}`,
		padding: `${rem(16)} ${rem(24)}`,
		paddingTop: 0,
	},
	container: {
		overflow: 'auto',
		background: colors.dark[6],
		'::-webkit-scrollbar': {
			width: 10,
		},

		'::-webkit-scrollbar-track': {
			background: 'transparent',
		},

		'::-webkit-scrollbar-thumb': {
			borderRadius: 6,
			boxShadow: `inset 0 0 ${rem(10)} ${rem(10)} ${colors.dark[0]}`,
			border: `3px solid ${colors.dark[8]}`,
		},
	},
	table: {
		borderCollapse: 'collapse',
		borderSpacing: 0,
		tableLayout: 'fixed',
		width: '100%',
		minHeight: rem(300),
		position: 'relative',
		borderRadius: radius.md,
		overflow: 'hidden',
		backgroundColor: colors.neutral[0],
		boxShadow: `0 0 ${rem(24)} ${fn.rgba(colors.dark[0], 0.5)}`,
	},
	thead: {
		top: 0,
		margin: 0,
		position: 'sticky',
		fontSize: fontSizes.sm,
		color: colors.neutral[0],
		textAlign: 'left',
		background: colors.dark[6],
		borderRadius: `${radius.lg} ${radius.lg} 0 0`,
		borderBottom: `1px solid ${colors.dark[6]}`,
		borderTop: `1px solid ${colors.dark[6]}`,
		zIndex: 1,
	},
	tableRow: {
		borderBottom: `1px solid ${colors.neutral[5]}`,
		padding: rem(16),
	},
	emptyTableRow: {
		width: '100%',
		display: 'block',
		justifyContent: 'center',
	},
	tableCell: {
		padding: `0 ${rem(16)}`,
		height: 60,
	},
	tfoot: {
		color: colors.neutral[0],
		height: rem(43),
		background: colors.dark[6],
	},
}));
