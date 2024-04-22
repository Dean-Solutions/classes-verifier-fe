import { AppLayout } from '@/components/common/Layout/AppLayout';
import { Button, Flex, Paper } from '@mantine/core';
import { type NextPage } from 'next';
import React from 'react';
import Header from '@/components/Header/Header';
import { useTranslations } from 'next-intl';
import { getServerSideProps } from '@/server/utils/protectedServerSide.util';
import { useForm, zodResolver } from '@mantine/form';
import {
	ChangePasswordSchema,
	type ChangePasswordType,
} from '@/types/settings.types';
import { Text } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { useChangePassword } from '@/mutations/settings.mutate';

const Settings: NextPage = () => {
	const t = useTranslations('Settings');
	const { mutate: changePassword, isPending } = useChangePassword();
	const form = useForm<ChangePasswordType>({
		validate: zodResolver(ChangePasswordSchema),
		validateInputOnChange: true,
		validateInputOnBlur: true,
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmationPassword: '',
		},
	});

	return (
		<AppLayout>
			<Flex direction='column' gap='lg'>
				<Header title={t('headerTitle')} />
				<Flex direction='column' gap='lg' maw={400}>
					<Paper p='lg' shadow='sm'>
						<Text fw='bold' fz='lg'>
							{t('changePassword')}
						</Text>
						<Flex direction='column' gap='md'>
							<TextInput
								label={t('oldPasswordLabel')}
								placeholder={t('oldPasswordPlaceholder')}
								type='password'
								withAsterisk
								{...form.getInputProps('currentPassword')}
							/>
							<TextInput
								label={t('newPasswordLabel')}
								placeholder={t('newPasswordPlaceholder')}
								type='password'
								withAsterisk
								{...form.getInputProps('newPassword')}
							/>
							<TextInput
								label={t('newPasswordConf')}
								placeholder={t('newPasswordPlaceholder')}
								type='password'
								withAsterisk
								{...form.getInputProps('confirmationPassword')}
							/>
							<Button
								type='submit'
								disabled={!form.isValid() || !form.isDirty()}
								loading={isPending}
								onClick={() => {
									changePassword(form.values);
								}}
							>
								{t('changePasswordButton')}
							</Button>
						</Flex>
					</Paper>
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export { getServerSideProps };

export default Settings;
