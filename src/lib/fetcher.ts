/* eslint-disable @typescript-eslint/no-unsafe-member-access */
type FetcherConfig = Omit<RequestInit, 'body'> & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body?: any;
	headers?: HeadersInit;
};

export async function fetcher<T>(
	path: string,
	config?: FetcherConfig,
): Promise<T> {
	path = path.startsWith('/') ? path.slice(1) : path;
	try {
		const headers = new Headers(config?.headers || {});
		const mergedConfig: RequestInit = {
			...config,
			cache: 'no-cache',
			headers,
		};
		if (config?.body) {
			mergedConfig.body = JSON.stringify(config.body);
		}
		const url = `/api/be/${path}`;

		const response = await fetch(url, mergedConfig);

		const data = await response.json();

		if (response.ok) {
			return data as unknown as T;
		}

		if (response.ok) {
			return data as T;
		}
		if (data.error) {
			return Promise.reject(data.error);
		} else {
			return Promise.reject(new Error(JSON.stringify(data)));
		}
	} catch (error) {
		return Promise.reject(error);
	}
}
