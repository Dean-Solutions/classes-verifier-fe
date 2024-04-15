import { fetcher } from '@/lib/fetcher';
import { type Tag } from '@/types/api.types';
import { Endpoints } from '@/types/endpoints.types';
import { type SignUpFormType, type SignInFormType } from '@/types/login.types';

export const login = async (data: SignInFormType) => {
	try {
		return await fetcher<Tag>(Endpoints.LOGIN, {
			method: 'POST',
			body: data,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const signUp = async (data: SignUpFormType) => {
	try {
		return await fetcher<Tag>(Endpoints.REGISTER, {
			method: 'POST',
			body: data,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
