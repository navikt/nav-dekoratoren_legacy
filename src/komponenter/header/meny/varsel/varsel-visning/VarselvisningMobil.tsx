import React from 'react';
import './Varselvisning.less';
import BEMHelper from '../../../../../utils/bem';
import Lukkundermeny from '../../ekspanderbar-meny/mobil-visningsmeny/mobil-innhold/Lukkundermeny';
import TopSeksjon from '../../ekspanderbar-meny/mobil-visningsmeny/mobil-innhold/top-seksjon/Topseksjon';
import VarselVisning from './Varselvisning';

interface OwnProps {
    visvarsel: boolean;
    visningmenyClassname: string;
    lukkvarselmeny: () => void;
    lukkmenyene: () => void;
    viewIndex: boolean;
    clicked: boolean;
}

const VarselvisningMobil: React.FunctionComponent<OwnProps> = props => {
    const cls = BEMHelper(props.visningmenyClassname);
    const lukkvarselOgMenyer = () => {
        props.lukkvarselmeny();
        props.lukkmenyene();
    };

    return (
        <>
            <section
                id="varsler-display"
                className={cls.element(
                    'varsel-innhold',
                    props.visvarsel ? 'active' : ''
                )}
            >
                <TopSeksjon
                    lukkmeny={lukkvarselOgMenyer}
                    viewIndex={props.clicked}
                />
                <Lukkundermeny
                    lukkundermeny={props.lukkvarselmeny}
                    className={cls.className}
                    viewindex={props.viewIndex}
                />
                <VarselVisning className="vis-alle-lenke" />
            </section>
        </>
    );
};

export default VarselvisningMobil;
