import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type StudentsStoreTypes = {
	isSearchEnabled: boolean;
	searchValue: string;
	clearSearchValue: () => void;
	setSearchValue: (value: string) => void;
	setSearchEnabled: () => void;
};

const initialData = {
	isSearchEnabled: true,
	searchValue: '',
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
	}),
	shallow,
);
