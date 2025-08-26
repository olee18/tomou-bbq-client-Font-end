import {useColorModeValue} from "@chakra-ui/react";

//==========================Background Button Color=============================

//Main
export const BgButtonMainColor = () => {
    return useColorModeValue('#F37199', '#F37199');
};
export const BgButtonMainHoverColor = () => {
    return useColorModeValue('#F37199', '#F37199');
};
export const BgButtonMain2Color = () => {
    return useColorModeValue('#337357', '#337357');
};
export const BgButtonMain2HoverColor = () => {
    return useColorModeValue('#07a107', '#07a107');
};
//Red
export const BgButtonRedColor = () => {
    return useColorModeValue('#EE4E4E', '#EE4E4E');
};
export const BgButtonRedHoverColor = () => {
    return useColorModeValue('#cb1d1d', '#cb1d1d');
};
export const BgButtonGreenHoverColor = () => {
    return useColorModeValue('#07a107', '#07a107');
};


export const BgButtonGreenColor = () => {
    return useColorModeValue('#07a107', '#07a107');
};


export const BgButtonWhiteColor = () => {
    return useColorModeValue('#F37199', '#F37199');
};
//==========================Text Button Color=============================
//Main
export const TextButtonMainColor = () => {
    return useColorModeValue('#FFFFFF', '#FFFFFF');
};
export const TextButtonMainHoverColor = () => {
    return useColorModeValue('#ffffff', '#ffffff');
};

export const TextButtonDrawwerHoverColor = () => {
    return useColorModeValue('#F37199', '#F37199');
};

//Red
export const TextButtonRedColor = () => {
    // return useColorModeValue('red.400', 'red.500');
    return useColorModeValue('#ffffff', '#ffffff');
};
export const TextButtonRedHoverColor = () => {
    // return useColorModeValue('red.500', 'red.600');
    return useColorModeValue('#ffffff', '#ffffff');
};
export const ButtonActionWidth = () => {
    return {base: 150, md: 170, lg: 200}
};
export const ButtonModalWidth = () => {
    return {base: 120, md: 150}
};

export const BgColorScheme = () => {
    return useColorModeValue('pink', 'pink');
};
export const BgRedScheme = () => {
    return useColorModeValue('red', 'red');
};
export const BgBlueScheme = () => {
    return useColorModeValue('blue', 'blue');
};
export const BgGreenScheme = () => {
    return useColorModeValue('green', 'green');
};