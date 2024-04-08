import { addEnrollment, deleteEnrollment } from "@/services/enrollment.service";
import { QueryKeys } from "@/types/query.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddEnrollment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addEnrollment,
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

export const useDeleteEnrollment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteEnrollment,
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