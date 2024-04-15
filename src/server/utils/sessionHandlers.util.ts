import {
	type User,
	type Session,
	type Account,
	type Awaitable,
	type Profile,
} from 'next-auth';
import { type JWT } from 'next-auth/jwt';

export type ProcessSessionProps = {
	session: Session;
	token: JWT;
	user: User;
	newSession: any;
	trigger: 'update';
};

export type JWTCallbackProps = {
	token: JWT;
	account: Account | null;
	user: User;
	profile?: Profile;
};

export const TIMEOUT_DURATION = 1000 * 60; // 60 seconds
export const REFRESH_ACCESS_TOKEN_ERROR = 'RefreshAccessTokenError';

export const shouldRefreshTokens = (...timestamps: number[]) => {
	for (const timestamp of timestamps) {
		if (Math.round((timestamp - Date.now()) / 1000 - 60) <= 0) {
			return true;
		}
	}
	return false;
};

function isSessionValid(session: Session) {
	return true; // TODO Implement
}

async function refreshSession(session: Session) {
	try {
		return Promise.resolve(session); // TODO Implement
	} catch (error) {
		console.error(error);
	}
}

export async function processSession({ session, token }: ProcessSessionProps) {
	return { ...session, ...token }; // TODO Implement
}

export function handleJWTCallback({
	token,
	user,
}: JWTCallbackProps): Awaitable<JWT> {
	if (user) {
		return {
			...token,
			user,
			expires_at: Date.now() + 5 * 60 * 1000,
		};
	}
	return {
		...token,
		expires_at: Date.now() + 5 * 60 * 1000,
	};
	// return { ...token, error: REFRESH_ACCESS_TOKEN_ERROR };
}
