import {CreateToastFnReturn} from "@chakra-ui/react";

interface IToast {
    toast: CreateToastFnReturn;
    des: string;
}

export const toastError = ({toast, des}: IToast) => {
    return toast({
        status: "error",
        duration: 8000,
        variant: "solid",
        title: "Failed",
        description: des,
        isClosable: true
    });
};

export const ToastCreated = (toast: CreateToastFnReturn, description: string) => {
    return toast({
        status: "success",
        duration: 8000,
        variant: "solid",
        title: "Created",
        description: `Create ${description} Success`,
        isClosable: true
    });
};
export const toastSuccess = ({toast, des}: IToast) => {
    return toast({
        status: "success",
        duration: 5000,
        variant: "solid",
        title: "Success",
        description: des,
        isClosable: true
    });
};

export const toastCreate = (createToastFnReturn: CreateToastFnReturn, s: string) => {
    return toast({
        status: "success",
        duration: 5000,
        variant: "solid",
        title: "Success",
        description: `Create ${des} success`,
        isClosable: true
    });
};
export const toastUpdate = (toast: CreateToastFnReturn, s: string) => {
    return toast({
        status: "success",
        duration: 5000,
        variant: "solid",
        title: "Success",
        description: `Update ${des} success `,
        isClosable: true
    });
};
export const toastDelete = (toast: CreateToastFnReturn, name: string) => {
    return toast({
        status: "success",
        duration: 5000,
        variant: "solid",
        title: "Success",
        description: `Delete ${des} success`,
        isClosable: true
    });
};
export const toastApprove = ({toast, des}: IToast) => {
    return toast({
        status: "success",
        duration: 5000,
        variant: "solid",
        title: "Success",
        description: `Approve ${des} success`,
        isClosable: true
    });
};
