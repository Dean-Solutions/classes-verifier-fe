import { type NextApiRequest, type NextApiResponse } from 'next';
import { serverFetcher } from '@/server/lib/serverFetcher';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { index } = req.query;

	await serverFetcher({
		req,
		res,
		path: `students/index/${index?.toString()}`,
	});
}
