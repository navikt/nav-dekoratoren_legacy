import React from 'react';
import Tekst from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import SokIkon from 'komponenter/header/header-regular/common/sok/sok-ikon/SokIkon';
import './SokKnapper.less';

interface Props {
    writtenInput?: string;
    onReset: () => void;
    id?: string;
}

const SokKnapper = ({ writtenInput, onReset, id }: Props) => {
    const cls = BEMHelper('sok-knapper');
    return (
        <div className={cls.element('container')}>
            {writtenInput && (
                <button
                    type={'button'}
                    id={id ? `${id}-reset` : undefined}
                    className={`${cls.element('knapp')} ${cls.element('knapp-avbryt')}`}
                    onClick={onReset}
                >
                    <span className={cls.element('ikon-container')}>
                        <SokIkon />
                    </span>
                    <span className={cls.element('knapp-tekst')}>
                        <Tekst id="sok-reset" />
                    </span>
                </button>
            )}
            <button
                type="submit"
                id={id ? `${id}-submit` : undefined}
                className={`${cls.element('knapp')} ${cls.element('knapp-submit')}`}
            >
                <span className={cls.element('ikon-container')}>
                    <SokIkon />
                </span>
                <span className={cls.element('knapp-tekst')}>
                    <Tekst id="sok-knapp" />
                </span>
            </button>
        </div>
    );
};

export default SokKnapper;
