import { type User, type Session, type Account, type Profile } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';
import { refreshAccessToken } from './refreshAccessToken.util';

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

export async function processSession({ session, token }: ProcessSessionProps) {
	return { ...session, ...token };
}

export async function handleJWTCallback({
	token,
	user,
}: JWTCallbackProps): Promise<JWT> {
	if (user) {
		const decodedToken = jwtDecode(user.access_token);
		const decodedRefreshToken = jwtDecode(user.refresh_token);
		if (
			!decodedRefreshToken.exp ||
			decodedRefreshToken.exp < Date.now() / 1000
		) {
			return { ...token, error: REFRESH_ACCESS_TOKEN_ERROR };
		}

		if (!decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
			const refreshedTokens = await refreshAccessToken(user);
			const decodedRefreshedToken = jwtDecode(
				refreshedTokens?.access_token ?? '',
			);

			if (!refreshedTokens || !decodedRefreshedToken?.exp) {
				return { ...token, error: REFRESH_ACCESS_TOKEN_ERROR };
			}

			return {
				...token,
				user: {
					...user,
					access_token: refreshedTokens.access_token,
					refresh_token: refreshedTokens.refresh_token,
				},
				accessToken: refreshedTokens.access_token,
				refreshToken: refreshedTokens.refresh_token,
				expires_at: decodedRefreshedToken.exp * 1000,
			};
		}

		return {
			...token,
			user,
			accessToken: user.access_token,
			refreshToken: user.refresh_token,
			expires_at: decodedToken.exp * 1000,
		};
	}
	return token;
}
