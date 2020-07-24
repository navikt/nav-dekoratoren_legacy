import Cookies from 'js-cookie';

const getDomain = () =>
    document.location.hostname !== 'localhost' ? '.nav.no' : undefined;

const setCookie = (key: string, data: any | any[]): void => {
    Cookies.set(key, data, { domain: getDomain() });
};

const getCookie = (key: string): any | any[] | null => {
    return Cookies.getJSON(key) || null;
};

const deleteCookie = (key: string): void => {
    Cookies.remove(key, { domain: getDomain() });
};

export { setCookie, getCookie, deleteCookie };
