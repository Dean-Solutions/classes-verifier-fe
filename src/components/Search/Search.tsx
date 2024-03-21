import { SearchIcon } from '@/Icons/SearchIcon';
import { useStudentsStore } from '@/store/students.store';
import { ActionIcon, CloseButton, Input } from '@mantine/core';
import React from 'react';

type SearchProps = {
	placeholder: string;
};

const Search = ({ placeholder }: SearchProps) => {
	const { searchValue, clearSearchValue, setSearchValue } = useStudentsStore(
		(state) => ({
			isSearchEnabled: state.isSearchEnabled,
			searchValue: state.searchValue,
			clearSearchValue: state.clearSearchValue,
			setSearchValue: state.setSearchValue,
		}),
	);
	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
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
						<ActionIcon
							size='xs'
							variant='subtle'
							color='dark.1'
							onClick={clearSearchValue}
						>
							<CloseButton
								color='dark.1'
								sx={(theme) => ({
									':hover': {
										backgroundColor: theme.colors.neutral[5],
									},
								})}
							/>
						</ActionIcon>
					)
				}
			/>
		</>
	);
};

export default Search;
