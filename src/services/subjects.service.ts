import {fetcher} from "@/lib/fetcher";
import {Course} from "@/types/api.types";
import {Endpoints} from "@/types/endpoints.types";

export const addSubject = async (values:{
    subjectName: string,
    subjectSemester: number,
    subjectDescription: string,
}) => {
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
