import { addEnrollment, editEnrollment } from '@/services/enrollment.service';
import { QueryKeys } from '@/types/query.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddEnrollment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addEnrollment,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_ENROLLMENT],
			});
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_STUDENTS],
			});
		},

		onError: (error: unknown) => {
			console.log(error);
		},
	});
};

export const useEditEnrollment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editEnrollment,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_ENROLLMENT],
			});
		},
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};
