// TODO This will change to the actual API response
export interface Student {
	id: number;
	firstName: string;
	lastName: string;
	indexNumber: number;
	academicYear: number;
}

export interface Course {
	id: number;
	name: string;
	description: string;
}

export interface Tag {
	subjectTagId: number;
	name: string;
	description: string;
}
