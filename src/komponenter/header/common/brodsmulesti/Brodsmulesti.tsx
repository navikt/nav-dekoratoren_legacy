import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Lenke from 'nav-frontend-lenker';
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
            .map((title, i) => {
                const exlude = ['NAV'];
                const lowercase = title.toLowerCase();
                const camelcase = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
                return exlude.some((word) => title.includes(word)) ? `${title}` : !i ? `${camelcase}` : `${lowercase}`;
            })
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
                <li className="typo-normal">
                    <Lenke href={homeUrlMap[language]} className={cls.element('home')}>
                        <Bilde asset={HomeIcon} className={cls.element('icon')} />
                        <span>nav.no</span>
                        <HoyreChevron />
                    </Lenke>
                </li>
                {isLanguageNorwegian && (
                    <li className="typo-normal">
                        <Lenke href={context.url}>
                            <span>
                                <Tekst id={context.lenkeTekstId} />
                            </span>
                            <HoyreChevron />
                        </Lenke>
                    </li>
                )}
                {!showAll && breadcrumbs.length > 2 && (
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
                {breadcrumbsSliced.map((breadcrumb, i) => (
                    <li key={i} className="typo-normal" aria-current={i + 1 === breadcrumbsSliced.length && `page`}>
                        {i + 1 !== breadcrumbsSliced.length ? (
                            breadcrumb.handleInApp ? (
                                <Lenke
                                    href={breadcrumb.url}
                                    className={cls.element('transform')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        postMessageToApp('breadcrumbClick', breadcrumb);
                                    }}
                                >
                                    <span>{breadcrumb.title}</span>
                                    <HoyreChevron />
                                </Lenke>
                            ) : (
                                <Lenke href={breadcrumb.url} className={cls.element('transform')}>
                                    <span>{breadcrumb.title}</span>
                                    <HoyreChevron />
                                </Lenke>
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
