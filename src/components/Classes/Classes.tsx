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


export const Classes = () => {
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

    const [opened, { toggle, close }] = useDisclosure(false);
    
    const [confirmed, setConfirmed] = useState(false);

    const onConfirm = () => {
      setConfirmed(true);
      close;
    };

    return (
        <>
        <Flex 
            direction="column"
            p={8}
        >
            <Flex 
                justify="flex-start" 
                align="center" 
                direction="row" 
            >
                <Button 
                    color="green.0" 
                    radius="md" 
                    size="md"
                    m={10}
                    mb={20}
                    onClick={toggle}
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
                        sx={(theme) => ({
                            boxShadow: theme.shadows.sm,
                            borderRightColor: theme.colors.neutral[3],
                            alignContent: 'center'
                        })}
                    >
                        <Accordion.Control
                            fz='md'    
                        >
                            <Flex
                                direction='row'
                                justify='space-between'
                            >
                                <Text
                                    fz='md'
                                    fw={550}
                                >
                                    {item.label}
                                </Text>
                                {confirmed &&  
                                <CheckIcon 
                                    color="lime"
                                    style={{ 
                                        width: '20px', 
                                        height: '20px'
                                    }}
                                />}
                            </Flex>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Flex
                                p='xs'
                                direction='column'
                            >
                                <Textarea
                                    placeholder={t('textPlaceholder')}
                                    variant="filled"
                                    radius="md"
                                    w="100%"
                                    minRows={4}
                                    maxLength={350}
                                />
                                <Button 
                                    color="red.0" 
                                    radius="md" 
                                    size="sm"
                                    m={8}
                                    w={100}
                                >
                                    {t('errorButton')}
                                </Button>
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Flex>

        <Modal
            opened={opened}
            onClose={close} 
            centered
            withCloseButton={false}
        >
            <Flex
                direction="column"
            >
                <Text
                    fz="xl"
                    mt="2%"
                    fw={700}
                    align='center'
                >
                    {t('warning')}
                </Text>
                <Text
                    fz="md"
                    ml="5%"
                    mr="5%"
                    mt={rem(10)}
                >
                    {t('warningText1')} 
                </Text>
                <Text
                    fz="md"
                    ml="5%"
                    mr="5%"
                    mt={rem(10)}
                >
                    {t('warningText2')} 
                </Text>
                <Flex
                    direction="row"
                    w="90%"
                    ml="5%"
                    justify="center"
                >
                    <Button 
                        color="green" 
                        radius="md" 
                        size="md"
                        m={rem(10)}
                        mb={rem(5)}
                        onClick={onConfirm}
                    >
                        {c('confirm')}
                    </Button>
                    <Button 
                        color="blue" 
                        radius="md" 
                        size="md"
                        m={rem(10)}
                        mb={rem(5)}
                        onClick={close}
                    >
                        {c('cancel')}
                    </Button>
                </Flex>
            </Flex>
        </Modal>
        </>

    );
};
