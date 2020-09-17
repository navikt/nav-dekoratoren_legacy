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

export interface Breadcrumb {
    url: string;
    title: string;
    handleInApp?: boolean;
}

interface Props {
    language: Locale;
    breadcrumbs: Breadcrumb[];
}

export const Brodsmulesti = (props: Props) => {
    const { environment } = useSelector((state: AppState) => state);
    const { XP_BASE_URL } = environment;
    const { breadcrumbs } = props;
    const cls = BEMHelper('brodsmulesti');
    const [showAll, setShowAll] = useState(false);
    const { status } = useSelector((state: AppState) => state.arbeidsflate);
    const arbeidsflate = getArbeidsflateContext(XP_BASE_URL, status);

    const slicedBreadcrumbs = showAll
        ? breadcrumbs
        : breadcrumbs.slice(breadcrumbs.length - 2);

    return (
        <div className={cls.element('container')}>
            <nav
                itemProp="breadcrumb"
                className={cls.element('content')}
                aria-label={finnTekst('brodsmulesti', props.language)}
            >
                <Normaltekst>
                    <Lenke href={XP_BASE_URL} className={cls.element('home')}>
                        <Bilde
                            asset={HomeIcon}
                            className={cls.element('icon')}
                        />
                        <span>nav.no</span>
                        <HoyreChevron />
                    </Lenke>
                </Normaltekst>
                <Normaltekst>
                    <Lenke href={arbeidsflate.url}>
                        <span>
                            <Tekst id={arbeidsflate.lenkeTekstId} />
                        </span>
                        <HoyreChevron />
                    </Lenke>
                </Normaltekst>
                {!showAll && breadcrumbs.length > 2 && (
                    <Lenke href={'#'} onClick={() => setShowAll(true)}>
                        <span>...</span>
                        <HoyreChevron />
                    </Lenke>
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
