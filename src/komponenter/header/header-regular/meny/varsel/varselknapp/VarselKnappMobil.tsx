import React, { useEffect, useState } from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import Tekst from '../../../../../../tekster/finn-tekst';

interface Props {
    triggerVarsel: () => void;
    antallVarsel: number;
    varselIsOpen: boolean;
    tabIndex: boolean;
    clsName: string;
}

const VarselKnappMobil = (props: Props) => {
    const [animasjon, setAnimasjon] = useState<boolean>(false);
    useEffect(() => {
        setAnimasjon(props.varselIsOpen);
    }, [props.varselIsOpen]);

    const {
        triggerVarsel,
        antallVarsel,
        varselIsOpen,
        tabIndex,
        clsName,
    } = props;
    return (
        <div className="media-sm-mobil mobil-meny">
            <div id="toggle-varsler-container" className={clsName}>
                <Flatknapp
                    onClick={triggerVarsel}
                    className="varselknapp-mobil"
                    tabIndex={tabIndex ? 0 : -1}
                >
                    <div
                        className="toggle-varsler"
                        title="Varsler"
                        aria-label={`Varsler. Du har ${
                            antallVarsel > 0 ? antallVarsel : 'ingen'
                        } varsler.`}
                        aria-pressed={varselIsOpen}
                        aria-haspopup="true"
                        aria-controls="varsler-display"
                        aria-expanded={varselIsOpen}
                    />
                    <span className="word-wrapper">
                        <Normaltekst
                            className={!animasjon ? 'er-synlig' : 'er-usynlig'}
                        >
                            <Tekst id="varsler-mobil" />
                        </Normaltekst>

                        <Normaltekst
                            className={animasjon ? 'er-synlig' : 'er-usynlig'}
                        >
                            <Tekst id="varsler-mobil-lukk" />
                        </Normaltekst>
                    </span>
                </Flatknapp>
            </div>
        </div>
    );
};

export default VarselKnappMobil;
