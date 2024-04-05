import { Button, Flex, Textarea, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { AddTagFormSchema, type AddTagFormType } from '@/types/students.types';
import { useAddTags } from '@/mutations/tags.mutate';

export const AddTagModal = () => {
	const { mutate: addTag, isPending, isError, isSuccess } = useAddTags();
	const t = useTranslations('Modals.AddTagModal');
	const form = useForm<AddTagFormType>({
		validate: zodResolver(AddTagFormSchema),
		validateInputOnChange: true,
		validateInputOnBlur: true,
		initialValues: {
			name: '',
			description: '',
		},
	});

	const handleSubmit = () => {
		if (form.isValid() && form.isDirty()) {
			addTag(form.values);
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
				label={t('tagLabel')}
				placeholder={t('tagPlaceholder')}
				withAsterisk
				{...form.getInputProps('name')}
			/>
			<Textarea
				sx={{
					'.mantine-Textarea-input': {
						minHeight: 100,
					},
				}}
				label={t('descriptionLabel')}
				placeholder={t('descriptionPlaceholder')}
				{...form.getInputProps('description')}
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
