// src/theme/index.ts
import { extendTheme } from "@chakra-ui/react";
import { fonts } from "./fonts";

const theme = extendTheme({
    fonts,
    styles: {
        global: {
            body: {
                fontFamily: "PhetsarathOT, sans-serif",
            },
        },
    },
});

export default theme;
