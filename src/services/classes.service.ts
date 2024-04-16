import { fetcher } from '@/lib/fetcher';
import { type Course, type PagableWrapper } from '@/types/api.types';
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

export const addClass = async (values: AddClassFormType) => {
	try {
		const toSend = {
			name: values.subjectName,
			description: values.subjectDescription,
			tags: values.subjectTags,
		};
		return await fetcher<Course>(Endpoints.SUBJECTS, {
			method: 'POST',
			body: toSend,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export async function editClass(v: {
	value: AddClassFormType;
	subjectId: number;
}) {
	try {
		const toSend = {
			name: v.value.subjectName,
			description: v.value.subjectDescription,
			semester: v.value.subjectSemester,
			tagNames: v.value.subjectTags,
		};

		return await fetcher<Course>(`${Endpoints.SUBJECTS}/${v.subjectId}`, {
			method: 'PUT',
			body: toSend,
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
