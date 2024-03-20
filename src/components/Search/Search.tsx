import { SearchIcon } from '@/Icons/SearchIcon';
import { useStudentsStore } from '@/store/students.store';
import { ActionIcon, CloseButton, Input } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React from 'react';

const Search = () => {
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
	const t = useTranslations('Students');

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
				placeholder={t('searchPlaceholder')}
				rightSection={
					searchValue && (
						<ActionIcon
							size='xs'
							variant='subtle'
							color='dark.1'
							onClick={clearSearchValue}
						>
							<CloseButton
								sx={(theme) => ({
									':hover': {
										backgroundColor: theme.colors.neutral[4],
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
