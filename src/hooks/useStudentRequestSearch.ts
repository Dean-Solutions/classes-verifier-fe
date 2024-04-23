import { type Request } from '@/types/api.types';
import { useCallback, useEffect, useState } from 'react';

export const useStudentRequestsSearch = (
	searchValue: string,
	requests?: Request[],
) => {
	const [filteredRequests, setFilteredRequests] = useState<
		Request[] | undefined
	>(requests);

	const filterRequests = useCallback(() => {
		if (!!searchValue && requests) {
			const searchValueLower = searchValue.toLowerCase().trim();
			const filtered = requests.filter((request) => {
				return request.requestEnrollments[0]?.subject.name
					.replaceAll(' ', '')
					.toLowerCase()
					.includes(searchValueLower);
			});
			setFilteredRequests(filtered);
		} else {
			setFilteredRequests(requests);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, requests]);

	useEffect(() => {
		filterRequests();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, requests]);

	return { filteredRequests, filterRequests };
};
