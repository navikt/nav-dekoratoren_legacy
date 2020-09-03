import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import './Brodsmulesti.less';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../../../utils/bem';

export interface Breadcrumb {
    url: string;
    name: string;
}

export const Brodsmulesti = () => {
    const { environment } = useSelector((state: AppState) => state);
    const { BREADCRUMBS } = environment.PARAMS;
    const cls = BEMHelper('brodsmulesti');

    return BREADCRUMBS ? (
        <div className={cls.element('container')}>
            {BREADCRUMBS.map((breadcrumb, i) => {
                return (
                    <Lenke key={i} href={breadcrumb.url}>
                        {breadcrumb.name}
                    </Lenke>
                );
            })}
        </div>
    ) : null;
};

export default Brodsmulesti;
