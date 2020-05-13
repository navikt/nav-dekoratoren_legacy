import MenylinjeKnapp from '../MenylinjeKnapp';
import { VarselIkon } from '../ikoner/varsel-ikon/VarselIkon';
import Tekst from 'tekster/finn-tekst';
import React from 'react';
import { settVarslerSomLest } from 'store/reducers/varsel-lest-duck';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import './VarslerKnapp.less';

type Props = {
    id?: string;
};

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
    varsler: state.varsler.data,
    appBaseUrl: state.environment.APP_BASE_URL,
});

export const VarslerKnapp = ({ id }: Props) => {
    const { isOpen, varsler, appBaseUrl } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const onClick = () => {
        if (!isOpen && varsler.uleste > 0) {
            settVarslerSomLest(appBaseUrl, varsler.nyesteId, dispatch);
        }
        gaEvent({
            category: GACategory.Header,
            action: `varsler-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleVarsler());
    };

    const ariaLabel = `Varsler. Du har ${
        varsler.antall > 0 ? varsler.antall : 'ingen'
    } varsler.`;

    return (
        <MenylinjeKnapp
            onClick={onClick}
            isOpen={isOpen}
            classname={'varselbjelle'}
            id={id}
            ariaLabel={ariaLabel}
        >
            <VarselIkon isOpen={isOpen} antallUleste={varsler.uleste} />
            <Undertittel className={'varselbjelle__tekst'}>
                <Tekst id={'varsler-tittel'} />
            </Undertittel>
        </MenylinjeKnapp>
    );
};
