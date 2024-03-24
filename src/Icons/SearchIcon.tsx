import { type IconProps } from '.';

export const SearchIcon = ({ fill = 'currentColor' }: IconProps) => {
	return (
		<svg
			width='24'
			height='25'
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle cx='11' cy='11.9548' r='6' stroke={fill} />
			<path d='M20 20.9548L17 17.9548' stroke={fill} strokeLinecap='round' />
		</svg>
	);
};
