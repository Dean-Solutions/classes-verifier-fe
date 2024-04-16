import { RequestStatus } from '@/types/request.types';

type Map = Record<string, string | undefined>;

const colorMap: Map = {
	ACCEPTED: 'green.0',
	PENDING: 'yellow.0',
	REJECTED: 'red.0',
	NONE: 'neutral.1',
};

export const getColor = (status?: RequestStatus) => {
	if (status === RequestStatus.ACCEPTED) {
		return colorMap.ACCEPTED;
	} else if (status === RequestStatus.PENDING) {
		return colorMap.PENDING;
	} else if (status === RequestStatus.REJECTED) {
		return colorMap.REJECTED;
	} else {
		return colorMap.NONE;
	}
};
