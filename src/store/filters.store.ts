import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type FilterStoreTypes = {
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

export const useFiltersStore = createWithEqualityFn<FilterStoreTypes>(
	(set) => ({
		...initialData,
		clearSearchValue: () => set({ searchValue: '' }),
		setSearchValue: (value) => set({ searchValue: value }),
		setSearchEnabled: () =>
			set((state: FilterStoreTypes) => ({
				isSearchEnabled: !state.isSearchEnabled,
			})),
	}),
	shallow,
);
