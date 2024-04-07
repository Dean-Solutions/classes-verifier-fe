import { z } from 'zod';

export const AddTagFormSchema = z.object({
	name: z
		.string({
			errorMap: () => ({ message: 'Tag musi być napisem' }),
		})
		.min(2, 'Tag musi mieć przynajmniej 2 znaki')
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
	indexNumber: z
		.number({
			errorMap: (error) => {
				if (error.code === 'too_small') {
					return { message: 'Numer indeksu musi mieć przynajmniej 6 znaków' };
				} else if (error.code === 'too_big') {
					return { message: 'Numer indeksu musi mieć mniej niż 6 znaków' };
				}
				return { message: 'Numer indeksu musi być liczbą' };
			},
		})
		.refine((value) => value.toString().length === 6, {
			message: 'Numer indeksu musi mieć 6 cyfr',
		}),
	email: z
		.string({
			errorMap: () => {
				return { message: 'Niepoprawny adres email' };
			},
		})
		.email(),
	semester: z.string().transform((value) => parseInt(value)),
	status: z
		.enum(['AKTYWNY', 'NIE AKTYWNY'])
		.optional()
		.refine((value) => (value === 'AKTYWNY' ? 'ACTIVE' : 'INACTIVE')),
	role: z.enum(['STUDENT']).optional(),
});

export type AddStudentFormType = z.infer<typeof AddStudentFormSchema>;
