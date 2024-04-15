import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Routes } from '@/types/routes';

export default function Custom404() {
	const router = useRouter();

	useEffect(() => {
		void router.replace(Routes.Home);
	});

	return null;
}
