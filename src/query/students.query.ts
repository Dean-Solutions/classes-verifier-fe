import { getAllStudents, getStudentByIndex, getStudents } from '@/services/students.service';
import { Student } from '@/types/api.types';
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
		queryKey: [QueryKeys.GET_STUDENTS],
		queryFn: () => getAllStudents(),
		staleTime: ONE_HOUR,
		enabled: true
	});
};

export const useGetStudentByIndex = (index: string) => {
	return useQuery({
		queryKey: [QueryKeys.GET_STUDENTS, { index }],
		queryFn: () => getStudentByIndex(index),
		staleTime: ONE_HOUR,
	});
};
