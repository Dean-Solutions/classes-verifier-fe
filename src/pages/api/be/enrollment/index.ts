import { type NextApiRequest, type NextApiResponse } from 'next';
import { serverFetcher } from '@/server/lib/serverFetcher';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const query = new URLSearchParams(
		req.query as Record<string, string>,
	).toString();
	await serverFetcher({
		req,
		res,
		path: 'enrollment' + (query ? `?${query}` : ''),
	});
}
