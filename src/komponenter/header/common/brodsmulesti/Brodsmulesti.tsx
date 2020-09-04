import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from 'utils/bem';
import { Bilde } from '../../../common/bilde/Bilde';
import HomeIcon from 'ikoner/home.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import './Brodsmulesti.less';

export interface Breadcrumb {
    url: string;
    name: string;
}

export const Brodsmulesti = () => {
    const { environment } = useSelector((state: AppState) => state);
    const [breadcrumbs, setBreadcrumbs] = useState(
        environment.PARAMS.BREADCRUMBS
    );
    const { XP_BASE_URL } = environment;
    const cls = BEMHelper('brodsmulesti');

    useEffect(() => {
        const receiveMessage = ({ data }: MessageEvent) => {
            const { source, event, payload } = data;
            if (source === 'decorator' && event === 'breadcrumbs') {
                setBreadcrumbs(payload);
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
                    <Normaltekst>nav.no</Normaltekst>
                </Lenke>
                <HoyreChevron />
                {breadcrumbs.map((breadcrumb, i) => (
                    <Fragment key={i}>
                        {i + 1 !== breadcrumbs.length ? (
                            <Lenke key={i} href={breadcrumb.url}>
                                {breadcrumb.name}
                                <HoyreChevron />
                            </Lenke>
                        ) : (
                            <Normaltekst>{breadcrumb.name}</Normaltekst>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    ) : null;
};

export default Brodsmulesti;
