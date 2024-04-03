import { fetcher } from '@/lib/fetcher';
import { type PagableWrapper, type Student } from '@/types/api.types';
import { Endpoints } from '@/types/endpoints.types';
import { type AddStudentFormType } from '@/types/students.types';

export const getStudents = async (semesterTag: string) => {

	const pageable = {
		page: 0,
		size: 10000,
		sort: ['ASC'],
	};
	const { content } = await fetcher<PagableWrapper<Student[]>>(
		`${Endpoints.STUDENTS}?pageable=${JSON.stringify(
			pageable,
		)}&tag=${semesterTag}`,
	);
	return content;
};

export const deleteStudent = (id: number) => {
	console.log('deleteStudent: ', id);
	return Promise.resolve(true);
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
