import { type IconProps } from '.';

export const Edit = ({ fill = 'currentColor' }: IconProps) => {
	return (
		<svg
			width='19'
			height='19'
			viewBox='0 0 19 19'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M15.0054 12.1339V14.8843C15.0054 15.249 14.8605 15.5988 14.6026 15.8567C14.3447 16.1146 13.9949 16.2595 13.6301 16.2595H4.00358C3.63885 16.2595 3.28905 16.1146 3.03115 15.8567C2.77325 15.5988 2.62836 15.249 2.62836 14.8843V5.25775C2.62836 4.89301 2.77325 4.54322 3.03115 4.28532C3.28905 4.02741 3.63885 3.88252 4.00358 3.88252H6.75403'
				stroke={fill}
				strokeWidth='1.37522'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M9.84828 11.9963L16.3806 5.39526L13.4926 2.50729L6.96031 9.03961L6.75403 12.1339L9.84828 11.9963Z'
				stroke={fill}
				strokeWidth='1.37522'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};
