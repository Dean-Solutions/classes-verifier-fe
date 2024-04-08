import { fetcher } from "@/lib/fetcher";
import { Enrollment } from "@/types/api.types";
import { Endpoints } from "@/types/endpoints.types";
import { Enroll } from "@/types/enrollments.types";


export const getStudentEnrollments = async (index: string, semesterId?: number) => {
	let content;
	if (semesterId) {
		content = await fetcher<Enrollment[]>(
			`${Endpoints.ENROLLMENT}/index?index=${index}&semesterId=${semesterId}`,
		);
	} else {
		content = await fetcher<Enrollment[]>(
			`${Endpoints.ENROLLMENT}/index?index=${index}`,
		);
	}
	return content;
};

export const addEnrollment = async (enrollment: Enroll) => {
	try {
		return await fetcher<Enroll>(Endpoints.ENROLLMENT, {
			method: 'POST',
			body: enrollment,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const deleteEnrollment = async (index: string) => {
	return fetcher(`${Endpoints.ENROLLMENT}/index?index=${index}`, {
		method: 'DELETE',
	});
}