import { Flex, Title } from '@mantine/core';
import React, {useState} from 'react';
import Search from '../Search/Search';
import type {Enrollment, Student} from "@/types/api.types";
import type {ColumnDef} from "@tanstack/react-table";
import {TableLoader} from "@/components/StudentsTable/TableLoader";
import {DataFetchErrorReload} from "@/components/common/molecules/DataFetchError/DataFetchError";
import EnrollmentEntry from "@/components/EnrollmentTable/EnrollmentEntry";


type TokensTableProps = {
    data?: Enrollment[];
    isLoading: boolean;
    isError: boolean;
};

const EnrollmentTable = ({
    data,
    isLoading,
    isError
}: TokensTableProps) => {


    if (isLoading) {
        return <TableLoader />;
    }

    if (isError) {
        return <DataFetchErrorReload />;
    }


    return (
        <Flex direction={"column"}>
            {
                data!.map(element => {
                    return EnrollmentEntry(element);
                })
            }
        </Flex>
    )
};

export default EnrollmentTable;
