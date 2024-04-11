type Map = Record<string, string | undefined>;

const colorMap: Map = {
	ACCEPTED: 'green.0',
	PENDING: 'yellow.0',
	REJECTED: 'red.0',
};

export const getColor = (status: string | undefined) => {
	if (status === 'ACCEPTED') {
		return colorMap.ACCEPTED;
	} else if (status === 'PENDING') {
		return colorMap.PENDING;
	} else return colorMap.REJECTED;
};
