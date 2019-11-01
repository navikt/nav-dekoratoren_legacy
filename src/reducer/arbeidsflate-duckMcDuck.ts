import { MenuValue, NAVHEADER } from '../utils/meny-storage-utils';
import {
    ActionType,
    Handling,
    SettPrivatpersonAction,
    SettArbeidsgiverAction,
    SettSamarbeidspartnerAction,
} from '../redux/actions';
import { verifyWindowObj } from '../utils/environments';

export interface Arbeidsflate {
    status: MenuValue;
}

export const dataInitState: Arbeidsflate = {
    status: MenuValue.IKKEVALGT,
};

enum UrlValue {
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
        return settArbeidsflate(sessionkey, 'sessionKey');
    }
    const arbeidsflate = [
        UrlValue.PRIVATPERSON,
        UrlValue.ARBEIDSGIVER,
        UrlValue.SAMARBEIDSPARTNER,
    ];
    arbeidsflate.map(typeArbeidsflate => {
        return (
            verifyWindowObj() && domeneInneholder(typeArbeidsflate)
            ? settArbeidsflate(typeArbeidsflate, 'url')
            : verifyWindowObj()
            ? settPersonflate()
            : null   
        )
    });
    return settPersonflate();
};

const domeneInneholder = (key: any): boolean => {
    return (
        window.location.pathname.indexOf(key) !== -1 ||
        window.location.origin.indexOf(key) !== -1
    );
};

const settArbeidsflate = (key: string, sessionKeyOrUrl: string) => {
    return (
        erArbeidsgiverflate(key, sessionKeyOrUrl)
        ? settArbeidsgiverflate()
        : erSamarbeidspartnerflate(key, sessionKeyOrUrl) 
        ? settSamarbeidspartnerflate()
        : settPersonflate()
    )
};

const erArbeidsgiverflate = (key: string, sessionKeyOrUrl: string): boolean => {
    return (
        sessionKeyOrUrl === 'sessionKey' && key === MenuValue.ARBEIDSGIVER ||
        sessionKeyOrUrl === 'url' && key === UrlValue.ARBEIDSGIVER
    )
};

const erSamarbeidspartnerflate = (key: string, sessionKeyOrUrl: string): boolean => {
    return (
    sessionKeyOrUrl === 'sessionKey' && key === MenuValue.SAMARBEIDSPARTNER || 
    sessionKeyOrUrl === 'url' && key === UrlValue.SAMARBEIDSPARTNER
    )
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

/*
interface MylitlePonyAction {
    person: () => Handling;
    arbeid: () => Handling;
    samhandling: () => Handling;
}

export function unnersokArbeidsflate(): (dispath: Dispatch) => void {
    return finnArbeidsflate({
        person: settPersonflate,
        arbeid: settArbeidsgiverflate,
        samhandling: settSamhandlingsflate,
    });
}

function finnArbeidsflate({
    person,
    arbeid,
    samhandling,
}: MylitlePonyAction): (dispath: Dispatch) => void {
    return (dispath: Dispatch): void => {
        settArbeidsflateUtfraSessionKeyEllerUrl(dispath, {
            person,
            arbeid,
            samhandling,
        });
    };
}

const settArbeidsflate = (
    key: string,
    dispatch: Dispatch,
    { person, arbeid, samhandling }: MylitlePonyAction
) => {
    return erArbeidsflate(key)
        ? dispatch(arbeid())
        : erSamhandlingflate(key)
        ? dispatch(samhandling())
        : dispatch(person());
};

const domeneInneholder = (key: any): boolean => {
    return (
        window.location.pathname.indexOf(key) !== -1 ||
        window.location.origin.indexOf(key) !== -1
    );
};

const settArbeidsflateUtfraSessionKeyEllerUrl = (
    dispatch: Dispatch,
    { person, arbeid, samhandling }: MylitlePonyAction
) => {
    const sessionkey = verifyWindowObj()
        ? sessionStorage.getItem(NAVHEADER)
        : null;
    if (sessionkey) {
        return settArbeidsflate(sessionkey, dispatch, {
            person,
            arbeid,
            samhandling,
        });
    }
    const arbeidsflate = [person(), arbeid(), samhandling()];
    return arbeidsflate.map(typeArbeidsflate => {
        if (verifyWindowObj() && domeneInneholder(typeArbeidsflate)) {
            return dispatch(typeArbeidsflate);
        }
    });
    return verifyWindowObj() ? dispatch(person()) : null;
};

const personflate = (key: string): boolean => {
    return key === MenuValue.PRIVATPERSON;
};

const erArbeidsflate = (key: string): boolean => {
    return key === MenuValue.ARBEIDSGIVER;
};

const erSamhandlingflate = (key: string): boolean => {
    return key === MenuValue.SAMARBEIDSPARTNER;
};

function settPersonflate(): SettArbeidsflatePrivatPerson {
    return {
        type: ActionType.PRIVATPERSON,
    };
}

function settArbeidsgiverflate(): SettArbeidsflateArbeidsgiver {
    return {
        type: ActionType.ARBEIDSGIVER,
    };
}

function settSamhandlingsflate(): SettArbeidsflateSamarbeidspartner {
    return {
        type: ActionType.SAMARBEIDSPARTNER,
    };
} */
