import { Button, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import React from 'react';

export const AddStudentModal = () => {
	return (
		<>
			<TextInput label='Your email' placeholder='Your email' data-autofocus />
			<Button fullWidth onClick={() => modals.closeAll()} mt='md'>
				Dodaj
			</Button>
		</>
	);
};
