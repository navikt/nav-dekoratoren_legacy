import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Lenke from 'nav-frontend-lenker';
import { Bilde } from '../../../common/bilde/Bilde';
import HomeIcon from 'ikoner/home.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { postMessageToApp } from 'utils/messages';
import BEMHelper from 'utils/bem';
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
    const { environment } = useSelector((state: AppState) => state);
    const { XP_BASE_URL } = environment;
    const cls = BEMHelper('brodsmulesti');

    return (
        <div className={cls.element('container')}>
            <div className={cls.element('content')}>
                <Bilde asset={HomeIcon} />
                <Lenke href={XP_BASE_URL}>
                    <span>nav.no</span>
                    <HoyreChevron />
                </Lenke>
                {props.breadcrumbs.map((breadcrumb, i) => (
                    <Fragment key={i}>
                        {i + 1 !== props.breadcrumbs.length ? (
                            breadcrumb.handleInApp ? (
                                <a
                                    className={'lenke'}
                                    onClick={() =>
                                        postMessageToApp(
                                            'breadcrumbClick',
                                            breadcrumb
                                        )
                                    }
                                >
                                    <span>{breadcrumb.title}</span>
                                    <HoyreChevron />
                                </a>
                            ) : (
                                <Lenke key={i} href={breadcrumb.url}>
                                    <span>{breadcrumb.title}</span>
                                    <HoyreChevron />
                                </Lenke>
                            )
                        ) : (
                            <Normaltekst>{breadcrumb.title}</Normaltekst>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default Brodsmulesti;
