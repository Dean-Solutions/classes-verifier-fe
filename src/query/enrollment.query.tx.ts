
import { ONE_HOUR, QueryKeys } from '@/types/query.types';
import { useQuery } from '@tanstack/react-query';
import {getEnrollments} from "@/services/enrollment.service";

export const useGetEnrollments = (studentId: number) => {
    return useQuery({
        queryKey: [QueryKeys.GET_ENROLLMENTS, { studentId }],
        queryFn: () => getEnrollments(studentId),
        staleTime: ONE_HOUR,
        enabled: !!studentId,
    });
};
