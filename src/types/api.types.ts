// TODO This will change to the actual API response
export interface Student {
	id: number;
	firstName: string;
	lastName: string;
	indexNumber: number;
	academicYear: number;
}

export interface Enrollment{
	id: number;
	student: string;
	subject: string;
	status: EnrollmentStatus;
}

export enum EnrollmentStatus {
	TO_CHECK,
	ERROR_REQUEST_PENDING,
	ACCEPTED
}
