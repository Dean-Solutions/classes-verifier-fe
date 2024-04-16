import { EnrollStatus } from '@/types/enrollments.types';

export const statusesToShow: EnrollStatus[] = [
	EnrollStatus.ACCEPTED,
	EnrollStatus.PENDING,
	EnrollStatus.PROPOSED,
];
