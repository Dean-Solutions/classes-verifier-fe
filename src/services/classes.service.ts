import {fetcher} from "@/lib/fetcher";
import {Course, Tag} from "@/types/api.types";
import {Endpoints} from "@/types/endpoints.types";
import {AddClassFormType} from "@/types/subject.types";

export const getClasses = (semesterTag: string) => {
	// TODO Fetch from backend
	const data_inf_sem_1 = Array.from({ length: 40 }, (_, index) => ({
		id: index,
		name: 'Inżyniera Oprogramowania',
		description:
			'Opis przedmiotu Inżyniera Oprogramowania 23-24 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. ',
	}));
	const data_inf_sem_2 = Array.from({ length: 40 }, (_, index) => ({
		id: index,
		name: 'Bazy Danych',
		description: '',
	}));

	if (semesterTag === 'Semestr 1') {
		return Promise.resolve(data_inf_sem_1);
	}

	if (semesterTag === 'Semestr 2') {
		return Promise.resolve(data_inf_sem_2);
	}

	return Promise.resolve([]);
};

export const addClass = async (values:AddClassFormType) => {
	try {
		if (values) {
			const toSend = {name: values.subjectName, description: values.subjectDescription}
			return await fetcher<Course>(`${Endpoints.SUBJECTS}`, {
				method: 'POST',
				body: toSend,
			});
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

