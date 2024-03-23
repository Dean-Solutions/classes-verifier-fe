import { useState } from 'react';
import {
    Flex,
    Accordion,
    rem,
    Button,
    Textarea
} from '@mantine/core';
import { useTranslations } from 'next-intl';


export const Classes = () => {
    const classes_list = [
        {label: "Inżynieria Oprogramowania"},
        {label: "Systemy Rozproszone"},
        {label: "Pracownia Projektowa"},
        {label: "Architektury Komputerów"},
        {label: "Inżynieria Bezpieczeństwa"},
        {label: "Technologie Internetu Rzeczy"}
    ];
    const t = useTranslations('HomeStudent')

    return (
        <Flex 
            direction="column"
            h='100%'
            style={{
                padding: rem(8),
                
            }}
        >
            <Flex 
                mih={50} 
                justify="flex-start" 
                align="center" 
                direction="row" 
            >
                <Button 
                    color="green" 
                    radius="md" 
                    size="md"
                    m={rem(10)}
                    mb={rem(20)}
                >
                    {t('confirmButton')}
                </Button>
            </Flex>
            <Accordion variant="separated">
                {classes_list.map((item) => (
                    <Accordion.Item
                        key={item.label}
                        value={item.label}
                        bg='neutral.0'
                        mih={rem(70)}   
                        sx={{ alignContent: 'center' }}
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
                                <Textarea
                                    placeholder="Opisz krótko swój problem"
                                    variant="filled"
                                    radius="md"
                                    w="100%"
                                    minRows={4}
                                />
                                <Button 
                                    color="red" 
                                    radius="md" 
                                    size="sm"
                                    m={rem(8)}
                                    sx={{ width: rem(100) }}
                                >
                                    {t('errorButton')}
                                </Button>
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Flex>
    );
};
