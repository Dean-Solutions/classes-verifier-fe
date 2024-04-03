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
	subjectId: number;
	name: string;
	description: string;
	subjectTags: [];
}

export interface Tag {
	subjectTagId: number;
	name: string;
	description: string;
}
