import { type EnrollStatus } from './enrollments.types';
import { type RequestEnrollment } from './request.types';

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
	enrollStatus: EnrollStatus;
	subject: Course;
	semester: Semester;
	user: Student;
}

export interface Semester {
	deadline: string;
	semesterId: number;
	semesterType: string;
	year: number;
}

export interface Request {
	requestId: number;
	senderId: number;
	description: string;
	submissionDate: string;
	requestType: string;
	requestEnrollments: RequestEnrollment[];
}

export interface RefreshedTokens {
	access_token: string;
	refresh_token: string;
}

export interface Semester {
	semesterType: string;
	year: number;
	deadline: string;
}
