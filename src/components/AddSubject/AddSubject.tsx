import {Flex, Overlay, TextInput, Group, Button, Box, Textarea, NumberInput} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {Dispatch, SetStateAction} from "react";
import {addSubject} from "@/services/subjects.service";
import {AddSubjectFormSchema, AddSubjectFormType} from "@/types/subject.types";


const AddSubject = ({windowVisible}: {windowVisible:Dispatch<SetStateAction<boolean>>}) => {
    const addSubjectForm = useForm<AddSubjectFormType>({
        initialValues: {
            subjectName: "",
            subjectSemester: 1,
            subjectDescription: "",
        },

        validate: zodResolver(AddSubjectFormSchema),
        validateInputOnChange: true,
        validateInputOnBlur: true,
    });

    return (
        <Overlay onClick={() => windowVisible(false)} h="100%" color="#000" opacity={0.3}>
            <Flex w="100%" h="100%" justify="center" align="center" >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    p="16px"
                    w="372px"
                    h="500px"
                    bg="rgba(255,255,255,1)"
                    mx="auto"
                    sx={(theme) => ({
                        borderRadius: "18px"
                    })}
                >
                    <form  onSubmit={
                        addSubjectForm.onSubmit((values) => {
                            if (addSubjectForm.validate().hasErrors) return;
                            submitAddNewSubject(values)
                                .catch((e) => console.error(e))
                                .finally(() => windowVisible(false));
                        })
                    }>

                        <TextInput
                            withAsterisk
                            label="Nazwa przedmiotu"
                            labelProps={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
                            placeholder="Przykładowa nazwa przedmiotu"
                            {...addSubjectForm.getInputProps('subjectName')}
                            pb="16px"
                        />

                        <NumberInput
                            withAsterisk
                            label="Semestr"
                            labelProps={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
                            placeholder="Numer semestru"
                            {...addSubjectForm.getInputProps('subjectSemester')}
                            pb="16px"
                        />

                        <Textarea
                            placeholder="Podaj opis"
                            labelProps={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
                            label="Opis"
                            h="100%"
                            pb="16px"
                            autosize
                            {...addSubjectForm.getInputProps('subjectDescription')}
                            minRows={10}
                        />

                        <Group position="center" mt="md">
                            <Button  w="100%" type="submit">Submit</Button>
                        </Group>
                    </form>

                </Box>
            </Flex>

        </Overlay>

    )
}

async function submitAddNewSubject(values:{
    subjectName: string,
    subjectSemester: number,
    subjectDescription: string,
}) {
    console.log(values.subjectName)
    console.log(values.subjectSemester)
    console.log(values.subjectDescription)

    const response = await addSubject(values);

    console.log(response)
}

export default AddSubject;
