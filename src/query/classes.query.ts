import {
	getAllClasses,
	getClassById,
	getClassStudents,
	getClasses,
} from '@/services/classes.service';
import { getClassEnrollments } from '@/services/enrollment.service';
import { type Enrollment, type Course } from '@/types/api.types';
import { type EnrollStatus } from '@/types/enrollments.types';
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

export const useGetAllClasses = () => {
	return useQuery({
		queryKey: [QueryKeys.GET_CLASSES],
		queryFn: () => getAllClasses(),
		staleTime: ONE_HOUR,
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

const getClassesStudentsByTag = async (
	semesterTag: string,
	enrollStatuses?: EnrollStatus[],
) => {
	const classes = await getClasses({ tag: semesterTag, page: 0, size: 15 });
	const map = new Map<Course, Enrollment[]>();
	const mappedData = classes || [];

	for (const item of mappedData) {
		const enrollments = await getClassEnrollments(
			item.subjectId,
			enrollStatuses,
		);
		map.set(item, enrollments);
	}

	return Array.from(map).map(([classes, enrollments]) => ({
		class: classes,
		enrollments,
	}));
};

export const useGetClassesStudentsByTag = (
	semesterTag: string,
	enrollStatuses?: EnrollStatus[],
) => {
	return useQuery({
		queryKey: [QueryKeys.GET_STUDENTS, { semesterTag }],
		queryFn: () => getClassesStudentsByTag(semesterTag, enrollStatuses),
		staleTime: 100,
	});
};
