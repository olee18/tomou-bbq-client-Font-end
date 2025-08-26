import {ErrorResponse} from '@models/errors';

export const convertToErrorResponse = (error: any): ErrorResponse => {
    return <ErrorResponse>{
        status: typeof error?.status === 'number' ? error.status : 500,
        error: typeof error?.error === 'string' ? error.error : "Unknown error",
        data: error?.data ? {
            status: typeof error.data.status === 'number' ? error.data.status : undefined,
            error: typeof error.data.error === 'string' ? error.data.error : undefined,
        } : undefined,
    };
};
