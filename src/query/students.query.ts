import {
	getAllStudents,
	getLoggedStudent,
	getStudents,
} from '@/services/students.service';
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetStudents = (tag: string, page: number, size?: number) => {
	return useQuery({
		queryKey: [QueryKeys.GET_STUDENTS, { tag, page }],
		queryFn: () => getStudents({ tag, page, size }),
		staleTime: ONE_HOUR,
		enabled: !!tag,
		placeholderData: keepPreviousData,
	});
};

export const useGetAllStudents = () => {
	return useQuery({
		queryKey: [QueryKeys.GET_ALL_STUDENTS],
		queryFn: () => getAllStudents(),
		staleTime: ONE_HOUR,
	});
};

export const useGetLoggedStudent = () => {
	return useQuery({
		queryKey: [QueryKeys.GET_LOGGED_STUDENT],
		queryFn: () => getLoggedStudent(),
		staleTime: ONE_HOUR,
	});
};
