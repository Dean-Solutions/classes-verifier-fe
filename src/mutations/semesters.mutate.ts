import { addSemester } from '@/services/semesters.service';
import { QueryKeys } from '@/types/query.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddSemester = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addSemester,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_SEMESTERS],
			});
		},
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};
