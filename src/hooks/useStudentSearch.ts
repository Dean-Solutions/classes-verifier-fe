import { type Student } from '@/types/api.types';
import { useCallback, useEffect, useState } from 'react';

export const useStudentSearch = (searchValue: string, students?: Student[]) => {
	const [filteredStudents, setFilteredStudents] = useState<
		Student[] | undefined
	>(students);

	const filterStudents = useCallback(() => {
		if (!!searchValue && students) {
			const searchValueLower = searchValue.toLowerCase().trim();
			const filtered = students.filter((student) => {
				return (
					student.firstName.toLowerCase().includes(searchValueLower) ||
					student.lastName.toLowerCase().includes(searchValueLower) ||
					student.indexNumber.toString().includes(searchValueLower) ||
					student.firstName
						.concat(' ', student.lastName)
						.toLowerCase()
						.includes(searchValueLower) ||
					student.firstName
						.concat(' ', student.lastName)
						.toLowerCase()
						.concat(' ', student.indexNumber.toString())
						.includes(searchValueLower)
				);
			});
			setFilteredStudents(filtered);
		} else {
			setFilteredStudents(students);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, students]);

	useEffect(() => {
		filterStudents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, students]);

	return { filteredStudents, filterStudents };
};
