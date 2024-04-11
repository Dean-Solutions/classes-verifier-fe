import { getRequests, getUserRequests } from '@/services/request.service';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';

export const useGetUserRequests = (userId: number) => {
	return useQuery({
		queryKey: [QueryKeys.GET_REQUESTS, { userId }],
		queryFn: () => getUserRequests(userId),
		staleTime: ONE_HOUR,
		enabled: true,
	});
};

export const useGetRequests = () => {
	return useQuery({
		queryKey: [QueryKeys.GET_REQUESTS],
		queryFn: () => getRequests(),
		staleTime: ONE_HOUR,
		enabled: true,
	});
};
