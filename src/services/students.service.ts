import { fetcher } from '@/lib/fetcher';
import { type PagableWrapper, type Student } from '@/types/api.types';
import { type PaginatedTableParams } from '@/types/common.types';
import { Endpoints } from '@/types/endpoints.types';
import { type AddStudentFormType } from '@/types/students.types';

export const getStudents = async ({
	tag,
	page,
	size = 15,
}: PaginatedTableParams) => {
	const { content, totalElements, totalPages } = await fetcher<
		PagableWrapper<Student[]>
	>(`${Endpoints.STUDENTS}?page=${page}&size=${size}&userSemester=${tag}`);

	return { content, totalPages, totalElements };
};

export const getAllStudents = async (page: number, size: number) => {
	const content = await fetcher<Student[]>
	(`${Endpoints.STUDENTS}?page=${page}&size=${size}`);

	return content;
}

export const getStudentByIndex = async (index: string) => {
	const content = await fetcher<Student>
	(`${Endpoints.STUDENTS}/index/${index}`);

	return content;
}

export const deleteStudent = (id: number) => {
	return fetcher(`${Endpoints.STUDENTS}/${id}`, {
		method: 'DELETE',
	});
};

export const addStudent = async (student: AddStudentFormType) => {
	try {
		return await fetcher<AddStudentFormType>(Endpoints.STUDENTS, {
			method: 'POST',
			body: student,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
