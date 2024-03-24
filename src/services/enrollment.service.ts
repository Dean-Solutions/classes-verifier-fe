import {Enrollment} from "@/types/api.types";

export function getEnrollments(studentId: number): Enrollment[]{
    //TODO: Fetch from backend
    return [
        {
            id: 0,
            student: 'Siemaneczko',
            subject: 'asdfasfd',
            status: 0
        },
        {
            id: 1,
            student: 'Siemaneczko',
            subject: 'asdfasfd',
            status: 0
        },
        {
            id: 2,
            student: 'Siemaneczko',
            subject: 'asdfasfd',
            status: 1
        },
        {
            id: 3,
            student: 'Siemaneczko',
            subject: 'asdfasfd',
            status: 2
        },
    ]
}

export function sendEnrollmentError(enrollment: Enrollment, message: string){
    //TODO: implement sending enrollment error message to backend
}