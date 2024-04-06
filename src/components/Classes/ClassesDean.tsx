import { useGetClasses } from '@/query/classes.query';
import {
    Flex,
    Accordion,
    rem,
    Text,
    ScrollArea,
    Divider,
    Button,
    TextInput
} from '@mantine/core';
import { EmptyState } from '../EmptyState/EmptyState';
import { useTranslations } from 'next-intl';
import { Trash } from '@/Icons/Trash';
import { useState } from 'react';

export const ClassesDean = (props: { semesterTag: string }) => {
    const { data: classes } = useGetClasses(props.semesterTag);
    const t = useTranslations('Classes');
    const d = useTranslations('HomeDean');

    const mock_students = [
        {name: 'Jakub Świątek', index: 123123},
        {name: 'Jakub Świątek', index: 123123},
        {name: 'Jakub Świątek', index: 123123},
        {name: 'Jakub Świątek', index: 123123}
    ]

    const [nameInput, setNameInput] = useState('');
    const [indexInput, setIndexInput] = useState('');

    const handleStudentForm = () => {
        const new_mock_student = { name: nameInput, index: parseInt(indexInput) };
        mock_students.push(new_mock_student);
    }

    return (
        <>
        {!classes || classes.length === 0 ? (
            <EmptyState
                title={t('Table.emptyTitle')}
                description={t('Table.emptyDescription')}
            />
        ) : (
            <Flex 
                direction="column"
                p={8}
            >
                <Accordion 
                    variant="separated"
                >
                    {classes.map((item) => (
                        <Accordion.Item
                            key={item.subjectId}
                            value={item.name}
                            bg='neutral.0'
                            mih={rem(70)}   
                            sx={(theme) => ({
                                boxShadow: theme.shadows.sm,
                                borderRightColor: theme.colors.neutral[3],
                                alignContent: 'center'
                            })}
                        >
                            <Accordion.Control
                                fz='md'    
                            >
                                <Text
                                    fz='md'
                                    fw={700}
                                >
                                    {item.name}
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Flex
                                    p='xs'
                                    direction='column'
                                >
                                    <ScrollArea
                                        h={200}
                                        ml={15}
                                        mr={15}
                                    >
                                        {mock_students.map((student, index) => (
                                            <>
                                            <Flex
                                                key={index}
                                                direction='row'
                                                align='center'
                                                justify='space-between'
                                                p={10}
                                            >
                                                <Flex>
                                                    <Text
                                                        mr={10}
                                                        fw={700}
                                                        fz='md'
                                                    >
                                                        {student.name}
                                                    </Text>
                                                    <Text
                                                        fz='sm'
                                                    >
                                                        {student.index}
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
                                            <TextInput
                                                placeholder={d('nameInput')}
                                                mr={10}
                                                radius='lg'
                                                value={nameInput}
                                                onChange={(event) => setNameInput(event.currentTarget.value)}
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
        )}
        </>
    );
};