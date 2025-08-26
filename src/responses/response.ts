import {CreateToastFnReturn} from "@chakra-ui/react";
import {ErrorResponse, NavigateFunction} from "react-router-dom";

export const ToastError = (toast: CreateToastFnReturn, title: string, description: string) => {
    return toast({
        status: "error",
        duration: 8000,
        variant: "solid",
        title: title,
        description: description,
        isClosable: true
    });
};
export const checkErrorResponse = (
    toast: CreateToastFnReturn,
    navigate: NavigateFunction,
    title: string,
    response: ErrorResponse
) => {
    switch (response) {
        case undefined:
            break;
        default:
            switch (response.status) {
                case 401:
                    ToastError(
                        toast,
                        `${title} Fail`,
                        `Details: ${response?.data?.error}`
                    );
                    navigate("/auth-sign-in");
                    break;
                case 500:
                    navigate("/server-error");
                    break;
                case 404:
                    ToastError(toast, "API Not Found", "404 API Not Found")
                    break;
                default:
                    ToastError(
                        toast,
                        `${title} Fail`,
                        `Details: ${response?.data?.error}`
                    );
                    break;
            }
    }
    return;
};
