import { env } from '@/env';
import { type RefreshedTokens } from '@/types/api.types';
import { type User } from 'next-auth';

export const refreshAccessToken = async (user: User) => {
	try {
		const response = await fetch(`${env.API_URL}/auth/refresh-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.refresh_token,
			},
		});

		const data = (await response.json()) as RefreshedTokens;

		return data;
	} catch (error) {
		console.error('Failed to refresh access token', error);
		return null;
	}
};
