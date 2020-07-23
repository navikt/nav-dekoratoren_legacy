import Cookies from 'js-cookie';

const getDomain = () =>
    document.location.hostname !== 'localhost' ? '.nav.no' : undefined;

const saveJSON = (key: string, data: any | any[]): void => {
    Cookies.set(key, data, { domain: getDomain() });
};

const loadJSON = (key: string): any | any[] | null => {
    return Cookies.getJSON(key) || null;
};

const deleteJSON = (key: string): void => {
    Cookies.remove(key, { domain: getDomain() });
};

export { saveJSON, loadJSON, deleteJSON };
