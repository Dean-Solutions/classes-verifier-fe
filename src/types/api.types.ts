export interface PagableWrapper<T> {
	content: T;
	pagable: any;
}
export interface Student {
	id: number;
	firstName: string;
	lastName: string;
	indexNumber: number;
	semester: number;
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
