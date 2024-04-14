import { type Course, type Student } from './api.types';

export type UserRequest = {
	requestId?: number;
	description: string;
	submissionDate: string;
	requestType: string;
	senderId: number;
	requestEnrolls: RequestEnroll[];
};

export enum RequestType {
	ADD = 'ADD',
	DELETE = 'DELETE',
	ACCEPT = 'ACCEPT',
	CHANGE_SUBJECT = 'CHANGE_SUBJECT',
}

export enum RequestStatus {
	REJECTED = 'REJECTED',
	ACCEPTED = 'ACCEPTED',
	PENDING = 'PENDING',
}

export interface RequestEnroll {
	requestEnrollId?: number;
	semesterId: number;
	userId: number;
	subjectId: number;
	requestStatus: RequestStatus;
}

export interface RequestEnrollment {
	requestEnrollId: number;
	requestStatus?: string;
	user: Student;
	subject: Course;
}
