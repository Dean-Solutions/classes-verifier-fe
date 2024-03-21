import {
	Box,
	Flex,
	Loader as MantineLoader,
	type LoaderProps as MantineLoaderProps,
} from '@mantine/core';

type LoaderProps = MantineLoaderProps & {
	innerLabel?: React.ReactNode;
	bottomLabel?: React.ReactNode;
};

export const Loader = ({ bottomLabel, innerLabel, ...props }: LoaderProps) => {
	return (
		<Flex direction='column' align='center'>
			<Box pos='relative' lh='0'>
				<MantineLoader {...props} />
				{innerLabel && (
					<Box
						pos='absolute'
						top='50%'
						left='50%'
						sx={{ transform: 'translate(-50%, -50%)' }}
					>
						{innerLabel}
					</Box>
				)}
			</Box>
			{bottomLabel}
		</Flex>
	);
};
