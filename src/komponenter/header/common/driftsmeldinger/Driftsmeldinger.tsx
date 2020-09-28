import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { DriftsmeldingerData } from 'store/reducers/driftsmeldinger-duck';
import { AnalyticsCategory } from 'utils/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import './Driftsmeldinger.less';

export const Driftsmeldinger = () => {
    const { driftsmeldinger, environment } = useSelector(
        (state: AppState) => state
    );

    const { XP_BASE_URL } = environment;
    const visDriftsmeldinger =
        driftsmeldinger.status === 'OK' && driftsmeldinger.data.length > 0;

    return visDriftsmeldinger ? (
        <section className="driftsmeldinger">
            <div>
                {driftsmeldinger.data.map((melding: DriftsmeldingerData) => {
                    return (
                        <LenkeMedSporing
                            key={melding.heading}
                            href={`${XP_BASE_URL}${melding.url}`}
                            classNameOverride="message"
                            analyticsEventArgs={{
                                category: AnalyticsCategory.Header,
                                action: 'driftsmeldinger',
                            }}
                        >
                            <span className="message-icon">
                                {melding.type && <Icon type={melding.type} />}
                            </span>
                            <Normaltekst className="message-text">
                                {melding.heading}
                            </Normaltekst>
                        </LenkeMedSporing>
                    );
                })}
            </div>
        </section>
    ) : null;
};

interface IconProps {
    type: string;
}

const Icon = (props: IconProps) => (
    <>
        {props.type === 'prodstatus' && <StatusSvg />}
        {props.type === 'info' && <InfoSvg />}
    </>
);

const InfoSvg = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
                transform="translate(-164.000000, -106.000000)"
                fill="currentColor"
            >
                <g transform="translate(164.000000, 106.000000)">
                    <path d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 Z M9,19 L9,17 L11,17 L11,12 L9,12 L9,10 L13,10 L13,17 L15,17 L15,19 L9,19 Z M12,5 C12.8284271,5 13.5,5.67157288 13.5,6.5 C13.5,7.32842712 12.8284271,8 12,8 C11.1715729,8 10.5,7.32842712 10.5,6.5 C10.5,5.67157288 11.1715729,5 12,5 Z" />
                </g>
            </g>
        </g>
    </svg>
);

const StatusSvg = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
                transform="translate(-222.000000, -106.000000)"
                fill="currentColor"
            >
                <g transform="translate(222.000000, 106.000000)">
                    <path d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 Z M12,16 C12.8284271,16 13.5,16.6715729 13.5,17.5 C13.5,18.3284271 12.8284271,19 12,19 C11.1715729,19 10.5,18.3284271 10.5,17.5 C10.5,16.6715729 11.1715729,16 12,16 Z M13,5 L13,14 L11,14 L11,5 L13,5 Z" />
                </g>
            </g>
        </g>
    </svg>
);

export default Driftsmeldinger;
