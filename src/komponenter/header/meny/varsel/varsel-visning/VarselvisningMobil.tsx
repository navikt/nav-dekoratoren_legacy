import React from 'react';
import { varselinnboksUrl } from '../../../../../api/api';
import './Varsel-visning.less';
import BEMHelper from '../../../../../utils/bem';
import Lukkundermeny from '../../dropdown-meny/mobil-visningsmeny/lukk-undermeny/Lukkundermeny';
import TopSeksjon from '../../dropdown-meny/mobil-visningsmeny/top-seksjon/Topseksjon';

interface OwnProps {
    html: Object;
    antallUlesteVarsler: number;
    antallVarsler: number;
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
                {props.html}
                {props.antallVarsler > 5 && (
                    <div className="vis-alle-lenke">
                        <a href={varselinnboksUrl}>
                            Vis alle dine varsler
                            {props.antallUlesteVarsler > 0
                                ? ` (${props.antallUlesteVarsler} nye)`
                                : ''}
                        </a>
                    </div>
                )}
            </section>
        </>
    );
};

export default VarselvisningMobil;
