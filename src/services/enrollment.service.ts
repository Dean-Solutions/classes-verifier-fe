import { fetcher } from '@/lib/fetcher';
import { type PagableWrapper, type Enrollment } from '@/types/api.types';
import { Endpoints } from '@/types/endpoints.types';
import { type EnrollStatus, type PostEnroll } from '@/types/enrollments.types';

export const getStudentEnrollments = async (
	index: string,
	enrollStatuses: EnrollStatus[],
	userId?: number,
	semesterId?: number,
) => {
	let data;
	const statuses = enrollStatuses ? enrollStatuses.join(',') : '';
	if (semesterId) {
		data = await fetcher<PagableWrapper<Enrollment[]>>(
			`${Endpoints.ENROLLMENT}?page=${0}&size=${10000}&indexNumber=${index}&semesterId=${semesterId}&statuses=${encodeURIComponent(statuses)}`,
		);
	} else {
		data = await fetcher<PagableWrapper<Enrollment[]>>(
			`${Endpoints.ENROLLMENT}?page=${0}&size=${10000}&indexNumber=${index}&statuses=${encodeURIComponent(statuses)}`,
		);
	}
	const { content } = data;
	return content;
};

export const getClassEnrollments = async (
	subjectId: number,
	enrollStatuses: EnrollStatus[],
) => {
	const statuses = enrollStatuses ? enrollStatuses.join(',') : '';

	const { content } = await fetcher<PagableWrapper<Enrollment[]>>(
		`${Endpoints.ENROLLMENT}?page=${0}&size=${10000}&subjectId=${subjectId}&statuses=${encodeURIComponent(statuses)}`,
	);
	return content;
};

export const addEnrollment = async (enrollment: PostEnroll) => {
	try {
		return await fetcher<PostEnroll>(Endpoints.ENROLLMENT, {
			method: 'POST',
			body: enrollment,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const editEnrollment = async (enrollment: PostEnroll) => {
	try {
		return await fetcher<PostEnroll>(Endpoints.ENROLLMENT, {
			method: 'PUT',
			body: enrollment,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const deleteEnrollment = async (enrollment: PostEnroll) => {
	try {
		return await fetcher<PostEnroll>(Endpoints.ENROLLMENT, {
			method: 'DELETE',
			body: enrollment,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
