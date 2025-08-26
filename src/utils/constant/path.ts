import {useLocation} from "react-router-dom";

export const locationPath = () => {
    return useLocation().pathname
};