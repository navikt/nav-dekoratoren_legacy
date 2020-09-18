import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Lenke from 'nav-frontend-lenker';
import { Bilde } from '../../../common/bilde/Bilde';
import HomeIcon from 'ikoner/home.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { postMessageToApp } from 'utils/messages';
import { Locale } from 'store/reducers/language-duck';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import './Brodsmulesti.less';
import { getArbeidsflateContext } from '../../../common/arbeidsflate-lenker/arbeidsflate-lenker';
import { MenuValue } from '../../../../utils/meny-storage-utils';

export interface Breadcrumb {
    url: string;
    title: string;
    handleInApp?: boolean;
}

interface Props {
    breadcrumbs: Breadcrumb[];
}

export const Brodsmulesti = (props: Props) => {
    const { environment } = useSelector((state: AppState) => state);
    const { XP_BASE_URL } = environment;
    const cls = BEMHelper('brodsmulesti');
    const [showAll, setShowAll] = useState(false);
    const { status } = useSelector((state: AppState) => state.arbeidsflate);
    const { language } = useSelector((state: AppState) => state.language);
    const context = getArbeidsflateContext(XP_BASE_URL, status);
    const { breadcrumbs } = props;

    const isLanguageNorwegian =
        language === Locale.NYNORSK || language === Locale.BOKMAL;

    const slicedBreadcrumbs = showAll
        ? breadcrumbs
        : breadcrumbs.slice(breadcrumbs.length - 2);

    const homeUrlMap: { [key: string]: string } = {
        nb: `${XP_BASE_URL}`,
        nn: `${XP_BASE_URL}`,
        en: `${XP_BASE_URL}/en/home`,
        se: `${XP_BASE_URL}/se/samegiella`,
    };

    return (
        <div className={cls.element('container')}>
            <nav
                itemProp="breadcrumb"
                className={cls.element('content')}
                aria-label={finnTekst('brodsmulesti', language)}
            >
                <Normaltekst>
                    <Lenke
                        href={homeUrlMap[language]}
                        className={cls.element('home')}
                    >
                        <Bilde
                            asset={HomeIcon}
                            className={cls.element('icon')}
                        />
                        <span>nav.no</span>
                        <HoyreChevron />
                    </Lenke>
                </Normaltekst>
                {isLanguageNorwegian && (
                    <Normaltekst>
                        <Lenke href={context.url}>
                            <span>
                                <Tekst id={context.lenkeTekstId} />
                            </span>
                            <HoyreChevron />
                        </Lenke>
                    </Normaltekst>
                )}
                {!showAll && breadcrumbs.length > 2 && (
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
                )}
                {slicedBreadcrumbs.map((breadcrumb, i) => (
                    <Fragment key={i}>
                        <Normaltekst>
                            {i + 1 !== slicedBreadcrumbs.length ? (
                                breadcrumb.handleInApp ? (
                                    <Lenke
                                        href={breadcrumb.url}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            postMessageToApp(
                                                'breadcrumbClick',
                                                breadcrumb
                                            );
                                        }}
                                    >
                                        <span>{breadcrumb.title}</span>
                                        <HoyreChevron />
                                    </Lenke>
                                ) : (
                                    <Lenke href={breadcrumb.url}>
                                        <span>{breadcrumb.title}</span>
                                        <HoyreChevron />
                                    </Lenke>
                                )
                            ) : (
                                breadcrumb.title
                            )}
                        </Normaltekst>
                    </Fragment>
                ))}
            </nav>
        </div>
    );
};

export default Brodsmulesti;
