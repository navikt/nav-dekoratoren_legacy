import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { LenkeMedSporing } from '../../../common/lenke-med-sporing/LenkeMedSporing';
import { Bilde } from '../../../common/bilde/Bilde';
import HomeIcon from 'ikoner/home.svg';
import { HoyreChevron } from 'nav-frontend-chevron';
import { postMessageToApp } from 'utils/messages';
import { Locale } from 'store/reducers/language-duck';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import { getArbeidsflateContext } from '../../../common/arbeidsflate-lenker/arbeidsflate-lenker';
import { AnalyticsCategory } from '../../../../utils/analytics';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import './Brodsmulesti.less';

export interface Breadcrumb {
    url: string;
    title: string;
    handleInApp?: boolean;
}

interface Props {
    breadcrumbs: Breadcrumb[];
}

const analyticsEventArgs = {
    category: AnalyticsCategory.Header,
    komponent: 'brødsmule',
};

const maxNumInitiallyShown = 3;

export const Brodsmulesti = (props: Props) => {
    const cls = BEMHelper('brodsmulesti');
    const { environment } = useSelector((state: AppState) => state);
    const { XP_BASE_URL } = environment;
    const [showAll, setShowAll] = useState(false);
    const { status } = useSelector((state: AppState) => state.arbeidsflate);
    const { language } = useSelector((state: AppState) => state.language);
    const context = getArbeidsflateContext(XP_BASE_URL, status);
    const { breadcrumbs } = props;
    const isLanguageNorwegian = language === Locale.NYNORSK || language === Locale.BOKMAL;

    const homeUrlMap: { [key: string]: string } = {
        nb: `${XP_BASE_URL}`,
        nn: `${XP_BASE_URL}`,
        en: `${XP_BASE_URL}/en/home`,
        se: `${XP_BASE_URL}/se/samegiella`,
    };

    const homeUrl = homeUrlMap[language];

    const breadcrumbsSliced = showAll ? breadcrumbs : breadcrumbs.slice(-maxNumInitiallyShown);

    return (
        <nav className={cls.className} aria-label={finnTekst('brodsmulesti', language)} itemProp="breadcrumb">
            <ol>
                <li className="typo-normal">
                    <LenkeMedSporing
                        href={homeUrl}
                        className={cls.element('link')}
                        analyticsEventArgs={{
                            ...analyticsEventArgs,
                            label: homeUrl,
                            action: 'nav.no',
                        }}
                    >
                        <Bilde asset={HomeIcon} className={cls.element('icon')} />
                        <span>nav.no</span>
                        <HoyreChevron />
                    </LenkeMedSporing>
                </li>
                {isLanguageNorwegian && context.key !== MenuValue.PRIVATPERSON && (
                    <li className="typo-normal">
                        <LenkeMedSporing
                            href={context.url}
                            className={cls.element('link')}
                            analyticsEventArgs={{
                                ...analyticsEventArgs,
                                label: context.url,
                                action: finnTekst(context.lenkeTekstId, language),
                            }}
                        >
                            <span>
                                <Tekst id={context.lenkeTekstId} />
                            </span>
                            <HoyreChevron />
                        </LenkeMedSporing>
                    </li>
                )}
                {!showAll && breadcrumbs.length > maxNumInitiallyShown && (
                    <li className="typo-normal">
                        <button
                            aria-label={finnTekst('brodsmulesti-se-alle', language)}
                            className={`${cls.element('view-all')} lenke`}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowAll(true);
                            }}
                        >
                            <span>...</span>
                            <HoyreChevron />
                        </button>
                    </li>
                )}
                {breadcrumbsSliced.map((breadcrumb, index, array) => (
                    <li key={index} className="typo-normal" aria-current={index + 1 === array.length && 'page'}>
                        {index + 1 !== array.length ? (
                            <LenkeMedSporing
                                href={breadcrumb.url}
                                className={cls.element('link')}
                                analyticsEventArgs={{
                                    ...analyticsEventArgs,
                                    label: breadcrumb.url,
                                    action: breadcrumb.title,
                                }}
                                onClick={(e) => {
                                    if (breadcrumb.handleInApp) {
                                        e.preventDefault();
                                        postMessageToApp('breadcrumbClick', breadcrumb);
                                    }
                                }}
                            >
                                <span className={cls.element('text')}>{breadcrumb.title}</span>
                                <HoyreChevron />
                            </LenkeMedSporing>
                        ) : (
                            <span className={cls.element('text')}>{breadcrumb.title}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Brodsmulesti;
