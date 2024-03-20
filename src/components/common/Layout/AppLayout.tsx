import { Navbar } from '@/components/Navbar/Navbar';
import { AppShell, type AppShellProps } from '@mantine/core';

export const AppLayout = ({ children, ...rest }: AppShellProps) => {
	return (
		<AppShell {...rest} navbar={<Navbar />}>
			{children}
		</AppShell>
	);
};
