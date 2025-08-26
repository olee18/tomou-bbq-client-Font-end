import {useColorModeValue} from "@chakra-ui/react";

//==========================Border Color=============================

//Border Size
export const BorderSize = () => {
    return "1px"
};

//Border Color
export const BorderColor = () => {
    return useColorModeValue('#27374', '#DFE0DF');
};


export const BorderTableColor = () => {
    return useColorModeValue("#cecece", "#49556b");
};
