import { fetcher } from '@/lib/fetcher';
import { type PagableWrapper, type Student } from '@/types/api.types';
import { Endpoints } from '@/types/endpoints.types';
import { type AddStudentFormType } from '@/types/students.types';

export const getStudents = async (semesterTag: string) => {
	// TODO Clear this after S1 DEMO
	// const data_inf_23_24 = Array.from({ length: 40 }, (_, index) => ({
	// 	id: index,
	// 	firstName: 'Paweł',
	// 	lastName: 'Motyka',
	// 	indexNumber: 123456,
	// 	academicYear: index,
	// }));

	// const data_inf_22_23 = Array.from({ length: 40 }, (_, index) => ({
	// 	id: index,
	// 	firstName: 'Paweł_22_23',
	// 	lastName: 'Motyka_22_23',
	// 	indexNumber: 123456,
	// 	academicYear: index,
	// }));

	// if (semesterTag === '1') {
	// 	return Promise.resolve(data_inf_23_24);
	// }

	// if (semesterTag === '2') {
	// 	return Promise.resolve(data_inf_22_23);
	// }

	// return Promise.resolve([]);

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
