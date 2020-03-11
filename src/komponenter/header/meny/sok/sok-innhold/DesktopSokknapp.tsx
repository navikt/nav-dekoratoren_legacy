import React from 'react';
import Tekst from '../../../../../tekster/finn-tekst';
import BEMHelper from '../../../../../utils/bem';

const DesktopSokknapp = () => {
    const cls = BEMHelper('sok-knapp');
    return (
        <div className="sok-knapper">
            <button className="sok-knapp sok-knapp-avbryt">
                <div className={cls.element('container')}>
                    <div className={cls.element('reset-line-x')} />
                    <div className={cls.element('reset-line-y')} />
                </div>
                <Tekst id="sok-reset" />
            </button>
            <button className="sok-knapp sok-knapp-submit" type="submit">
                <div className={cls.element('container')}>
                    <div className={cls.element('sok-circle')} />
                    <div className={cls.element('sok-line')} />
                </div>
                <Tekst id="sok-knapp" />
            </button>
        </div>
    );
};

export default DesktopSokknapp;
