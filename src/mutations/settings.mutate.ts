import { changePassword } from '@/services/settings.service';
import { Routes } from '@/types/routes';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

export const useChangePassword = () => {
	const router = useRouter();
	const t = useTranslations('Common');
	const tSettings = useTranslations('Settings');

	return useMutation({
		mutationFn: changePassword,
		onSuccess: async () => {
			notifications.show({
				title: tSettings('Notification.success'),
				message: tSettings('Notification.successMessage'),
				color: 'success',
				withBorder: true,
			});
			await router.replace(Routes.Logout);
		},
		onError: (error: unknown) => {
			notifications.show({
				title: t('error'),
				message: t('errorMessage'),
				color: 'error',
				withBorder: true,
			});
			console.log(error);
		},
	});
};
