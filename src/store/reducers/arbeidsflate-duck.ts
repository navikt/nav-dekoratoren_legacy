import { getSessionStorage } from 'utils/meny-storage-utils';
import { MenuValue, NAVHEADER } from 'utils/meny-storage-utils';
import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';
import { SettArbeidsgiverAction } from 'store/actions';
import { SettSamarbeidspartnerAction } from 'store/actions';
import { SettPrivatpersonAction } from 'store/actions';
import { verifyWindowObj } from '../../utils/Environment';

export interface Arbeidsflate {
    status: MenuValue;
}

export const initialState: Arbeidsflate = {
    status: MenuValue.IKKEVALGT,
};

export enum UrlValue {
    PRIVATPERSON = 'person',
    ARBEIDSGIVER = 'bedrift',
    SAMARBEIDSPARTNER = 'samarbeidspartner',
}

export const reducer = (
    state: Arbeidsflate = initialState,
    action: Handling
): Arbeidsflate => {
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
};

export default reducer;

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
    arbeidsflate.forEach(typeArbeidsflate =>
        verifyWindowObj() && domeneInneholder(typeArbeidsflate)
            ? settArbeidsflate(typeArbeidsflate)
            : verifyWindowObj()
            ? settPersonflate()
            : null
    );
    return settPersonflate();
};

const domeneInneholder = (key: any): boolean =>
    window.location.pathname.indexOf(key) !== -1 ||
    window.location.origin.indexOf(key) !== -1;

const settArbeidsflate = (key: string, isSessionKey: boolean = false) =>
    erArbeidsflate(
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

const erArbeidsflate = (
    key: string,
    isSessionKey: boolean = false,
    menuKeyValue: MenuValue,
    urlKeyvalue: UrlValue
): boolean => (isSessionKey && key === menuKeyValue) || key === urlKeyvalue;

export const settPersonflate = (): SettPrivatpersonAction => ({
    type: ActionType.PRIVATPERSON,
});

export const settArbeidsgiverflate = (): SettArbeidsgiverAction => ({
    type: ActionType.ARBEIDSGIVER,
});

export const settSamarbeidspartnerflate = (): SettSamarbeidspartnerAction => ({
    type: ActionType.SAMARBEIDSPARTNER,
});
