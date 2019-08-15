import Environments from '../utils/Environments';
import { fetchToJson } from './fetch-utils';
import { Data } from '../redux/innloggingsstatus';
import { Data as MenuData } from '../redux/menuReducer';

const { baseUrl, menypunkter } = Environments();

interface ApiProps {
    innloggingsstatusURL: string;
    menyPunkterURL: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: `${baseUrl}/innloggingslinje-api/auth`,
    menyPunkterURL: menypunkter,
};

export function hentInnloggingsstatusFetch(): Promise<Data> {
    return fetchToJson(API.innloggingsstatusURL);
}

export function hentMenyPunkter(): Promise<Array<object>> {
    return fetchToJson(API.menyPunkterURL);
}
