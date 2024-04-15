/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
	Button,
	Center,
	Flex,
	Paper,
	Text,
	TextInput,
	Title,
} from '@mantine/core';

import { useTranslations } from 'next-intl';
import { Logo } from '@/Icons/Logo';
import Link from 'next/link';
import { Routes } from '@/types/routes';
import { useForm, zodResolver } from '@mantine/form';
import { getServerAuthSession } from '@/server/auth';
import { type GetServerSidePropsContext } from 'next';
import { SignUpFormSchema, type SignUpFormType } from '@/types/login.types';

export default function SignUp() {
	const form = useForm<SignUpFormType>({
		validate: zodResolver(SignUpFormSchema),
		initialValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			indexNumber: '',
			rePassword: '',
		},
		validateInputOnBlur: true,
	});
	const t = useTranslations('Login');

	return (
		<Center mih='100vh'>
			<Paper w={400} mih={200} p={24} shadow='md'>
				<Flex direction='column' gap='md' h='100%'>
					<Flex justify='center' align='center' gap='sm'>
						<Logo />
						<Title size={22}>{t('title')}</Title>
					</Flex>
					<Flex direction='column' gap='xs' px='md'>
						<TextInput
							label={t('emailLabel')}
							placeholder={t('emailPlaceholder')}
							withAsterisk
							{...form.getInputProps('email')}
						/>
						<TextInput
							label={t('passwordLabel')}
							type='password'
							placeholder={t('passwordPlaceholder')}
							withAsterisk
							{...form.getInputProps('password')}
						/>
						<TextInput
							label={t('rePasswordLabel')}
							type='password'
							placeholder={t('passwordPlaceholder')}
							withAsterisk
							{...form.getInputProps('rePassword')}
						/>
						<Flex justify='space-between' gap='md'>
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
						</Flex>
						<TextInput
							label={t('indexNumberLabel')}
							placeholder={t('indexNumberPlaceholder')}
							withAsterisk
							maxLength={6}
							{...form.getInputProps('indexNumber')}
						/>
						<Button
							type='button'
							onClick={() => {
								console.log('register');
							}}
							disabled={!form.isValid() || !form.isDirty()}
						>
							{t('register')}
						</Button>
						<Text display='inline'>
							{t('haveAccount')}
							<Text display='inline' ml='sm' color='blue.5'>
								<Link href={Routes.SignIn}>{t('login')}</Link>
							</Text>
						</Text>
					</Flex>
				</Flex>
			</Paper>
		</Center>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerAuthSession({
		req: context.req,
		res: context.res,
	});

	if (session && session.expires_at > Date.now()) {
		return {
			redirect: {
				destination: Routes.Home,
				permanent: false,
			},
		};
	}

	return {
		props: {
			messages: (await import(`/src/messages/${context.locale}.json`)).default,
		},
	};
}
