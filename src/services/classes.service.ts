import { fetcher } from '@/lib/fetcher';
import {
	type Student,
	type Course,
	type PagableWrapper,
} from '@/types/api.types';
import { type AddClassFormType } from '@/types/classes.types';
import { type PaginatedTableParams } from '@/types/common.types';
import { Endpoints } from '@/types/endpoints.types';

export const getClasses = async ({
	tag,
	page,
	size = 15,
}: PaginatedTableParams) => {
	const { content } = await fetcher<PagableWrapper<Course[]>>(
		`${Endpoints.SUBJECTS}?page=${page}&size=${size}&tags=${tag}`,
	);
	return content;
};

export const getAllClasses = async () => {
	const { content } = await fetcher<PagableWrapper<Course[]>>(
		`${Endpoints.SUBJECTS}?page=${0}&size=${30}`,
	);
	return content;
};

export const getClassById = async (subjectId: number) => {
	const content = await fetcher<Course>(`${Endpoints.SUBJECTS}/${subjectId}`);
	return content;
};

export const getClassStudents = async (
	subjectId: number,
	semesterId?: number,
) => {
	let content;
	if (semesterId) {
		content = await fetcher<Student[]>(
			`${Endpoints.SUBJECTS}/${subjectId}/users?semesterId=${semesterId}`,
		);
	} else {
		content = await fetcher<Student[]>(
			`${Endpoints.SUBJECTS}/${subjectId}/users`,
		);
	}
	return content;
};

export const addClass = async (values: AddClassFormType) => {
	try {
		const toSend = {
			name: values.subjectName,
			description: values.subjectDescription,
			tagNames: values.subjectTags,
		};
		return await fetcher<Course>(Endpoints.SUBJECTS, {
			method: 'POST',
			body: toSend,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export async function editClass(subjectId: number, value: AddClassFormType) {
	try {
		return await fetcher<Course>(`${Endpoints.SUBJECTS}/${subjectId}`, {
			method: 'PUT',
			body: {
				name: value.subjectName,
				description: value.subjectDescription,
				semester: value.subjectSemester,
				tagNames: value.subjectTags,
			},
		});
	} catch (error) {
		return Promise.reject(error);
	}
}

export const deleteClass = async (value: Course) => {
	try {
		return await fetcher<Course>(`${Endpoints.SUBJECTS}/${value.subjectId}`, {
			method: 'DELETE',
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
