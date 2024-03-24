import { type Student } from '@/types/api.types';
import { useEffect, useState } from 'react';

export const useStudentSearch = (students: Student[], searchValue: string) => {
	const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

	useEffect(() => {
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
	}, [searchValue, students]);

	return { filteredStudents };
};
