import { fetcher } from '@/lib/fetcher';
import { type Semester } from '@/types/api.types';
import { Endpoints } from '@/types/endpoints.types';
import { type AddSemesterFormType } from '@/types/semesters.types';

export const addSemester = async (values: AddSemesterFormType) => {
	try {
		const deadline = new Date(values.deadline);
		deadline.setHours(23, 59, 59, 999);
		return await fetcher<Semester>(Endpoints.SEMESTERS, {
			method: 'POST',
			body: {
				...values,
				year: values.year.getFullYear(),
				deadline: deadline.toISOString(),
			},
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getSemesters = async () => {
	try {
		return await fetcher<Semester[]>(Endpoints.SEMESTERS);
	} catch (error) {
		return Promise.reject(error);
	}
};
