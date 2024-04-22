import { z } from 'zod';

export const ChangePasswordSchema = z
	.object({
		currentPassword: z
			.string()
			.min(6, 'Hasło musi mieć przynajmniej 6 znaków!'),
		newPassword: z.string().min(6, 'Hasło musi mieć przynajmniej 6 znaków!'),
		confirmationPassword: z
			.string()
			.min(6, 'Hasło musi mieć przynajmniej 6 znaków!'),
	})
	.refine((data) => data.newPassword === data.confirmationPassword, {
		message: 'Hasła muszą być takie same',
		path: ['confirmationPassword'],
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: 'Nowe hasło nie może być takie samo jak stare',
		path: ['newPassword'],
	});
export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
