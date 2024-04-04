import { Flex, Text, Paper } from "@mantine/core";

interface ModalComponentProps {
    title: string,
    description: string
}

export const ConfirmModal = ({title, description}: ModalComponentProps) => {
    const paragraphs = description.split("\n\n");

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
                {title}
            </Text>
            <Paper>
                {paragraphs.map((paragraph, index) => (
                    <Text
                        key={index}
                        fz="md"
                        ml="5%"
                        mr="5%"
                        mt={10}
                        mb={10}
                    >
                        {paragraph} 
                    </Text>
                ))}
            </Paper>
        </Flex>
    );
}
