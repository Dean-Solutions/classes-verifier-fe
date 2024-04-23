import { fetcher } from '@/lib/fetcher';
import { Endpoints } from '@/types/endpoints.types';
import { type ChangePasswordType } from '@/types/settings.types';

export const changePassword = async (data: ChangePasswordType) => {
	try {
		return await fetcher(Endpoints.CHANGE_PASSWORD, {
			method: 'PATCH',
			body: data,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
