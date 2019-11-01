import { MenuValue, NAVHEADER } from '../utils/meny-storage-utils';
import {
    ActionType,
    Handling,
    SettArbeidsgiverAction,
    SettPrivatpersonAction,
    SettSamarbeidspartnerAction,
} from '../redux/actions';
import { verifyWindowObj } from '../utils/environments';

export interface Arbeidsflate {
    status: MenuValue;
}

export const dataInitState: Arbeidsflate = {
    status: MenuValue.IKKEVALGT,
};

export enum UrlValue {
    PRIVATPERSON = 'person',
    ARBEIDSGIVER = 'bedrift',
    SAMARBEIDSPARTNER = 'samarbeidspartner',
}

export default function reducer(
    state: Arbeidsflate = dataInitState,
    action: Handling
): Arbeidsflate {
    switch (action.type) {
        case ActionType.PRIVATPERSON: {
            return { ...state, status: MenuValue.PRIVATPERSON };
        }
        case ActionType.ARBEIDSGIVER: {
            return { ...state, status: MenuValue.ARBEIDSGIVER };
        }
        case ActionType.SAMARBEIDSPARTNER: {
            return { ...state, status: MenuValue.SAMARBEIDSPARTNER };
        }
        default:
            return state;
    }
}

export const finnArbeidsflate = () => {
    const sessionkey = verifyWindowObj()
        ? sessionStorage.getItem(NAVHEADER)
        : null;

    if (sessionkey) {
        return settArbeidsflate(sessionkey, true);
    }
    const arbeidsflate = [
        UrlValue.PRIVATPERSON,
        UrlValue.ARBEIDSGIVER,
        UrlValue.SAMARBEIDSPARTNER,
    ];
    arbeidsflate.map(typeArbeidsflate => {
        return verifyWindowObj() && domeneInneholder(typeArbeidsflate)
            ? settArbeidsflate(typeArbeidsflate)
            : verifyWindowObj()
            ? settPersonflate()
            : null;
    });
    return settPersonflate();
};

const domeneInneholder = (key: any): boolean => {
    return (
        window.location.pathname.indexOf(key) !== -1 ||
        window.location.origin.indexOf(key) !== -1
    );
};

const settArbeidsflate = (key: string, isSessionKey: boolean = false) => {
    return erArbeidsflate(
        key,
        isSessionKey,
        MenuValue.ARBEIDSGIVER,
        'ARBEIDSGIVER'
    )
        ? settArbeidsgiverflate()
        : erArbeidsflate(
              key,
              isSessionKey,
              MenuValue.SAMARBEIDSPARTNER,
              'SAMARBEIDSPARTNER'
          )
        ? settSamarbeidspartnerflate()
        : settPersonflate();
};

const erArbeidsflate = (
    key: string,
    sessionKeyOrUrl: boolean = false,
    menuKeyValue: MenuValue,
    urlKeyvaluie: keyof typeof UrlValue
): boolean => {
    return (
        (sessionKeyOrUrl && key === MenuValue[menuKeyValue]) ||
        key === UrlValue[urlKeyvaluie]
    );
};

function settPersonflate(): SettPrivatpersonAction {
    return {
        type: ActionType.PRIVATPERSON,
    };
}

function settArbeidsgiverflate(): SettArbeidsgiverAction {
    return {
        type: ActionType.ARBEIDSGIVER,
    };
}

function settSamarbeidspartnerflate(): SettSamarbeidspartnerAction {
    return {
        type: ActionType.SAMARBEIDSPARTNER,
    };
}
