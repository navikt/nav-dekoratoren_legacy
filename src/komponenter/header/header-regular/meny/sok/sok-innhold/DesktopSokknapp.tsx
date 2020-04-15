import React from 'react';
import Tekst from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';

interface Props {
    writtenInput?: string;
    onReset: () => void;
}
const DesktopSokknapp = (props: Props) => {
    const cls = BEMHelper('desktop-sok');
    return (
        <div className={cls.element('knapper')}>
            {props.writtenInput && (
                <button
                    type={'button'}
                    className={`${cls.element('knapp')} ${cls.element(
                        'knapp-avbryt'
                    )}`}
                    onClick={props.onReset}
                >
                    <div className={cls.element('container')}>
                        <div className={cls.element('reset-line-x')} />
                        <div className={cls.element('reset-line-y')} />
                    </div>
                    <Tekst id="sok-reset" />
                </button>
            )}
            <button
                type="submit"
                className={`${cls.element('knapp')} ${cls.element(
                    'knapp-submit'
                )}`}
            >
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
