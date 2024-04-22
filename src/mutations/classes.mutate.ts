import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query.types';
import { addClass, deleteClass, editClass } from '@/services/classes.service';
import { type Course } from '@/types/api.types';
import { type AddClassFormType } from '@/types/classes.types';

export const useAddClass = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addClass,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_CLASSES],
			});
		},
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};

export const useEditClass = () => {
	const queryClient = useQueryClient();

	return useMutation<Course, unknown, AddClassFormType & { subjectId: number }>(
		{
			mutationFn: (item) => editClass(item.subjectId, item),
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [QueryKeys.GET_CLASSES],
				});
			},
			onError: (error: unknown) => {
				console.log(error);
			},
		},
	);
};

export const useDeleteClass = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteClass,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_CLASSES],
			});
		},
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};
