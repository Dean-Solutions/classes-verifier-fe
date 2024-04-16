import { z } from 'zod';

export const AddSemesterFormSchema = z.object({
	semesterType: z.enum(['SUMMER', 'WINTER']),
	year: z.date(),
	deadline: z.date(),
	reminderBeforeDeadline: z.date(),
});

export type AddSemesterFormType = z.infer<typeof AddSemesterFormSchema>;
