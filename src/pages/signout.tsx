import { Routes } from '@/types/routes';
import { Center, Loader } from '@mantine/core';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignOut() {
	useEffect(() => {
		void (async () => {
			await signOut({ callbackUrl: Routes.SignIn });
		})();
	}, []);

	return (
		<Center h='100vh'>
			<Loader />
		</Center>
	);
}
