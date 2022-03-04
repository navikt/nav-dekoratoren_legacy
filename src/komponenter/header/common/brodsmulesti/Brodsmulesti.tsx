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

const getHomeUrl = (origin: string, language: Locale) =>
    ({
        [Locale.BOKMAL]: origin,
        [Locale.NYNORSK]: origin,
        [Locale.IKKEBESTEMT]: origin,
        [Locale.ENGELSK]: `${origin}/en/home`,
        [Locale.POLSK]: `${origin}/en/home`,
        [Locale.SAMISK]: `${origin}/se/samegiella`,
    }[language]);

export const Brodsmulesti = (props: Props) => {
    const cls = BEMHelper('brodsmulesti');
    const { environment } = useSelector((state: AppState) => state);
    const { XP_BASE_URL } = environment;
    const [showAll, setShowAll] = useState(false);
    const { status } = useSelector((state: AppState) => state.arbeidsflate);
    const { language } = useSelector((state: AppState) => state.language);
    const context = getArbeidsflateContext(XP_BASE_URL, status);
    const { breadcrumbs } = props;

    const homeUrl = getHomeUrl(XP_BASE_URL, language);

    const isLanguageNorwegian =
        language === Locale.NYNORSK || language === Locale.BOKMAL || language === Locale.IKKEBESTEMT;
    const shouldShowContext = isLanguageNorwegian && context.key !== MenuValue.PRIVATPERSON;
    const numCustomItemsShown = shouldShowContext ? maxNumInitiallyShown - 1 : maxNumInitiallyShown;

    const breadcrumbsSliced = showAll ? breadcrumbs : breadcrumbs.slice(-numCustomItemsShown);

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
                {shouldShowContext && (
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
                {!showAll && breadcrumbs.length > numCustomItemsShown && (
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
