import {useLocation} from "react-router-dom";

const Active_router = (routeName: string) => {
    return useLocation().pathname.includes(routeName);
}
export default Active_router