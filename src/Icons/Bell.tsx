import { type IconProps } from '.';

export const Bell = ({ fill = 'currentColor' }: IconProps) => {
	return (
		<svg
			width='26'
			height='26'
			viewBox='0 0 26 26'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M7.2798 10.1031C7.48379 7.61745 9.58399 5.64215 12.0779 5.62688C14.5491 5.61174 16.5667 7.5692 16.8167 10.0278C16.9708 11.5426 17.3972 12.938 18.2536 14.4235C19.1227 15.9311 18.1938 18.0365 16.4536 18.0365H7.70451C5.95987 18.0365 5.05178 15.8785 5.93027 14.3711C6.77156 12.9277 7.15964 11.5673 7.2798 10.1031Z'
				stroke={fill}
				strokeWidth={1.5}
			/>
			<path
				d='M12 3.0365V5.0365'
				stroke={fill}
				strokeWidth={1.5}
				strokeLinecap='round'
			/>
			<path
				d='M14 18.0365C14 19.1411 13.1046 20.0365 12 20.0365C10.8954 20.0365 10 19.1411 10 18.0365'
				stroke={fill}
				strokeWidth={1.5}
			/>
		</svg>
	);
};
