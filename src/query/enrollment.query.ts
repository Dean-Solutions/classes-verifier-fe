import { getStudentEnrollments } from '@/services/enrollment.service';
import { type EnrollStatus } from '@/types/enrollments.types';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';

export const useGetStudentEnrollments = (
	index: string,
	userId?: number,
	semesterId?: number,
	enrollStatuses?: EnrollStatus[],
) => {
	return useQuery({
		queryKey: [QueryKeys.GET_CLASSES, { index }],
		queryFn: () =>
			getStudentEnrollments(index, userId, semesterId, enrollStatuses),
		staleTime: ONE_HOUR,
		enabled: true,
	});
};
