import { type NextApiRequest, type NextApiResponse } from 'next';
import { serverFetcher } from '@/server/lib/serverFetcher';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await serverFetcher({
		req,
		res,
		path: 'tags/', // TODO delete /
	});
}
