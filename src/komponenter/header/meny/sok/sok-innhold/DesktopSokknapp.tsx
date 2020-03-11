import React from 'react';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import Tekst from '../../../../../tekster/finn-tekst';
import BEMHelper from '../../../../../utils/bem';

const DesktopSokknapp = () => {
    const cls = BEMHelper('sok-meny-ikon');
    return (
        <div className="sok-knapper">
            <div className="sok-knapp sok-knapp-avbryt">
                <Knapp type="flat" onClick={() => console.log('Lol')}>
                    <div className={cls.element('container')}>
                        <div className={cls.element('circle')} />
                        <div className={cls.element('line')} />
                        <div className={cls.element('line-x')} />
                    </div>
                    <Tekst id="sok-reset" />
                </Knapp>
            </div>
            <div className="sok-knapp sok-knapp-submit">
                <Knapp type="flat" htmlType="submit">
                    <div className={cls.element('container')}>
                        <div className={cls.element('circle')} />
                        <div className={cls.element('line')} />
                        <div className={cls.element('line-x')} />
                    </div>
                    <Tekst id="sok-knapp" />
                </Knapp>
            </div>
        </div>
    );
};

export default DesktopSokknapp;
