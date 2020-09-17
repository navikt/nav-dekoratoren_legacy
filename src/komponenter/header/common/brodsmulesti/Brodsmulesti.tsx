import React, { Fragment } from 'react';
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
    const cls = BEMHelper('brodsmulesti');
    const { status } = useSelector((state: AppState) => state.arbeidsflate);
    const arbeidsflate = getArbeidsflateContext(XP_BASE_URL, status);

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
                        <span>
                            <Tekst id={'forsiden'} />
                        </span>
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
                {props.breadcrumbs.map((breadcrumb, i) => (
                    <Fragment key={i}>
                        <Normaltekst>
                            {i + 1 !== props.breadcrumbs.length ? (
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
