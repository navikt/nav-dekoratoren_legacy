import React from 'react';
import { dittNavLenkeData } from '../../../../../../common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { LenkeMedSporing } from '../../../../../../common/lenke-med-sporing/LenkeMedSporing';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../../store/reducers';
import Tekst from '../../../../../../../tekster/finn-tekst';
import {
    ArbeidsflateLenke,
    arbeidsgiverContextLenke,
    samarbeidspartnerContextLenke,
} from '../../../../../../common/arbeidsflate-lenker/arbeidsflate-lenker';
import { Next } from '@navikt/ds-icons';
import { AnalyticsCategory } from '../../../../../../../utils/analytics/analytics';
import { MenuValue } from '../../../../../../../utils/meny-storage-utils';
import { CookieName, cookieOptions } from '../../../../../../../server/cookieSettings';
import { lukkAlleDropdowns } from '../../../../../../../store/reducers/dropdown-toggle-duck';
import { erNavDekoratoren } from '../../../../../../../utils/Environment';
import { settArbeidsflate } from '../../../../../../../store/reducers/arbeidsflate-duck';
import { useCookies } from 'react-cookie';
import { Heading } from '@navikt/ds-react';
import { MenyNode } from '../../../../../../../store/reducers/menu-duck';

import './MobilHovedmenyInnholdPrivat.less';

const stateSelector = (state: AppState) => ({
    dittNavUrl: state.environment.DITT_NAV_URL,
    xpBaseUrl: state.environment.XP_BASE_URL,
});

type Props = {
    setMenyliste: (event: React.MouseEvent<HTMLAnchorElement>, menyNode: MenyNode) => void;
    hovedmenyLenker: MenyNode;
};

export const MobilHovedmenyInnholdPrivat = ({ setMenyliste, hovedmenyLenker }: Props) => {
    const { dittNavUrl, xpBaseUrl } = useSelector(stateSelector);
    const dispatch = useDispatch();
    const [, setCookie] = useCookies();

    const dittNavLenke = dittNavLenkeData(dittNavUrl);
    const arbgiverLenke = arbeidsgiverContextLenke(xpBaseUrl);
    const samarbeidspartnerLenke = samarbeidspartnerContextLenke(xpBaseUrl);

    const analyticsArgs = {
        context: MenuValue.PRIVATPERSON,
        category: AnalyticsCategory.Meny,
        action: 'arbeidsflate-valg',
    };

    const onContextLink = (event: React.MouseEvent<HTMLAnchorElement>, lenke: ArbeidsflateLenke) => {
        setCookie(CookieName.DECORATOR_CONTEXT, lenke.key, cookieOptions);
        dispatch(lukkAlleDropdowns());
        if (erNavDekoratoren()) {
            event.preventDefault();
            dispatch(settArbeidsflate(lenke.key));
        }
    };

    return (
        <>
            <Heading level={'2'} size={'small'}>
                <LenkeMedSporing
                    className={'mobilPrivatHovedmenyLenke'}
                    href={'#'}
                    onClick={(e) => setMenyliste(e, { ...hovedmenyLenker, flatten: true })}
                >
                    <Tekst id={'how-can-we-help'} />
                    <Next />
                </LenkeMedSporing>
            </Heading>

            <LenkeMedSporing href={dittNavLenke.url} className={'mobilPrivatHovedmenyLenke'}>
                <Tekst id={'min-side-login'} />
                <Next />
            </LenkeMedSporing>

            <ul className={'mobilPrivatArbeidsflateValg'}>
                <li>
                    <LenkeMedSporing
                        href={arbgiverLenke.url}
                        analyticsEventArgs={{ ...analyticsArgs, label: MenuValue.ARBEIDSGIVER }}
                        onClick={(event) => {
                            onContextLink(event, arbgiverLenke);
                        }}
                        className={'mobilPrivatArbeidsflateLenke'}
                    >
                        <Tekst id={arbgiverLenke.lenkeTekstId} />
                    </LenkeMedSporing>
                </li>
                <li>
                    <LenkeMedSporing
                        href={samarbeidspartnerLenke.url}
                        analyticsEventArgs={{ ...analyticsArgs, label: MenuValue.SAMARBEIDSPARTNER }}
                        onClick={(event) => {
                            onContextLink(event, samarbeidspartnerLenke);
                        }}
                        className={'mobilPrivatArbeidsflateLenke'}
                    >
                        <Tekst id={samarbeidspartnerLenke.lenkeTekstId} />
                    </LenkeMedSporing>
                </li>
            </ul>
        </>
    );
};
