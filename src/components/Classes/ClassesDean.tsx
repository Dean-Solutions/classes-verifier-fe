import { useGetClassStudents } from '@/query/classes.query';
import {
    Flex,
    Accordion,
    rem,
    Text,
    ScrollArea,
    Divider,
    Button,
    Autocomplete
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Trash } from '@/Icons/Trash';
import { useState } from 'react';
import { Course } from '@/types/api.types';
import { useGetAllStudents } from '@/query/students.query';
import { useAddEnrollment, useDeleteEnrollment } from '@/mutations/enrollment.mutate';
import { Enroll } from '@/types/enrollments.types';
import { deleteEnrollment } from '@/services/enrollment.service';

type ClassesDeanProps = { classes: Course[] }

export const ClassesDean = (p: ClassesDeanProps ) => {
    const d = useTranslations('HomeDean');
    const [nameIndexInput, setNameIndexInput] = useState('');
    const { mutate: addEnrollment } = useAddEnrollment();
    const [openedClass, setOpenedClass] = useState<string | null>(null);
    const { mutate } = useDeleteEnrollment();

    // problem ze to podejscie sprawia ze sie nie odswieza od razu; trzeba F5 strone zeby wyswietlic
    // studentow znowu dobrych - nie mam pomyslu jak naprawic to teraz ;//
    const classesStudents = p.classes.map((item) => ({
        class: item,
        students: useGetClassStudents(item.subjectId).data || []
    }));
    
    const { data: studentData } = useGetAllStudents();
    const studentNames = studentData?.map(({firstName, lastName, indexNumber}) => 
        `${firstName} ${lastName} ${indexNumber}`) || []

    console.log(studentData);

    const handleStudentForm = () => {
        const student = studentData?.find(item => item.indexNumber === nameIndexInput.split(" ").pop());
        if(student) {
            const newEnrollment: Enroll = {
                userId: student.userId,
                subjectId: parseInt(openedClass || ""),
                semesterId: 1,
                enrollStatus: "ACCEPTED"
            }
            addEnrollment(newEnrollment);
        }
    }

    return (
        <Flex direction="column" p={8}>
            <Accordion variant="separated" value={openedClass} onChange={setOpenedClass}>
                {classesStudents.map((classStudents) => (
                    <Accordion.Item
                        key={classStudents.class.subjectId}
                        value={classStudents.class.subjectId.toString()}
                        bg='neutral.0'
                        mih={rem(70)}   
                        sx={(theme) => ({
                            boxShadow: theme.shadows.sm,
                            borderRightColor: theme.colors.neutral[3],
                            alignContent: 'center'
                        })}
                    >
                        <Accordion.Control fz='md'>
                            <Text fz='md' fw={700}>
                                {classStudents.class.name}
                            </Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Flex p='xs' direction='column'>
                                <ScrollArea h={200} ml={15} mr={15}>
                                    {classStudents.students.map((student) => (
                                        <>
                                        <Flex
                                            key={student.userId}
                                            direction='row'
                                            align='center'
                                            justify='space-between'
                                            p={10}
                                        >
                                            <Flex>
                                                <Text mr={10} fw={700} fz='md'>
                                                    {`${student.firstName} ${student.lastName} (${student.indexNumber})`}
                                                </Text>
                                             
                                            </Flex>
                                            <Button
                                                radius={80}
                                                color='red.0'
                                                size='xs'
                                                mr={33}
                                                // 405 error na tej metodzie, nw czy ja cos chrzanie czy 
                                                // nie da sie usuwac enrollmentow
                                                onClick={() => deleteEnrollment(student.indexNumber)}
                                            >
                                                <Trash />
                                            </Button>
                                        </Flex>
                                        <Divider w='96%'/>
                                        </>
                                        ))}
                                </ScrollArea>
                                <Flex
                                    direction='row'
                                    align='center'
                                    justify='space-between'
                                    p={15}
                                >
                                    <Flex>
                                        <Autocomplete
                                            placeholder={d('nameIndexInput')}
                                            mr={10}
                                            radius='lg'
                                            limit={3}
                                            miw={300}
                                            data={studentNames}
                                            value={nameIndexInput}
                                            onChange={setNameIndexInput}
                                        />
                                    </Flex>
                                    <Button
                                        radius={80}
                                        color='blue.5'
                                        size='sm'
                                        mr={45}
                                        onClick={handleStudentForm}
                                    >
                                        +
                                    </Button>
                                </Flex>
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Flex>
    );
};