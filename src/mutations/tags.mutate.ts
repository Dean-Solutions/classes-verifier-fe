import { addTag } from '@/services/tags.service';
import { QueryKeys } from '@/types/query.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddTags = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addTag,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_TAGS],
			});
		},
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};
