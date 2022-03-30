import React from 'react';
import BEMHelper from 'utils/bem';
import { analyticsEvent } from 'utils/analytics/analytics';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { toggleMinsidemeny } from 'store/reducers/dropdown-toggle-duck';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapp/MenylinjeKnapp';
import MinsideIkon from './minside-ikon/MinsideIkon';
import Tekst from 'tekster/finn-tekst';
import { AppState } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MenuValue } from 'utils/meny-storage-utils';
import './MinsideKnapp.less';

const stateSelector = (state: AppState) => ({
    brukernavn: state.innloggingsstatus.data.name,
    isOpen: state.dropdownToggles.minside,
});

type Props = {
    classname: string;
    id: string;
};

export const MinsidePersonKnapp = ({ classname, id }: Props) => {
    const dispatch = useDispatch();
    const { isOpen, brukernavn } = useSelector(stateSelector);

    const cls = BEMHelper(classname);

    const toggleMinSideDropdown = () => {
        analyticsEvent({
            context: MenuValue.PRIVATPERSON,
            category: AnalyticsCategory.Header,
            action: `minside-meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleMinsidemeny());
    };

    return (
        <MenylinjeKnapp
            onClick={toggleMinSideDropdown}
            isOpen={isOpen}
            ariaControls={classname}
            classname={classname}
            id={id}
        >
            <MinsideIkon isOpen={isOpen} hasMenu={true} />
            <span className={cls.element('knapp-tekst')}>
                <span
                    className={`${cls.element('knapp-tekst-topp')} ${
                        isOpen ? cls.element('knapp-tekst-topp', 'open') : ''
                    }`}
                >
                    <Tekst id={'min-side'} />
                </span>
                <span
                    className={`${cls.element('knapp-tekst-bunn')} ${
                        isOpen ? cls.element('knapp-tekst-bunn', 'open') : ''
                    }`}
                >
                    {brukernavn?.toLowerCase() || ''}
                </span>
            </span>
        </MenylinjeKnapp>
    );
};
