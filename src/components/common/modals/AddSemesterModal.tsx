import { Button, Flex, Select } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import {
	AddSemesterFormSchema,
	type AddSemesterFormType,
} from '@/types/semesters.types';
import { useAddSemester } from '@/mutations/semesters.mutate';
import { DatePickerInput, YearPickerInput } from '@mantine/dates';

export const AddSemesterModal = () => {
	const {
		mutate: addSemester,
		isPending,
		isError,
		isSuccess,
	} = useAddSemester();
	const t = useTranslations('Modals.AddSemesterModal');
	const form = useForm<AddSemesterFormType>({
		validate: zodResolver(AddSemesterFormSchema),
		validateInputOnChange: true,
		validateInputOnBlur: true,
		initialValues: {
			deadline: new Date(),
			semesterType: 'SUMMER',
			year: new Date(),
			reminderBeforeDeadline: new Date(),
		},
	});

	const handleSubmit = () => {
		if (form.isValid() && form.isDirty()) {
			addSemester(form.values);
		}
	};

	useEffect(() => {
		if (isSuccess || isError) {
			modals.closeAll();
		}
	}, [isSuccess, isError]);

	return (
		<Flex gap='md' direction='column'>
			<YearPickerInput
				label={t('yearLabel')}
				withAsterisk
				{...form.getInputProps('year')}
			/>
			<Select
				label={t('semesterTypeLabel')}
				placeholder={t('semesterTypePlaceholder')}
				withAsterisk
				data={[
					{ value: 'SUMMER', label: t('summer') },
					{ value: 'WINTER', label: t('winter') },
				]}
				{...form.getInputProps('semesterType')}
			/>
			<DatePickerInput
				label={t('deadlineLabel')}
				popoverProps={{
					withinPortal: true,
					position: 'bottom',
				}}
				withAsterisk
				{...form.getInputProps('deadline')}
			/>
			<DatePickerInput
				label={t('reminderBeforeDeadlineLabel')}
				popoverProps={{
					withinPortal: true,
					position: 'bottom',
				}}
				withAsterisk
				{...form.getInputProps('reminderBeforeDeadline')}
			/>

			<Button
				disabled={!form.isValid() || !form.isDirty()}
				fullWidth
				loading={isPending}
				onClick={handleSubmit}
				mt='md'
			>
				{t('addBtn')}
			</Button>
		</Flex>
	);
};
