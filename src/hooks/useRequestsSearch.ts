import { type Request } from '@/types/api.types';
import { useCallback, useEffect, useState } from 'react';

export const useRequestsSearch = (
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
				return (
					request.requestEnrollments[0]?.user.firstName
						.replaceAll(' ', '')
						.toLowerCase()
						.includes(searchValueLower) ||
					request.requestEnrollments[0]?.user.lastName
						.replaceAll(' ', '')
						.toLowerCase()
						.includes(searchValueLower) ||
					request.requestEnrollments[0]?.user.indexNumber
						.toLowerCase()
						.includes(searchValueLower) ||
					'semestr ' + request.requestEnrollments[0]?.user.semester ===
						searchValueLower
				);
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
