import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import Tekst from 'tekster/finn-tekst';
import { analyticsEvent } from 'utils/analytics/analytics';
import BEMHelper from 'utils/bem';
import { ArbeidsflateLenke } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { Locale } from 'store/reducers/language-duck';
import { CookieName, cookieOptions } from '../../../server/cookieSettings';
import { erNavDekoratoren } from 'utils/Environment';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { finnTekst } from 'tekster/finn-tekst';
import { AnalyticsEventArgs } from 'utils/analytics/analytics';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import classNames from 'classnames';
import { Next } from '@navikt/ds-icons';

import './ArbeidsflateLenkepanel.less';

const cls = BEMHelper('arbeidsflate-lenkepanel');

interface Props {
    lenke: ArbeidsflateLenke;
    language: Locale;
    analyticsEventArgs: AnalyticsEventArgs;
    inverted?: boolean;
    enableCompactView?: boolean;
    id?: string;
    withDescription?: boolean;
}

const ArbeidsflateLenkepanel = ({
    lenke,
    language,
    analyticsEventArgs,
    enableCompactView,
    inverted,
    id,
    withDescription = true,
}: Props) => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies();

    return (
        <LinkPanel
            href={lenke.url}
            id={id}
            className={classNames(
                cls.className,
                inverted ? cls.modifier('inverted') : undefined,
                enableCompactView ? cls.modifier('compact') : undefined
            )}
            onClick={(event) => {
                setCookie(CookieName.DECORATOR_CONTEXT, lenke.key, cookieOptions);
                dispatch(lukkAlleDropdowns());
                if (erNavDekoratoren()) {
                    event.preventDefault();
                    dispatch(settArbeidsflate(lenke.key));
                }
                analyticsEvent(analyticsEventArgs);
            }}
            border={true}
        >
            <div>
                <LinkPanel.Title className={cls.element('text')}>
                    <Next className={'compact-chevron'} />
                    <Tekst id={lenke.lenkeTekstId} />
                </LinkPanel.Title>
                {withDescription && (
                    <LinkPanel.Description className={cls.element('text')}>
                        {finnTekst(lenke.stikkordId, language)}
                    </LinkPanel.Description>
                )}
            </div>
        </LinkPanel>
    );
};

export default ArbeidsflateLenkepanel;
