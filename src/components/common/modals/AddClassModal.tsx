import {
	Flex,
	TextInput,
	Group,
	Button,
	Textarea,
	Select,
	MultiSelect,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import {
	AddClassFormSchema,
	type AddClassFormType,
} from '@/types/classes.types';
import { useAddClass, useEditClass } from '@/mutations/classes.mutate';
import { useEffect, useMemo } from 'react';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import { semesters } from '@/data/common.data';
import { useGetTags } from '@/query/tags.query';
import CenteredLoader from '../molecules/Loader/CenteredLoader';
import { DataFetchErrorReload } from '../molecules/DataFetchError/DataFetchError';
import { type SelectDataWithFooter } from '@/types/common.types';
import { type Course, type Tag } from '@/types/api.types';

const AddClassModal = (currentClass?: Course) => {
	const preferedMutation = currentClass ? useEditClass : useAddClass;

	const {
		mutate: classModifierFunc,
		isPending: isAddClassPending,
		isError: isAddClassError,
		isSuccess: isAddClassSuccess,
	} = preferedMutation();

	const {
		data: tags,
		isLoading: isTagsLoading,
		isError: isTagsError,
	} = useGetTags();
	const t = useTranslations('Classes.addClassModal');

	const addClassForm = useForm<AddClassFormType>({
		initialValues: {
			subjectName: currentClass?.name ?? '',
			subjectSemester: '1',
			subjectDescription: currentClass?.description ?? '',
			subjectTags: currentClass?.subjectTags?.map((v: Tag) => v.name) ?? [],
		},
		validate: zodResolver(AddClassFormSchema),
		validateInputOnChange: true,
		validateInputOnBlur: true,
		initialTouched: {
			subjectSemester: true,
		},
	});

	const mappedTags: SelectDataWithFooter[] = useMemo(
		() =>
			tags?.map((tag) => ({
				label: tag.name,
				value: tag.name,
			})) || [],
		[tags],
	);

	useEffect(() => {
		if (isAddClassSuccess || isAddClassError) {
			modals.closeAll();
		}
	}, [isAddClassSuccess, isAddClassError]);

	const submitAddNewSubject = () => {
		if (addClassForm.isValid() && addClassForm.isDirty()) {
			if (!currentClass) {
				// @ts-expect-error if currentClass is null then classModifierFunc gets those arguments
				classModifierFunc({ value: addClassForm.values });
			} else {
				// @ts-expect-error if currentClass is not null then classModifierFunc gets those arguments
				classModifierFunc({
					value: addClassForm.values,
					subjectId: currentClass?.subjectId,
				});
			}
		}
	};

	const isLoading = isTagsLoading;
	const isError = isTagsError;

	if (isLoading) {
		return <CenteredLoader />;
	}

	if (isError) {
		return <DataFetchErrorReload />;
	}

	return (
		<Flex gap='md' direction='column'>
			<TextInput
				withAsterisk
				label={t('classNameLabel')}
				placeholder={t('classNamePlaceholder')}
				{...addClassForm.getInputProps('subjectName')}
			/>
			<Select
				label={t('semesterNumberLabel')}
				placeholder={t('semesterNumberPlaceholder')}
				withAsterisk
				data={semesters}
				variant='default'
				{...addClassForm.getInputProps('subjectSemester')}
				value={addClassForm.values.subjectSemester.toString()}
			/>
			<MultiSelect
				label={t('tagsLabel')}
				placeholder={t('tagsPlaceholder')}
				withAsterisk
				data={mappedTags}
				variant='default'
				{...addClassForm.getInputProps('subjectTags')}
			/>
			<Textarea
				placeholder={t('classDescriptionPlaceholder')}
				label={t('classDescriptionLabel')}
				autosize
				{...addClassForm.getInputProps('subjectDescription')}
				minRows={10}
			/>

			<Group position='center' mt='md'>
				<Button
					disabled={!addClassForm.isValid()}
					loading={isAddClassPending}
					fullWidth
					onClick={() => submitAddNewSubject()}
				>
					{currentClass ? t('editBtn') : t('addBtn')}
				</Button>
			</Group>
		</Flex>
	);
};

export default AddClassModal;
