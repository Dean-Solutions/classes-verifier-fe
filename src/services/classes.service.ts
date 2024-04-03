import {fetcher} from "@/lib/fetcher";
import {Course, type PagableWrapper} from "@/types/api.types";
import {Endpoints} from "@/types/endpoints.types";
import {AddClassFormType} from "@/types/classes.types";

export const getClasses = async (semesterTag: string) => {

	const pageable = {
		page: 0,
		size: 10000,
		sort: ['ASC'],
	};

	const { content } = await fetcher<PagableWrapper<Course[]>>(
		`${Endpoints.SUBJECTS}?pageable=${JSON.stringify(
			pageable,
		)}&tags=${semesterTag}`,
	);
	return content;
};

export const addClass = async (values:AddClassFormType) => {
	try {
		const toSend = {name: values.subjectName, description: values.subjectDescription}
		return await fetcher<Course>(Endpoints.SUBJECTS, {
			method: 'POST',
			body: toSend,
		});
	} catch (error) {
		return Promise.reject(error);
	}
}


export const editClass = async (value: Course) => {
	try {
		const toSend = {name: value.name, description: value.description}

		return await fetcher<Course>(`${Endpoints.SUBJECTS}/${value.subjectId}`, {
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
}

