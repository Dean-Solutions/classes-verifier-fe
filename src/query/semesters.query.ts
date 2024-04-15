import { getSemesters } from '@/services/semesters.service';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';

export const useGetSemesters = () => {
	return useQuery({
		queryKey: [QueryKeys.GET_SEMESTERS],
		queryFn: () => getSemesters(),
		staleTime: ONE_HOUR,
	});
};
