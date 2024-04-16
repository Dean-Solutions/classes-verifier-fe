import { addRequest, editRequest } from '@/services/request.service';
import { QueryKeys } from '@/types/query.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addRequest,
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
