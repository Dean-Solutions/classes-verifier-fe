import { addRequest, editRequest } from '@/services/request.service';
import { QueryKeys } from '@/types/query.types';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

export const useAddRequest = () => {
	const queryClient = useQueryClient();
	const t = useTranslations('HomeStudent');

	return useMutation({
		mutationFn: addRequest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_REQUESTS],
			});
			notifications.show({
				title: t('notificationTitleSuccess'),
				message: t('notificationMessageSuccess'),
				withCloseButton: true,
				autoClose: 3000,
				color: 'green.0',
			});
		},
		onError: (error: unknown) => {
			console.log(error);
			notifications.show({
				title: t('notificationTitleError'),
				message: t('notificationMessageError'),
				withCloseButton: true,
				autoClose: 3000,
				color: 'red.0',
			});
		},
	});
};

export const useEditRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editRequest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_REQUESTS],
			});
		},
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};
