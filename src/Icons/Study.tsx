import { type IconProps } from '.';

export const Study = ({ fill = 'currentColor' }: IconProps) => {
	return (
		<svg
			width='26'
			height='26'
			viewBox='0 0 26 26'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M4.0754 8.84444L12.1239 5.26016C12.6418 5.02951 13.2332 5.02951 13.7511 5.26016L21.7996 8.84444C22.1239 8.98885 22.1239 9.44911 21.7996 9.59352L13.7511 13.1778C13.2332 13.4084 12.6418 13.4084 12.1239 13.1778L4.0754 9.59352C3.75112 9.44911 3.75112 8.98885 4.0754 8.84444Z'
				stroke={fill}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M22.1016 9.21898V13.5401'
				stroke={fill}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M7.00781 11.3796V16.781C7.00781 16.781 7.54688 18.9416 12.9375 18.9416C18.3281 18.9416 18.8672 16.781 18.8672 16.781V11.3796'
				stroke={fill}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};
