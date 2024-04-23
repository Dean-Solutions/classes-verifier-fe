import { type Enrollment } from '@/types/api.types';
import { useCallback, useEffect, useState } from 'react';

export const useEnrollmentSearch = (
	searchValue: string,
	enrollments?: Enrollment[],
) => {
	const [filteredEnrollments, setFilteredEnrollments] = useState<
		Enrollment[] | undefined
	>(enrollments);

	const filterEnrollments = useCallback(() => {
		if (!!searchValue && enrollments) {
			const searchValueLower = searchValue.toLowerCase().trim();
			const filtered = enrollments.filter((enrollment) => {
				return (
					enrollment.subject.name.toLowerCase().includes(searchValueLower) ||
					enrollment.subject.description
						.toLowerCase()
						.includes(searchValueLower)
				);
			});
			setFilteredEnrollments(filtered);
		} else {
			setFilteredEnrollments(enrollments);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, enrollments]);

	useEffect(() => {
		filterEnrollments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, enrollments]);

	return { filteredEnrollments, filterEnrollments };
};
