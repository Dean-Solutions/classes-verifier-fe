import { getTags } from '@/services/tags.service';
import { type Tag } from '@/types/api.types';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';

export const useGetTags = () => {
	return useQuery({
		queryKey: [QueryKeys.GET_CLASSES],
		queryFn: () => getTags() as Promise<Tag[]>,
		staleTime: ONE_HOUR,
	});
};

export const useGetTagById = (tagId: string) => {
	return useQuery({
		queryKey: [QueryKeys.GET_CLASSES, { tagId }],
		queryFn: () => getTags(tagId) as Promise<Tag>,
		staleTime: ONE_HOUR,
	});
};
