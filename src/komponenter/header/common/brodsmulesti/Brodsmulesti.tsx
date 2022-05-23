import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Link } from '@navikt/ds-react';
import { Bilde } from '../../../common/bilde/Bilde';
import HomeIcon from 'ikoner/home.svg';
import { Next } from '@navikt/ds-icons';
import { postMessageToApp } from 'utils/messages';
import { Locale } from 'store/reducers/language-duck';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import { getArbeidsflateContext } from '../../../common/arbeidsflate-lenker/arbeidsflate-lenker';
import { AnalyticsCategory } from '../../../../utils/analytics/analytics';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import { getHomeUrl } from '../../../../utils/home-url';
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

    const homeUrl = getHomeUrl(XP_BASE_URL, language);

    const isLanguageNorwegian =
        language === Locale.NYNORSK || language === Locale.BOKMAL || language === Locale.IKKEBESTEMT;
    const shouldShowContext = isLanguageNorwegian && context.key !== MenuValue.PRIVATPERSON;
    const numCustomItemsShown = shouldShowContext ? maxNumInitiallyShown - 1 : maxNumInitiallyShown;

    const breadcrumbsSliced = showAll ? breadcrumbs : breadcrumbs.slice(-numCustomItemsShown);

    return (
        <nav className={cls.className} aria-label={finnTekst('brodsmulesti', language)} itemProp="breadcrumb">
            <ol>
                <li>
                    <Link href={homeUrl} className={cls.element('home')}>
                        <Bilde asset={HomeIcon} className={cls.element('icon')} />
                        <span>nav.no</span>
                        <Next className={cls.element('next')} />
                    </Link>
                </li>
                {isLanguageNorwegian && (
                    <li>
                        <Link href={context.url}>
                            <span>
                                <Tekst id={context.lenkeTekstId} />
                            </span>
                            <Next className={cls.element('next')} />
                        </Link>
                    </li>
                )}
                {!showAll && breadcrumbs.length > 2 && (
                    <li>
                        <button
                            aria-label={finnTekst('brodsmulesti-se-alle', language)}
                            className={`${cls.element('view-all')} lenke`}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowAll(true);
                            }}
                        >
                            <span className={cls.element('pathAbbrevation')}>...</span>
                            <Next className={cls.element('next')} />
                        </button>
                    </li>
                )}
                {breadcrumbsSliced.map((breadcrumb, i) => (
                    <li key={i} aria-current={i + 1 === breadcrumbsSliced.length && `page`}>
                        {(() => {
                            if (i + 1 !== breadcrumbsSliced.length) {
                                if (breadcrumb.handleInApp) {
                                    return (
                                        <Link
                                            href={breadcrumb.url}
                                            className={cls.element('transform')}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                postMessageToApp('breadcrumbClick', breadcrumb);
                                            }}
                                        >
                                            <span>{breadcrumb.title}</span>
                                            <Next className={cls.element('next')} />
                                        </Link>
                                    );
                                } else {
                                    return (
                                        <Link href={breadcrumb.url} className={cls.element('transform')}>
                                            <span>{breadcrumb.title}</span>
                                            <Next className={cls.element('next')} />
                                        </Link>
                                    );
                                }
                            } else {
                                return <span className={cls.element('transform')}>{breadcrumb.title}</span>;
                            }
                        })()}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Brodsmulesti;
