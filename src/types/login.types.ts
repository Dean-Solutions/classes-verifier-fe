import { z } from 'zod';

export const indexNumberValidator = z
	.string()
	.min(6)
	.superRefine((data, ctx) => {
		if (isNaN(Number(data))) {
			ctx.addIssue({
				code: 'custom',
				message: 'Numer indeksu musi być liczbą',
			});
		}
		if (data.length !== 6) {
			ctx.addIssue({
				code: 'custom',
				message: 'Numer indeksu musi mieć 6 cyfr',
			});
		}
		if (Number(data) < 0) {
			ctx.addIssue({
				code: 'custom',
				message: 'Numer indeksu nie może być ujemny',
			});
		}
	});

export const aghDomainRegex = /@(agh\.edu\.pl|student\.agh\.edu\.pl)$/;

export const SignInFormSchema = z.object({
	email: z
		.string()
		.min(1, 'Email jest wymagany')
		.email({
			message: 'Niepoprawny adres email',
		})
		.regex(aghDomainRegex, {
			message: 'Adres email musi być z domeny AGH',
		}),
	password: z.string().min(6, 'Hasło musi mieć przynajmniej 6 znaków'),
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;

export const SignUpFormSchema = z
	.object({
		email: z
			.string()
			.min(1, 'Email jest wymagany')
			.email({
				message: 'Niepoprawny adres email',
			})
			.regex(aghDomainRegex, {
				message: 'Adres email musi być z domeny AGH',
			}),
		password: z.string().min(6, 'Hasło musi mieć przynajmniej 6 znaków'),
		rePassword: z.string().min(6, 'Hasło musi mieć przynajmniej 6 znaków'),
		firstName: z.string().min(3, 'Imię musi mieć przynajmniej 3 znaki'),
		lastName: z.string().min(3, 'Nazwisko musi mieć przynajmniej 3 znaki'),
		indexNumber: indexNumberValidator,
	})
	.refine((data) => data.password === data.rePassword, {
		message: 'Hasła muszą być takie same',
		path: ['rePassword'],
	});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
