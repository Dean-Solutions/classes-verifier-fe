import { Button, Flex, Text } from "@mantine/core";
import { useTranslations } from "next-intl";

interface ModalComponentProps {
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmModal = ({onClose, onConfirm}: ModalComponentProps) => {
    const t = useTranslations('HomeStudent');
    const c = useTranslations('Common');


    return (
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
                mt={10}
            >
                {t('warningText1')} 
            </Text>
            <Text
                fz="md"
                ml="5%"
                mr="5%"
                mt={10}
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
                    color="green.0" 
                    radius="md" 
                    size="md"
                    m={10}
                    mb={5}
                    onClick={onConfirm}
                >
                    {c('confirm')}
                </Button>
                <Button 
                    color="blue.5" 
                    radius="md" 
                    size="md"
                    m={10}
                    mb={5}
                    onClick={onClose}
                >
                    {c('cancel')}
                </Button>
            </Flex>
        </Flex>
    );
}
