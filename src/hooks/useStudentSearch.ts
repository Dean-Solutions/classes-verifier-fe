import { type Student } from '@/types/api.types';
import { useCallback, useEffect, useState } from 'react';

export const useStudentSearch = (students: Student[], searchValue: string) => {
	const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

	const filterStudents = useCallback(() => {
		if (searchValue) {
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
	}, [searchValue]);

	useEffect(() => {
		filterStudents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return { filteredStudents, filterStudents };
};
