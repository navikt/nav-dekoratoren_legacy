import React from 'react';
import { analyticsEvent } from 'utils/analytics/analytics';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { toggleMinsidemeny } from 'store/reducers/dropdown-toggle-duck';
import classNames from 'classnames';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapp/MenylinjeKnapp';
import { AppState } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MenuValue } from 'utils/meny-storage-utils';
import { People, Expand } from '@navikt/ds-icons';

import style from './MinsidePersonKnapp.module.scss';

const stateSelector = (state: AppState) => ({
    brukernavn: state.innloggingsstatus.data.name,
    isOpen: state.dropdownToggles.minside,
});

type Props = {
    className: string;
    id: string;
    brukernavn: string;
};

export const MinsidePersonKnapp = ({ className, id, brukernavn }: Props) => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(stateSelector);

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
            ariaControls={className}
            classPrefix={className}
            id={id}
            icon={<People data-testid={'minside-person'} aria-hidden />}
        >
            <div className={style.brukernavn}>{brukernavn}</div>
            <div className={classNames(style.chevron, `${isOpen ? style.chevronOpen : ''}`)}>
                <Expand aria-hidden />
            </div>
        </MenylinjeKnapp>
    );
};
