import { getServerSession } from 'next-auth';
import { type NextApiResponse, type NextApiRequest } from 'next/types';
import { authOptions } from '../auth';
import { env } from '@/env';

type ServerFetcherParams = {
	req: NextApiRequest;
	res: NextApiResponse;
	path: string;
	config?: RequestInit;
};

export async function serverFetcher<T>({
	req,
	res,
	path,
	config,
}: ServerFetcherParams) {
	const session = await getServerSession(req, res, authOptions);
	// TODO fix on S2 with auth implementation
	if (session || true) {
		const mergedConfig: RequestInit = {
			...config,
			method: req.method,
			cache: 'no-cache',
			headers: {
				'content-type': 'application/json',
			},
		};
		if (req.body) {
			mergedConfig.body = req.body;
		}
		try {
			path = path.startsWith('/') ? path.slice(1) : path;

			const response = await fetch(
				new URL(path, env.API_URL).href,
				mergedConfig,
			);

			if (env.NODE_ENV === 'development') {
				console.log(path);
			}

			if (!response.ok) {
				const responseData = (await response.json()) as unknown;
				res.status(response.status).json(responseData);
				return;
			}

			const data = (await response.json()) as T;
			res.status(response.status).json(data);
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false });
		}
	} else {
		res.status(401).json({ success: false });
	}
}
