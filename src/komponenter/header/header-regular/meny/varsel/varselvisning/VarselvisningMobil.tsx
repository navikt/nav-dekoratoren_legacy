import React from 'react';
import BEMHelper from 'utils/bem';
import VarselVisning from './Varselvisning';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Tekst from 'tekster/finn-tekst';
import { useDispatch } from 'react-redux';
import { toggleVarselVisning } from 'store/reducers/dropdown-toggle-duck';
import './Varselvisning.less';

interface OwnProps {
    visvarsel: boolean;
    visningmenyClassname: string;
    tabindex: boolean;
}

const VarselvisningMobil = (props: OwnProps) => {
    const dispatch = useDispatch();
    const lukkVarsler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        dispatch(toggleVarselVisning());
    };
    const cls = BEMHelper(props.visningmenyClassname);
    return (
        <section
            className={cls.element(
                'varsel-innhold',
                props.visvarsel ? 'active' : ''
            )}
        >
            <div className={cls.element('varsel-wrapper')}>
                <Lenke
                    href="#https//nav.no/Lukk/varsler"
                    onClick={event => lukkVarsler(event)}
                    tabIndex={props.tabindex ? 0 : -1}
                >
                    <Undertittel>
                        <span className={cls.element('lukk-varsel')}>
                            <Tekst id="varsler-lukk-knapp" />
                        </span>
                    </Undertittel>
                </Lenke>
            </div>
            <Innholdstittel className={cls.element('varseltittel')}>
                <Tekst id="varsler-tittel" />
            </Innholdstittel>
            <VarselVisning tabIndex={props.tabindex} />
        </section>
    );
};

export default VarselvisningMobil;
