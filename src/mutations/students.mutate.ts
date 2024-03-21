import { deleteStudent } from '@/services/students.service';
import { QueryKeys } from '@/types/query.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteStudent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteStudent,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_STUDENTS],
			});
		},
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};
