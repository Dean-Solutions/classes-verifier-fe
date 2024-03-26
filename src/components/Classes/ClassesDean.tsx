import { useState } from 'react';
import {
    Flex,
    Accordion,
    rem,
    Button,
    Textarea,
    Modal,
    Text,
    CheckIcon
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import { useGetClasses } from '@/query/classes.query';


export const ClassesDean = () => {
    const classes_list = [
        {label: "Inżynieria Oprogramowania"},
        {label: "Systemy Rozproszone"},
        {label: "Pracownia Projektowa"},
        {label: "Architektury Komputerów"},
        {label: "Inżynieria Bezpieczeństwa"},
        {label: "Technologie Internetu Rzeczy"}
    ];
    const t = useTranslations('HomeStudent');
    const c = useTranslations('Common');
    
    return (
        <Flex 
            direction="column"
            h='100%'
            p={rem(8)}
        >
            <Accordion 
                variant="separated"
            >
                {classes_list.map((item) => (
                    <Accordion.Item
                        key={item.label}
                        value={item.label}
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
                            {item.label}
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Flex
                                p='xs'
                                direction='column'
                            >
                                
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Flex>
    );
};