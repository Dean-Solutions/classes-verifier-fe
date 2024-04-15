import { Button, Flex, Select, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import {
	AddStudentFormSchema,
	type AddStudentFormType,
} from '@/types/students.types';
import { useAddStudent } from '@/mutations/students.mutate';
import { semesters } from '@/data/common.data';

export const AddStudentModal = () => {
	const { mutate: addStudent, isPending, isSuccess, isError } = useAddStudent();
	const t = useTranslations('Modals.AddStudentModal');
	const form = useForm<AddStudentFormType>({
		validate: zodResolver(AddStudentFormSchema),
		validateInputOnChange: true,
		validateInputOnBlur: true,
		initialValues: {
			firstName: '',
			lastName: '',
			indexNumber: '',
			semester: 1,
			email: '',
		},
	});

	const handleSubmit = () => {
		if (form.isValid() && form.isDirty()) {
			addStudent(form.values);
		}
	};

	useEffect(() => {
		if (isSuccess || isError) {
			modals.closeAll();
		}
	}, [isSuccess, isError]);

	return (
		<Flex gap='md' direction='column'>
			<TextInput
				label={t('firstNameLabel')}
				placeholder={t('firstNamePlaceholder')}
				withAsterisk
				{...form.getInputProps('firstName')}
			/>
			<TextInput
				label={t('lastNameLabel')}
				placeholder={t('lastNamePlaceholder')}
				withAsterisk
				{...form.getInputProps('lastName')}
			/>
			<TextInput
				label={t('indexNumberLabel')}
				placeholder={t('indexNumberPlaceholder')}
				maxLength={6}
				withAsterisk
				{...form.getInputProps('indexNumber')}
			/>
			<TextInput
				label={t('emailLabel')}
				placeholder={t('emailPlaceholder')}
				withAsterisk
				{...form.getInputProps('email')}
			/>
			<Select
				label={t('semesterLabel')}
				placeholder={t('semesterPlaceholder')}
				withAsterisk
				data={semesters}
				variant='default'
				{...form.getInputProps('semester')}
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
