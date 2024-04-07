import { useGetClassStudents } from '@/query/classes.query';
import {
    Flex,
    Accordion,
    rem,
    Text,
    ScrollArea,
    Divider,
    Button,
    TextInput,
    Autocomplete
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Trash } from '@/Icons/Trash';
import { useState } from 'react';
import { Course, Student } from '@/types/api.types';
import { useGetAllStudents } from '@/query/students.query';

export const ClassesDean = (p: { classes: Course[] }) => {
    const d = useTranslations('HomeDean');

    const [nameInput, setNameInput] = useState('');
    const [indexInput, setIndexInput] = useState('');

    interface ClassStudents {
        class: Course,
        students: Student[]
    }

    const classesStudents: ClassStudents[] = [];
    p.classes.forEach(
        item => {
            const { data: students } = useGetClassStudents(item.subjectId);
            if(students) {
                classesStudents.push({
                    class: item, 
                    students: students
                });
            } else {
                classesStudents.push({
                    class: item, 
                    students: []
                });
            }
        }
    );
    
    const { data: studentData } = useGetAllStudents(0, 10);
    const studentNames: string[] = []
    if(studentData) {
        studentData.forEach(item => {
            const studentName = item.firstName + " " + item.lastName; 
            studentNames.push(studentName);
        })
    }

    const handleStudentForm = () => {
        const newStudentEnrollment = { name: nameInput, index: parseInt(indexInput) };
    }

    return (
        <Flex direction="column" p={8}>
            <Accordion  variant="separated">
                {classesStudents.map((classStudents) => (
                    <Accordion.Item
                        key={classStudents.class.subjectId}
                        value={classStudents.class.name}
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
                                                    {student.firstName}
                                                </Text>
                                                <Text fz='sm'>
                                                    {student.lastName}
                                                </Text>
                                            </Flex>
                                            <Button
                                                radius={80}
                                                color='red.0'
                                                size='xs'
                                                mr={33}
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
                                            placeholder={d('nameInput')}
                                            mr={10}
                                            radius='lg'
                                            limit={3}
                                            data={studentNames}
                                            value={nameInput}
                                            onChange={setNameInput}
                                        />
                                        <TextInput
                                            placeholder={d('indexInput')}
                                            radius='lg'
                                            value={indexInput}
                                            onChange={(event) => setIndexInput(event.currentTarget.value)}
                                        />
                                    </Flex>
                                    <Button
                                        radius={80}
                                        color='blue.5'
                                        size='sm'
                                        mr={45}
                                        onClick={() => handleStudentForm}
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