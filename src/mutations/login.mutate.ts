import { login, signUp } from '@/services/login.service';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
	return useMutation({
		mutationFn: login,
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};

export const useSignUp = () => {
	return useMutation({
		mutationFn: signUp,
		onError: (error: unknown) => {
			console.log(error);
		},
	});
};
