import {
	getClassById,
	getClassStudents,
	getClasses,
} from '@/services/classes.service';
import { type Course, type Student } from '@/types/api.types';
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

export const useGetClassById = (subjectId: number) => {
	return useQuery({
		queryKey: [QueryKeys.GET_CLASSES, { subjectId }],
		queryFn: () => getClassById(subjectId),
		staleTime: ONE_HOUR,
	});
};

export const useGetClassStudents = (subjectId: number, semesterId?: number) => {
	return useQuery({
		queryKey: [QueryKeys.GET_STUDENTS, { subjectId }],
		queryFn: () => getClassStudents(subjectId, semesterId),
		staleTime: ONE_HOUR,
		enabled: true,
	});
};

const getClassesStudentsByTag = async (semesterTag: string) => {
	const classes = await getClasses({ tag: semesterTag, page: 0, size: 15 });
	const map = new Map<Course, Student[]>();
	const mappedData = classes || [];

	for (const item of mappedData) {
		const students = await getClassStudents(item.subjectId);
		map.set(item, students);
	}

	return Array.from(map).map(([classes, students]) => ({
		class: classes,
		students,
	}));
};

export const useGetClassesStudentsByTag = (semesterTag: string) => {
	return useQuery({
		queryKey: [QueryKeys.GET_STUDENTS, { semesterTag }],
		queryFn: () => getClassesStudentsByTag(semesterTag),
		staleTime: 100,
		enabled: true,
	});
};
