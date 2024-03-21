import { getStudents } from '@/services/students.service';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';

export const useGetStudents = (semesterTag: string) => {
	return useQuery({
		queryKey: [QueryKeys.GET_STUDENTS, { semesterTag }],
		queryFn: () => getStudents(semesterTag),
		staleTime: ONE_HOUR,
		enabled: !!semesterTag,
	});
};
