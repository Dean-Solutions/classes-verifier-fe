import { type NextApiRequest, type NextApiResponse } from 'next';
import { serverFetcher } from '@/server/lib/serverFetcher';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = req.query.id as string;
	await serverFetcher({
		req,
		res,
		path: `students/${id}`,
	});
}
