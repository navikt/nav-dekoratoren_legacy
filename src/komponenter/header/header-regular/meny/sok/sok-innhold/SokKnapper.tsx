import React from 'react';
import Tekst from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import './SokKnapper.less';

interface Props {
    writtenInput?: string;
    onReset: () => void;
}

const SokKnapper = (props: Props) => {
    const cls = BEMHelper('sok-knapper');
    return (
        <div className={cls.element('container')}>
            {props.writtenInput && (
                <button
                    type={'button'}
                    className={`${cls.element('knapp')} ${cls.element(
                        'knapp-avbryt'
                    )}`}
                    onClick={props.onReset}
                    id={'desktop-sok-reset-knapp'}
                >
                    <div className={cls.element('ikon-container')}>
                        <div className={cls.element('reset-line-x')} />
                        <div className={cls.element('reset-line-y')} />
                    </div>
                    <div className={cls.element('knapp-tekst')}>
                        <Tekst id="sok-reset" />
                    </div>
                </button>
            )}
            <button
                type="submit"
                className={`${cls.element('knapp')} ${cls.element(
                    'knapp-submit'
                )}`}
                id={'desktop-sok-submit-knapp'}
            >
                <div className={cls.element('ikon-container')}>
                    <div className={cls.element('sok-circle')} />
                    <div className={cls.element('sok-line')} />
                </div>
                <div className={cls.element('knapp-tekst')}>
                    <Tekst id="sok-knapp" />
                </div>
            </button>
        </div>
    );
};

export default SokKnapper;
