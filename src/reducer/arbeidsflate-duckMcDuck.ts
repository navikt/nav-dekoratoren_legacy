import { MenuValue, NAVHEADER } from '../utils/meny-storage-utils';
import {
    ActionType,
    Handling,
    SettArbeidsflateArbeidsgiver,
    SettArbeidsflatePrivatPerson,
    SettArbeidsflateSamarbeidspartner,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { verifyWindowObj } from '../utils/environments';

export interface Arbeidsflate {
    status: MenuValue;
}

export const dataInitState: Arbeidsflate = {
    status: MenuValue.IKKEVALGT,
};

interface MylitlePonyAction {
    person: () => Handling;
    arbeid: () => Handling;
    samhandling: () => Handling;
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
            return { ...state, status: MenuValue.IKKEVALGT };
    }
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
    arbeidsflate.map(typeArbeidsflate => {
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
}
