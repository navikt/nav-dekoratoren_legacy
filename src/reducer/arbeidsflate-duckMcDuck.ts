import { checkUriPath, MenuValue } from '../utils/meny-storage-utils';
import { ActionType, Handling } from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';

export interface Arbeidsflate {
    status: MenuValue;
}

export const dataInitState: Arbeidsflate = {
    status: MenuValue.IKKEVALGT,
};

interface StatusAction {
    person: () => Handling;
    arbeidsgiver: () => Handling;



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


export function settArbeidsflate(): (dispatch: Dispatch) => void() {
    return checkUriPath()
}
