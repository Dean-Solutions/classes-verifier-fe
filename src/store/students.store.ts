import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type StudentsStoreTypes = {
	role: string;
	toggleRole: () => void;
};

const initialData = {
	role: '',
};

export const useStudentsStore = createWithEqualityFn<StudentsStoreTypes>(
	(set) => ({
		...initialData,
		toggleRole: () =>
			set((state) => ({
				role: state.role === 'dean' ? 'student' : 'dean',
			})),
	}),
	shallow,
);
