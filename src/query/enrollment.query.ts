import { getStudentEnrollments } from "@/services/enrollment.service";
import { ONE_HOUR, QueryKeys } from "@/types/query.types";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentEnrollments = (index: string, semesterId?: number) => {
	return useQuery({
		queryKey: [QueryKeys.GET_CLASSES, { index }],
		queryFn: () => getStudentEnrollments(index, semesterId),
		staleTime: ONE_HOUR,
		enabled: !!index,
	});
};