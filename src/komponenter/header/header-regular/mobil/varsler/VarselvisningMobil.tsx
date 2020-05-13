import React from 'react';
import BEMHelper from 'utils/bem';
import VarselVisning from './Varselvisning';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Tekst from 'tekster/finn-tekst';
import { useDispatch } from 'react-redux';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';
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
            className={cls
                .element('varsel-innhold', props.visvarsel ? 'active' : '')
                .concat(' ')
                .concat(cls.element('menuheight'))}
        >
            <Innholdstittel className={cls.element('varseltittel')}>
                <Tekst id="varsler-tittel" />
            </Innholdstittel>
            <VarselVisning tabIndex={props.tabindex} />
        </section>
    );
};

export default VarselvisningMobil;
