export type PostEnroll = {
	userId: number;
	subjectId: number;
	semesterId?: number;
	enrollStatus: EnrollStatus;
};

export type GetEnroll = {
	userId?: number;
	index?: string;
	semesterId?: number;
	enrollStatus: EnrollStatus;
};

export enum EnrollStatus {
	PENDING = 'PENDING',
	PROPOSED = 'PROPOSED',
	REJECTED = 'REJECTED',
	EXPIRED = 'EXPIRED',
	ACCEPTED = 'ACCEPTED',
}
