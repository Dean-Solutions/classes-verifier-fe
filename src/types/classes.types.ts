import { z } from 'zod';

export const AddClassFormSchema = z.object({
	subjectName: z
		.string()
		.min(1, 'Nazwa przedmiotu nie może być pusta!')
		.max(64, 'Zbyt długa nazwa przedmiotu'), //TODO: Check max subject name length

	subjectSemester: z.string(),
	subjectTags: z
		.array(z.string())
		.min(1, 'Przedmiot musi mieć przynajmniej jeden tag!'),
	subjectDescription: z.string().optional(), //TODO: Check max description name length
});

export type AddClassFormType = z.infer<typeof AddClassFormSchema>;
