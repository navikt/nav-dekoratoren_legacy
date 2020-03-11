import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import VarselVisning from './Varselvisning';
import TopSeksjon from '../../ekspanderende-menyer/hovedmeny-mobil/meny-dropdown/mobil-innhold/top-seksjon/Topseksjon';
import './Varselvisning.less';

interface OwnProps {
    visvarsel: boolean;
    visningmenyClassname: string;
    tabindex: boolean;
}

const VarselvisningMobil = (props: OwnProps) => {
    const cls = BEMHelper(props.visningmenyClassname);
    return (
        <section
            className={cls.element(
                'varsel-innhold',
                props.visvarsel ? 'active' : ''
            )}
        >
            <TopSeksjon tabindex={props.tabindex} />
            <VarselVisning tabIndex={props.tabindex} />
        </section>
    );
};

export default VarselvisningMobil;
