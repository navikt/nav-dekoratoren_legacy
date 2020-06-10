import React from 'react';
import BEMHelper from 'utils/bem';
import { Varselvisning } from 'komponenter/header/header-regular/desktop/varsler/varselvisning/Varselvisning';

interface OwnProps {
    visvarsel: boolean;
    visningmenyClassname: string;
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
            <Varselvisning />
        </section>
    );
};

export default VarselvisningMobil;
