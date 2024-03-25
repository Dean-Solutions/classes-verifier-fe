import { useState } from 'react';
import {
    Flex,
    rem,
    Button,
    Grid,
    Text,
    Divider,
    Badge,
    ScrollArea
} from '@mantine/core';
import { useTranslations } from 'next-intl';


export const RequestsDean = () => {
    const spanValue = 4;
    const t = useTranslations('Requests');

    const requests_list = [
        {
            class: "Inżynieria Oprogramowania",
            tag: "INF_23_24 | Jakub Świątek | 3 rok",
            descripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at scelerisque felis. Mauris arcu magna, ullamcorper ut dignissim non, viverra vel orci. Fusce semper metus a tincidunt condimentum. Cras in leo dapibus, cursus mi quis, porta velit. Phasellus vehicula nibh id tincidunt ornare. Suspendisse sapien mi, rutrum at ex sit amet erat curae."
        },
        {
            class: "Systemy Wbudowane",
            tag: "INF_23_24 | Jakub Świątek | 3 rok",
            descripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at scelerisque felis. Mauris arcu magna, ullamcorper ut dignissim non, viverra vel orci. Fusce semper metus a tincidunt condimentum. Cras in leo dapibus, cursus mi quis, porta velit. Phasellus vehicula nibh id tincidunt ornare. Suspendisse sapien mi, rutrum at ex sit amet erat curae."
        },
        {
            class: "Systemy Wbudowane",
            tag: "INF_23_24 | Jakub Świątek | 3 rok",
            descripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at scelerisque felis. Mauris arcu magna, ullamcorper ut dignissim non, viverra vel orci. Fusce semper metus a tincidunt condimentum. Cras in leo dapibus, cursus mi quis, porta velit. Phasellus vehicula nibh id tincidunt ornare. Suspendisse sapien mi, rutrum at ex sit amet erat curae."
        }
    ];

    return (
        <Grid
            h='100%'
            style={{
                padding: rem(8),
            }}
        >
            {requests_list.map((item) => (
                <Grid.Col 
                    span={spanValue}
                    key={item.class}
                >
                    <Flex
                        h={rem(300)}
                        bg='neutral.0'
                        direction='column'
                        sx={(theme) => ({
                            boxShadow: theme.shadows.md,
                            borderRightColor: theme.colors.neutral[3],
                            borderRadius: rem(10)
                        })}
                    >
                        <Text
                            fz="xl"
                            mt="2%"
                            ml="5%"
                        >
                            {item.class}
                        </Text>
                        <Text
                            fz="xs"
                            ml="5%"
                        >
                            {item.tag}
                        </Text>
                        <Divider pb='xs' w='90%' ml='5%'/>
                        <ScrollArea
                            h={175}
                            ml={rem(15)}
                            mr={rem(15)}
                        >
                            <Text
                                fz="s"
                            >
                                {item.descripton}
                            </Text>
                        </ScrollArea>
                        <Flex
                            justify="flex-end" 
                            align="center" 
                            direction="row" 
                        >
                            <Button 
                                color="green" 
                                radius="md" 
                                size="xs"
                                m={rem(10)}
                                mb={rem(10)}
                            >
                                {t('confirmButton')}
                            </Button>
                        </Flex>
                    </Flex>
                </Grid.Col>
            ))}
        </Grid>
    );

}