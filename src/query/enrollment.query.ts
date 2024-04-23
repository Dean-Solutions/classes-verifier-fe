import { getStudentEnrollments } from '@/services/enrollment.service';
import { type EnrollStatus } from '@/types/enrollments.types';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';

export const useGetStudentEnrollments = (
	index: string,
	enrollStatuses: EnrollStatus[],
	userId?: number,
	semesterId?: number,
) => {
	return useQuery({
		queryKey: [QueryKeys.GET_ENROLLMENT],
		queryFn: () =>
			getStudentEnrollments(index, enrollStatuses, userId, semesterId),
		staleTime: ONE_HOUR,
	});
};
