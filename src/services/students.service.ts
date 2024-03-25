export const getStudents = (semesterTag: string) => {
	// TODO Fetch from backend
	const data_inf_23_24 = Array.from({ length: 40 }, (_, index) => ({
		id: index,
		firstName: 'Paweł',
		lastName: 'Motyka',
		indexNumber: 123456,
		academicYear: index,
	}));

	const data_inf_22_23 = Array.from({ length: 40 }, (_, index) => ({
		id: index,
		firstName: 'Paweł_22_23',
		lastName: 'Motyka_22_23',
		indexNumber: 123456,
		academicYear: index,
	}));

	if (semesterTag === '1') {
		return Promise.resolve(data_inf_23_24);
	}

	if (semesterTag === '2') {
		return Promise.resolve(data_inf_22_23);
	}

	return Promise.resolve([]);
};

export const deleteStudent = (id: number) => {
	console.log('deleteStudent: ', id);
	return Promise.resolve(true);
};
