export type SelectDataWithFooter = {
	label: string;
	value: string;
	footer?: {
		isFirst?: boolean;
		color?: string;
		isLoading?: boolean;
		IconComp?: React.ReactNode;
		disabled?: boolean;
		onClick: () => void;
	};
};
