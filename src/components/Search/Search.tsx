import { SearchIcon } from '@/Icons/SearchIcon';
import { CloseButton, Input } from '@mantine/core';
import React from 'react';
import { useFiltersStore } from '@/store/filters.store';
import { useStudentsStore } from '@/store/students.store';

type SearchProps = {
	placeholder: string;
};

const Search = ({ placeholder }: SearchProps) => {
	// Keeping it for now so components that use this still work
	const { searchValue, clearSearchValue, setSearchValue } = useStudentsStore(
		(state) => ({
			isSearchEnabled: state.isSearchEnabled,
			searchValue: state.searchValue,
			clearSearchValue: state.clearSearchValue,
			setSearchValue: state.setSearchValue,
		}),
	);

	const filterStore = useFiltersStore((state) => ({
		isSearchEnabled: state.isSearchEnabled,
		searchValue: state.searchValue,
		clearSearchValue: state.clearSearchValue,
		setSearchValue: state.setSearchValue,
	}));

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		filterStore.setSearchValue(e.target.value);
	};
	return (
		<>
			<Input
				autoFocus
				size='md'
				w={280}
				value={searchValue}
				onChange={onSearchChange}
				styles={{
					input: {
						backgroundColor: 'var(--mantine-color-neutral-2)',
						borderRadius: 40,
						borderColor: 'var(--mantine-color-neutral-5)',
						':focus': {
							borderColor: 'var(--mantine-color-dark-1)',
						},
					},
					icon: {
						padding: 0,
						top: -3,
					},
				}}
				icon={<SearchIcon />}
				placeholder={placeholder}
				rightSection={
					searchValue && (
						<CloseButton
							variant='subtle'
							onClick={() => {
								clearSearchValue();
								filterStore.clearSearchValue();
							}}
							size='xs'
							color='dark.1'
							sx={(theme) => ({
								':hover': {
									backgroundColor: theme.colors.neutral[5],
								},
							})}
						/>
					)
				}
			/>
		</>
	);
};

export default Search;
