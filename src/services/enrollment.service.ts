import { fetcher } from '@/lib/fetcher';
import { type PagableWrapper, type Enrollment } from '@/types/api.types';
import { Endpoints } from '@/types/endpoints.types';
import { type EnrollStatus, type PostEnroll } from '@/types/enrollments.types';

export const getStudentEnrollments = async (
	index: string,
	userId?: number,
	semesterId?: number,
	enrollStatuses?: EnrollStatus[],
) => {
	let data;
	let statuses = '';
	if (enrollStatuses) {
		statuses += `&statuses=${enrollStatuses[0]}`;
		for (let i = 1; i < enrollStatuses.length; i++) {
			statuses += `%2C${enrollStatuses[i]}`;
		}
	}
	if (semesterId) {
		data = await fetcher<PagableWrapper<Enrollment[]>>(
			`${Endpoints.ENROLLMENT}?page=${0}&size=${10000}&indexNumber=${index}&semesterId=${semesterId}${statuses}`,
		);
	} else {
		data = await fetcher<PagableWrapper<Enrollment[]>>(
			`${Endpoints.ENROLLMENT}?page=${0}&size=${10000}&indexNumber=${index}${statuses}`,
		);
	}
	const { content } = data;
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
