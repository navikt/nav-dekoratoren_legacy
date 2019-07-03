import Environments from '../utils/Environments';
import { fetchToJson } from './fetch-utils';
import { Data } from '../redux/innloggingsstatus-duck';
import { Data as sokeData } from '../redux/soke-duck';

const { baseUrl } = Environments();

interface ApiProps {
    innloggingsstatusURL: string;
    sokeresultat: string;
}

export const API: ApiProps = {
    innloggingsstatusURL: `${baseUrl}/innloggingslinje-api/auth`,
    sokeresultat:
        'https://www-x1.nav.no/www.nav.no/sok/_/service/navno.nav.no.search/search?ord=pensjon',
};

export function hentInnloggingsstatusFetch(): Promise<Data> {
    return fetchToJson(API.innloggingsstatusURL);
}

export function hentSokeResultatFetch(): Promise<sokeData> {
    return fetchToJson(API.sokeresultat);
}
