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
import { signIn } from 'next-auth/react';

import { useTranslations } from 'next-intl';
import { Logo } from '@/Icons/Logo';
import Link from 'next/link';
import { Routes } from '@/types/routes';
import { useForm, zodResolver } from '@mantine/form';
import { getServerAuthSession } from '@/server/auth';
import { type GetServerSidePropsContext } from 'next';
import { SignInFormSchema, type SignInFormType } from '@/types/login.types';

export default function SignIn() {
	const form = useForm<SignInFormType>({
		validate: zodResolver(SignInFormSchema),
		initialValues: {
			email: '',
			password: '',
		},
		validateInputOnBlur: true,
	});
	const t = useTranslations('Login');

	return (
		<Center mih='100vh'>
			<Paper w={400} mih={200} p={24} shadow='md'>
				<Flex direction='column' gap='md' h='100%' px={48}>
					<Flex justify='center' align='center' gap='sm'>
						<Logo />
						<Title size={22}>{t('title')}</Title>
					</Flex>
					<TextInput
						placeholder={t('emailPlaceholder')}
						{...form.getInputProps('email')}
					/>
					<TextInput
						type='password'
						placeholder={t('passwordPlaceholder')}
						{...form.getInputProps('password')}
					/>

					<Button
						type='button'
						onClick={() => signIn('credentials', form.values)}
						disabled={!form.isValid() || !form.isDirty()}
					>
						{t('login')}
					</Button>
					<Text display='inline'>
						{t('noAccount')}
						<Text display='inline' ml='sm' color='blue.5'>
							<Link href={Routes.Signup}>{t('register')}</Link>
						</Text>
					</Text>
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
