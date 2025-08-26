import {useColorModeValue} from "@chakra-ui/react";

//==========================Background Color=============================

export const BgBodyColor = () => {
    return useColorModeValue('#E8E8E8', '#232D3F');
};

//==========================Text Color=============================
//Text body Size
export const TextBodySize = () => {
    return "14px"
};
//Icon body Size
export const IconBodySize = () => {
    return "14px"
};

//Text Body Title Size
export const TextBodyTitleSize = () => {
    return "16px"
};
//Icon Body Title Size
export const IconBodyTitleSize = () => {
    return "16px"
};

export const TextBodyColor = () => {
    return useColorModeValue('#1A202C', '#F1F0E8');
};

//==========================Text Red Color=============================

export const TextBodyRedColor = () => {
    return useColorModeValue('#ff0000', '#ff0000');
};

//==========================Check Color=============================

export const CheckBoxColor = () => {
    return useColorModeValue('orange', 'red');
};