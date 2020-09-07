import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from 'utils/bem';
import { Bilde } from '../../../common/bilde/Bilde';
import HomeIcon from 'ikoner/home.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { msgSafetyCheck, postMessageToApp } from 'utils/messages';
import './Brodsmulesti.less';

export interface Breadcrumb {
    url: string;
    title: string;
    handleInApp?: boolean;
}

export const Brodsmulesti = () => {
    const { environment } = useSelector((state: AppState) => state);
    const [breadcrumbs, setBreadcrumbs] = useState(
        environment.PARAMS.BREADCRUMBS
    );
    const { XP_BASE_URL } = environment;
    const cls = BEMHelper('brodsmulesti');

    useEffect(() => {
        const receiveMessage = (msg: MessageEvent) => {
            const { data } = msg;
            const isSafe = msgSafetyCheck(msg);
            const { source, event, payload } = data;
            if (isSafe) {
                if (source === 'decoratorClient' && event === 'breadcrumbs') {
                    setBreadcrumbs(payload);
                }
            }
        };
        window.addEventListener('message', receiveMessage, false);
        return () => {
            window.removeEventListener('message', receiveMessage, false);
        };
    }, []);

    return breadcrumbs ? (
        <div className={cls.element('container')}>
            <div className={cls.element('content')}>
                <Bilde asset={HomeIcon} />
                <Lenke href={XP_BASE_URL}>
                    <span>nav.no</span>
                    <HoyreChevron />
                </Lenke>
                {breadcrumbs.map((breadcrumb, i) => (
                    <Fragment key={i}>
                        {i + 1 !== breadcrumbs.length ? (
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
    ) : null;
};

export default Brodsmulesti;
