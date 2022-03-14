import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Link } from '@navikt/ds-react';
import { Bilde } from '../../../common/bilde/Bilde';
import HomeIcon from 'ikoner/home.svg';
import { HoyreChevron } from 'nav-frontend-chevron';
import { postMessageToApp } from 'utils/messages';
import { Locale } from 'store/reducers/language-duck';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import { getArbeidsflateContext } from '../../../common/arbeidsflate-lenker/arbeidsflate-lenker';
import './Brodsmulesti.less';

export interface Breadcrumb {
    url: string;
    title: string;
    handleInApp?: boolean;
}

interface Props {
    breadcrumbs: Breadcrumb[];
}

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

    const breadcrumbsCase = breadcrumbs.map((b) => ({
        ...b,
        title: b.title
            .split(' ')
            .map((title, i) => (!i ? `${title.charAt(0).toUpperCase() + title.slice(1)}` : `${title}`))
            .join(' '),
    }));
    const breadcrumbsSliced = showAll ? breadcrumbsCase : breadcrumbsCase.slice(breadcrumbsCase.length - 2);

    const homeUrlMap: { [key: string]: string } = {
        nb: `${XP_BASE_URL}`,
        nn: `${XP_BASE_URL}`,
        en: `${XP_BASE_URL}/en/home`,
        se: `${XP_BASE_URL}/se/samegiella`,
    };

    return (
        <nav className={cls.className} aria-label={finnTekst('brodsmulesti', language)} itemProp="breadcrumb">
            <ol>
                <li>
                    <Link href={homeUrlMap[language]} className={cls.element('home')}>
                        <Bilde asset={HomeIcon} className={cls.element('icon')} />
                        <span>nav.no</span>
                        <HoyreChevron />
                    </Link>
                </li>
                {isLanguageNorwegian && (
                    <li>
                        <Link href={context.url}>
                            <span>
                                <Tekst id={context.lenkeTekstId} />
                            </span>
                            <HoyreChevron />
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
                            <span>...</span>
                            <HoyreChevron />
                        </button>
                    </li>
                )}
                {breadcrumbsSliced.map((breadcrumb, i) => (
                    <li key={i} aria-current={i + 1 === breadcrumbsSliced.length && `page`}>
                        {i + 1 !== breadcrumbsSliced.length ? (
                            breadcrumb.handleInApp ? (
                                <Link
                                    href={breadcrumb.url}
                                    className={cls.element('transform')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        postMessageToApp('breadcrumbClick', breadcrumb);
                                    }}
                                >
                                    <span>{breadcrumb.title}</span>
                                    <HoyreChevron />
                                </Link>
                            ) : (
                                <Link href={breadcrumb.url} className={cls.element('transform')}>
                                    <span>{breadcrumb.title}</span>
                                    <HoyreChevron />
                                </Link>
                            )
                        ) : (
                            <span className={cls.element('transform')}>{breadcrumb.title}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Brodsmulesti;
