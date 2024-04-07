export interface PagableWrapper<T> {
	content: T;
	pagable: any;
	totalElements: number;
	totalPages: number;
}

export interface Student {
	userId: number;
	firstName: string;
	lastName: string;
	indexNumber: string;
	email: string;
	semester: number;
	eduPath?: string;
	status: string;
	role: string;
	enrollments: any[];
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

export interface Enrollment {
	enrollmentId: number;
	enrollStatus: string;
	enrollSubject: Course;
	semester: any;
	requestEnrollment: any[];
}
