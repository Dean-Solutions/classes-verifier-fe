import { getClasses } from '@/services/classes.service';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';

export const useGetClasses = (page: number, size?: number, tag?: string) => {
	return useQuery({
		queryKey: [QueryKeys.GET_CLASSES, { tag, page }],
		queryFn: () => getClasses({ tag: tag || '', page, size }),
		staleTime: ONE_HOUR,
		enabled: !!tag,
	});
};
