import { z } from 'zod';

export const AddTagFormSchema = z.object({
	name: z
		.string({
			errorMap: (error) => {
				if (error.code === 'too_small') {
					return { message: 'Tag musi mieć przynajmniej 3 znaki' };
				} else if (error.code === 'too_big') {
					return { message: 'Tag musi mieć mniej niż 64 znaki' };
				}
				return { message: 'Tag musi być napisem' };
			},
		})
		.min(3)
		.max(64),
	description: z.string().optional(),
});

export type AddTagFormType = z.infer<typeof AddTagFormSchema>;

export const AddStudentFormSchema = z.object({
	firstName: z
		.string({
			errorMap: (error) => {
				if (error.code === 'too_small') {
					return { message: 'Imię musi mieć przynajmniej 3 znaki' };
				} else if (error.code === 'too_big') {
					return { message: 'Imię musi mieć mniej niż 64 znaki' };
				}
				return { message: 'Imię musi być napisem' };
			},
		})
		.min(3)
		.max(64),
	lastName: z
		.string({
			errorMap: (error) => {
				if (error.code === 'too_small') {
					return { message: 'Nazwisko musi mieć przynajmniej 3 znaki' };
				} else if (error.code === 'too_big') {
					return { message: 'Nazwisko musi mieć mniej niż 64 znaki' };
				}
				return { message: 'Nazwisko musi być napisem' };
			},
		})
		.min(3)
		.max(64),
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
	semester: z
		.number({
			errorMap: (error) => {
				if (error.code === 'too_small') {
					return { message: 'Semestr musi być większy niż 0' };
				} else if (error.code === 'too_big') {
					return { message: 'Semestr musi być mniejszy niż 8' };
				}
				return { message: 'Semestr musi być liczbą' };
			},
		})
		.min(1)
		.max(8)
		.optional(),
	status: z
		.enum(['AKTYWNY', 'NIE AKTYWNY'])
		.optional()
		.refine((value) => (value === 'AKTYWNY' ? 'ACTIVE' : 'INACTIVE')),
	role: z.enum(['STUDENT']).optional(),
});

export type AddStudentFormType = z.infer<typeof AddStudentFormSchema>;
