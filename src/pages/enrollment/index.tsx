import { AppLayout } from '@/components/common/Layout/AppLayout';
import {Box, Button, Flex, Select, Text, Title} from '@mantine/core';
import { getStaticProps } from '@/pages/index';
import {useTranslations} from "next-intl";
import React from "react";
import EnrollmentTable from "@/components/EnrollmentTable/EnrollmentTable";
import {Enrollment} from "@/types/api.types";
import {useGetStudents} from "@/query/students.query";
import {useGetEnrollments} from "@/query/enrollment.query.tx";



export default function EnrollmentPage() {
    const t = useTranslations('Enrollment');

    const { data: enrollments, isLoading, isError } = useGetEnrollments(123);

    return (
        <AppLayout>
            <Flex direction='column' gap='lg'>
                <Flex
                    align='center'
                    justify='center'
                    sx={(theme) => ({
                        borderBottom: `0.5px solid ${theme.colors.neutral[4]}`,
                        paddingBlock: theme.spacing.md,
                    })}
                >
                    <Title>{t("headerTitle")}</Title>
                    <Flex ml='auto' align='center'>
                    </Flex>
                </Flex>

                <Button
                    w={200}
                    color={"success"}
                >
                    {t("acceptAllTitle")}
                </Button>

                <EnrollmentTable data={enrollments} isLoading={isLoading} isError={isError}></EnrollmentTable>

            </Flex>


        </AppLayout>
    );
}

export { getStaticProps };
