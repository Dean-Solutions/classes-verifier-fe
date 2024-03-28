import { z } from 'zod';

export const AddClassFormSchema = z.object({
    subjectName: z.string()
        .min(1, 'Nazwa przedmiotu nie może być pusta!')
        .max(64, 'Zbyt długa nazwa przedmiotu'), //TODO: Check max subject name length

    subjectSemester: z.number({
            errorMap: (error) => {
                console.log(error);
                return {message: "Numer semestru musi być liczbą całkowitą od 1 do 7"}
            }
    }).int().min(1).max(7),

    subjectDescription: z.string().optional(), //TODO: Check max description name length

});

export type AddClassFormType = z.infer<typeof AddClassFormSchema>;