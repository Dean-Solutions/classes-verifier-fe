import { z } from 'zod';
import { aghDomainRegex, indexNumberValidator } from './login.types';

export const AddTagFormSchema = z.object({
	name: z
		.string({
			errorMap: () => ({ message: 'Tag musi być napisem' }),
		})
		.min(3, 'Tag musi mieć przynajmniej 3 znaki')
		.max(64, 'Tag musi mieć mniej niż 64 znaki'),
	description: z.string().optional(),
});

export type AddTagFormType = z.infer<typeof AddTagFormSchema>;

export const AddStudentFormSchema = z.object({
	firstName: z
		.string({
			errorMap: () => ({ message: 'Imię musi być napisem' }),
		})
		.min(3, 'Imię musi mieć przynajmniej 3 znaki')
		.max(64, 'Imię musi mieć mniej niż 64 znaki'),
	lastName: z
		.string({
			errorMap: () => ({ message: 'Nazwisko musi być napisem' }),
		})
		.min(3, 'Nazwisko musi mieć przynajmniej 3 znaki')
		.max(64, 'Nazwisko musi mieć mniej niż 64 znaki'),
	indexNumber: indexNumberValidator,
	email: z
		.string({
			errorMap: () => {
				return { message: 'Niepoprawny adres email' };
			},
		})
		.email({
			message: 'Niepoprawny adres email',
		})
		.regex(aghDomainRegex, {
			message: 'Adres email musi być z domeny AGH',
		}),
	semester: z.string().transform((value) => parseInt(value)),
	status: z
		.enum(['AKTYWNY', 'NIE AKTYWNY'])
		.optional()
		.refine((value) => (value === 'AKTYWNY' ? 'ACTIVE' : 'INACTIVE')),
	role: z.enum(['STUDENT']).optional(),
});

export type AddStudentFormType = z.infer<typeof AddStudentFormSchema>;
