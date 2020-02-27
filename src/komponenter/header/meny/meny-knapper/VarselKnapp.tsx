import React from 'react';
import './VarselKnapp.less';
import BEMHelper from '../../../../utils/bem';
import { Element, Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../../tekster/finn-tekst';

const ikon = require('../../../../ikoner/varsler/alarm.svg');

type Props = {
    isOpen: boolean;
    className: string;
    handleClick: () => void;
    tabIndex: number;
    antallVarsler: number;
    children?: React.ReactNode;
};

export const VarselKnapp = ({ isOpen, antallVarsler, className, handleClick, tabIndex , children}: Props) => {
    const cls = BEMHelper('varselknapp');

    return (
        <div className={cls.element('container')}>
            <button
                onClick={handleClick}
                className={cls.element('button')}
                tabIndex={tabIndex}
                title="Varsler"
                aria-label={`Varsler. Du har ${
                    antallVarsler > 0 ? antallVarsler : 'ingen'
                } varsler.`}
                aria-pressed={isOpen}
                aria-haspopup="true"
                aria-controls="varsler-display"
                aria-expanded={isOpen}
            >
                <img alt={''} src={ikon} className={cls.element('bjelle')} />
                <div className={cls.element('tekst')}>
                    <Undertittel className={'varsler-tekst'}>
                        <Tekst id={'varsler'} />
                    </Undertittel>
                </div>
            </button>
        </div>
    );
};
