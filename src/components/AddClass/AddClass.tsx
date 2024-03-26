import {Flex, Overlay, TextInput, Group, Button, Box, Textarea} from "@mantine/core";
import {useForm} from "@mantine/form";
import {Dispatch, SetStateAction, useState} from "react";


const AddClass = ({windowVisible}: {windowVisible:Dispatch<SetStateAction<boolean>>}) => {
    const addSubjectForm = useForm({
        initialValues: {
            subjectName: "",
            subjectSemester: "",
            subjectDescription: "",
        },

        validate: {
            subjectSemester: (value) => {
                if (value == null){
                    return "Podaj numer semestru!";
                }
                const parsedValue = parseInt(value);
                if (!parsedValue){
                    return "Numer semestru musi być liczbą!"
                }
                return parsedValue >= 1 && parsedValue <= 7 ? null : "Zły numer semsetru"
            }
        }
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
                            submitAddNewClass(values);
                            windowVisible(false);
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

                        <TextInput
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

function submitAddNewClass(values:{
    subjectName: string,
    subjectSemester: string | number,
    subjectDescription: string,
}) {
    console.log(values.subjectName)
    console.log(values.subjectSemester)
    console.log(values.subjectDescription)
}

export default AddClass;
