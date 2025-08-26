import Cookies from 'js-cookie';

export const SetCookie = (key: string, value: string, expired: number) => {
    Cookies.set(key, value, {expires: expired});
};
export const RemoveCookie = (key: string) => {
    Cookies.remove(key)
};
export const GetCookie = (key: string) => {
    return Cookies.get(key)
};
