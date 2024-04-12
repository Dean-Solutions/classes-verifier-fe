import { type Course } from '@/types/api.types';
import { useCallback, useEffect, useState } from 'react';

export const useClassesSearch = (searchValue: string, classes?: Course[]) => {
	const [filteredClasses, setFilteredClasses] = useState<Course[] | undefined>(
		classes,
	);

	const filterClasses = useCallback(() => {
		if (!!searchValue && classes) {
			const searchValueLower = searchValue.toLowerCase().trim();
			const filtered = classes.filter((course) => {
				return (
					course.name
						.replaceAll(' ', '')
						.toLowerCase()
						.includes(searchValueLower) ||
					course.description
						.replaceAll(' ', '')
						.toLowerCase()
						.includes(searchValueLower)
				);
			});
			setFilteredClasses(filtered);
		} else {
			setFilteredClasses(classes);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, classes]);

	useEffect(() => {
		filterClasses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, classes]);

	return { filteredClasses, filterClasses };
};
