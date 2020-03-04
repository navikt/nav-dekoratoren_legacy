import {
    getSessionStorage,
    MenuValue,
    NAVHEADER,
} from '../utils/meny-storage-utils';
import {
    ActionType,
    Handling,
    SettArbeidsgiverAction,
    SettPrivatpersonAction,
    SettSamarbeidspartnerAction,
} from '../redux/actions';
import { verifyWindowObj } from '../utils/Environment';

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
    const sessionkey = verifyWindowObj() ? getSessionStorage(NAVHEADER) : null;

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
        UrlValue.ARBEIDSGIVER
    )
        ? settArbeidsgiverflate()
        : erArbeidsflate(
              key,
              isSessionKey,
              MenuValue.SAMARBEIDSPARTNER,
              UrlValue.SAMARBEIDSPARTNER
          )
        ? settSamarbeidspartnerflate()
        : settPersonflate();
};

const erArbeidsflate = (
    key: string,
    isSessionKey: boolean = false,
    menuKeyValue: MenuValue,
    urlKeyvalue: UrlValue
): boolean => {
    return (isSessionKey && key === menuKeyValue) || key === urlKeyvalue;
};

export function settPersonflate(): SettPrivatpersonAction {
    return {
        type: ActionType.PRIVATPERSON,
    };
}

export function settArbeidsgiverflate(): SettArbeidsgiverAction {
    return {
        type: ActionType.ARBEIDSGIVER,
    };
}

export function settSamarbeidspartnerflate(): SettSamarbeidspartnerAction {
    return {
        type: ActionType.SAMARBEIDSPARTNER,
    };
}
