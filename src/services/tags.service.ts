import { fetcher } from '@/lib/fetcher';
import { type Tag } from '@/types/api.types';
import { Endpoints } from '@/types/endpoints.types';
import { type AddTagFormType } from '@/types/students.types';

export const getTags = async (tagId?: string) => {
	try {
		if (tagId) {
			return await fetcher<Tag>(`${Endpoints.TAGS}/${tagId}`);
		}
		return await fetcher<Tag[]>(Endpoints.TAGS);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const addTag = async (tag: AddTagFormType) => {
	try {
		return await fetcher<Tag>(Endpoints.TAGS, {
			method: 'POST',
			body: tag,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
