import { fetcher } from "@/lib/fetcher";
import { Enrollment } from "@/types/api.types";
import { Endpoints } from "@/types/endpoints.types";



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