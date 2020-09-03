import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from 'utils/bem';
import { Bilde } from '../../../common/bilde/Bilde';
import HomeIcon from 'ikoner/home.svg';
import './Brodsmulesti.less';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';

export interface Breadcrumb {
    url: string;
    name: string;
}

export const Brodsmulesti = () => {
    const { environment } = useSelector((state: AppState) => state);
    const { XP_BASE_URL } = environment;
    const { BREADCRUMBS } = environment.PARAMS;
    const cls = BEMHelper('brodsmulesti');

    return BREADCRUMBS ? (
        <div className={cls.element('container')}>
            <Bilde asset={HomeIcon} />
            <Lenke href={XP_BASE_URL}>
                <Normaltekst>nav.no</Normaltekst>
            </Lenke>
            <HoyreChevron />
            {BREADCRUMBS.map((breadcrumb, i) => {
                return (
                    <>
                        <Lenke key={i} href={breadcrumb.url}>
                            {breadcrumb.name}
                        </Lenke>
                        <HoyreChevron />
                    </>
                );
            })}
        </div>
    ) : null;
};

export default Brodsmulesti;
