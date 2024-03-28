import {Flex, TextInput, Group, Button, Textarea, NumberInput} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {AddClassFormSchema, AddClassFormType} from "@/types/classes.types";
import {useAddClass} from "@/mutations/classes.mutate";
import {useEffect} from "react";
import {modals} from "@mantine/modals";
import {useTranslations} from "next-intl";


const AddClassModal = () => {
    const { mutate: addClass, isPending, isError, isSuccess } = useAddClass();
    const t = useTranslations('Classes.addClassModal');

    const addClassForm = useForm<AddClassFormType>({
        initialValues: {
            subjectName: "",
            subjectSemester: 1,
            subjectDescription: "",
        },

        validate: zodResolver(AddClassFormSchema),
        validateInputOnChange: true,
        validateInputOnBlur: true,
    });

    useEffect(() => {
        if (isSuccess || isError) {
            modals.closeAll();
        }
    }, [isSuccess, isError]);


    const submitAddNewSubject = () =>{
        if (addClassForm.isValid() && addClassForm.isDirty()) {
            addClass(addClassForm.values);
        }
    }


    return (
            <Flex  gap='md' direction='column' >
                    <TextInput
                        withAsterisk
                        label={t("classNameLabel")}
                        placeholder={t("classNamePlaceholder")}
                        {...addClassForm.getInputProps('subjectName')}
                    />

                    <NumberInput
                        withAsterisk
                        label={t("semesterNumberLabel")}
                        placeholder={t("semesterNumberPlaceholder")}
                        {...addClassForm.getInputProps('subjectSemester')}
                    />

                    <Textarea
                        placeholder={t("classDescriptionPlaceholder")}
                        label={t("classDescriptionLabel")}
                        autosize
                        {...addClassForm.getInputProps('subjectDescription')}
                        minRows={10}
                    />

                    <Group position="center" mt="md">
                        <Button loading={isPending} fullWidth onClick={() => submitAddNewSubject()}>Submit</Button>
                    </Group>

            </Flex>
    )
}


export default AddClassModal;
