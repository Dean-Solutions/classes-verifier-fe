import { type Course, type Enrollment } from '@/types/api.types';
import { useCallback, useEffect, useState } from 'react';

type DeanClass = { class: Course; enrollments: Enrollment[] };

export const useDeanClassesSearch = (
	searchValue: string,
	classes?: DeanClass[],
) => {
	const [filteredClasses, setFilteredClasses] = useState<
		DeanClass[] | undefined
	>(classes);

	const filterClasses = useCallback(() => {
		if (!!searchValue && classes) {
			const searchValueLower = searchValue.toLowerCase().trim();
			const filtered = classes.filter((deanClass) => {
				return (
					deanClass.class.name
						.replaceAll(' ', '')
						.toLowerCase()
						.includes(searchValueLower) ||
					deanClass.class.description
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
