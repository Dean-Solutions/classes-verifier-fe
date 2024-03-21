import { getClasses } from '@/services/classes.service';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';

export const useGetClasses = (semesterTag: string) => {
	return useQuery({
		queryKey: [QueryKeys.GET_CLASSES, { semesterTag }],
		queryFn: () => getClasses(semesterTag),
		staleTime: ONE_HOUR,
		enabled: !!semesterTag,
	});
};
