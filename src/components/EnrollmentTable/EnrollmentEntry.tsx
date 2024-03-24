import {Button, Flex, Textarea, Title} from '@mantine/core';
import React, {useState} from 'react';
import {Enrollment, EnrollmentStatus} from "@/types/api.types";
import {sendEnrollmentError} from "@/services/enrollment.service";

const EnrollmentEntry = (enrollment: Enrollment) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const [errorRequestMessage, setErrorRequestMessage] = useState('');


    return (
        <Flex
            key={enrollment.id}
            direction={"column"}
            sx={(theme) => ({
                minHeight: "110px",
                borderBottom: `0.5px solid ${theme.colors.neutral[4]}`,
                paddingBlock: theme.spacing.md,
                border: "0px solid white",
                borderRadius: "18px",
                paddingLeft: "20px",
                paddingRight: "20px",
                marginBottom: "12px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.10)"
            })}
            bg="rgba(255, 255, 255, 1)"
        >
            <Flex
                align='center'
                justify='center'
                sx={(theme) => ({
                    borderBottom: `0.5px solid ${theme.colors.neutral[4]}`,
                    paddingBlock: theme.spacing.md,
                })}
            >
                <Title>{enrollment.subject}</Title>
                <Flex ml='auto' align='center' onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "/\\" : "\\/"}
                </Flex>
            </Flex>
            {
                isExpanded &&(
                    <Textarea
                        value={errorRequestMessage}
                        onChange={(event) => setErrorRequestMessage(event.currentTarget.value)}
                        h={"220px"}
                        autosize
                        minRows={10}
                    />
                )
            }
            {
                isExpanded &&
                <Button
                    w={"150px"}
                    bg={"rgba(255, 30, 30, 1)"}
                    mt={"16px"}
                    // TODO: if request of error is pending then disable button
                    disabled={enrollment.status === EnrollmentStatus.ERROR_REQUEST_PENDING || enrollment.status === EnrollmentStatus.ACCEPTED}
                    onClick={() => sendErrorRequest(enrollment, errorRequestMessage)}
                >
                    Zgłoś błąd
                </Button>
            }
        </Flex>
    );
}

async function sendErrorRequest(enrollment: Enrollment,message: string) {
    // TODO: Remove console.log in future
    console.log(message);
    sendEnrollmentError(enrollment, message);
}



export default EnrollmentEntry;
