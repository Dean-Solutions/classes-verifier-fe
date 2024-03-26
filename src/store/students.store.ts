import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type StudentsStoreTypes = {
	isSearchEnabled: boolean;
	searchValue: string;
	role: string,
	clearSearchValue: () => void;
	setSearchValue: (value: string) => void;
	setSearchEnabled: () => void;
	toggleRole: () => void;
};

const initialData = {
	isSearchEnabled: true,
	searchValue: '',
	role: ''
};

export const useStudentsStore = createWithEqualityFn<StudentsStoreTypes>(
	(set) => ({
		...initialData,
		clearSearchValue: () => set({ searchValue: '' }),
		setSearchValue: (value) => set({ searchValue: value }),
		setSearchEnabled: () =>
			set((state: StudentsStoreTypes) => ({
				isSearchEnabled: !state.isSearchEnabled,
			})),
		toggleRole: () => set((state) => ({
			role: state.role === "dean" ? "student" : "dean"
		})) 
	}),
	shallow,
);
