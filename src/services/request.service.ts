import { fetcher } from '@/lib/fetcher';
import { type PagableWrapper, type Request } from '@/types/api.types';
import { Endpoints } from '@/types/endpoints.types';
import { type UserRequest } from '@/types/request.types';

export const getUserRequests = async (userId: number) => {
	const { content } = await fetcher<PagableWrapper<Request[]>>(
		`${Endpoints.REQUEST}?page=${0}&size=${10_000}&senderId=${userId}`,
	);
	return { content };
};

export const getRequests = async () => {
	const { content } = await fetcher<PagableWrapper<Request[]>>(
		`${Endpoints.REQUEST}?page=${0}&size=${10_000}`,
	);
	return { content };
};

export const addRequest = async (userRequest: UserRequest) => {
	console.log(userRequest);
	try {
		return await fetcher<Request>(Endpoints.REQUEST, {
			method: 'POST',
			body: userRequest,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const editRequest = async (userRequest: UserRequest) => {
	console.log(userRequest);
	try {
		return await fetcher<Request>(Endpoints.REQUEST, {
			method: 'PUT',
			body: userRequest,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
