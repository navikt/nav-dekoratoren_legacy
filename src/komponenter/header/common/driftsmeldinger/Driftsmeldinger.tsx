import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { DriftsmeldingerState } from '../../../../store/reducers/driftsmeldinger-duck';
import { verifyWindowObj } from '../../../../utils/Environment';
import './Driftsmeldinger.less';
import { BodyLong } from '@navikt/ds-react';

const removeTrailingChars = (url?: string) => url?.replace(/(\/|\$|(\/\$))$/, '');

const getCurrentDriftsmeldinger = (driftsmeldinger: DriftsmeldingerState) => {
    if (!verifyWindowObj()) {
        return [];
    }

    const currentUrl = removeTrailingChars(window.location.href);

    return driftsmeldinger.status === 'OK'
        ? driftsmeldinger.data.filter((melding) => {
              return (
                  !melding.urlscope ||
                  !currentUrl ||
                  melding.urlscope.length === 0 ||
                  melding.urlscope.some((rawUrl) => {
                      const url = removeTrailingChars(rawUrl);
                      return url && (rawUrl.endsWith('$') ? currentUrl === url : currentUrl.startsWith(url));
                  })
              );
          })
        : [];
};

export const Driftsmeldinger = () => {
    const { driftsmeldinger, environment } = useSelector((state: AppState) => state);

    const { XP_BASE_URL } = environment;

    const currentDriftsmeldinger = getCurrentDriftsmeldinger(driftsmeldinger);

    return currentDriftsmeldinger.length > 0 ? (
        <article className="driftsmeldinger">
            {currentDriftsmeldinger.map((melding) => (
                <LenkeMedSporing
                    key={melding.heading}
                    href={`${XP_BASE_URL}${melding.url}`}
                    classNameOverride="message"
                    analyticsEventArgs={{
                        category: AnalyticsCategory.Header,
                        action: 'driftsmeldinger',
                    }}
                >
                    <span className="message-icon">{melding.type && <Icon type={melding.type} />}</span>
                    <BodyLong className="message-text">{melding.heading}</BodyLong>
                </LenkeMedSporing>
            ))}
        </article>
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
            <g transform="translate(-164.000000, -106.000000)" fill="currentColor">
                <g transform="translate(164.000000, 106.000000)">
                    <path d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 Z M9,19 L9,17 L11,17 L11,12 L9,12 L9,10 L13,10 L13,17 L15,17 L15,19 L9,19 Z M12,5 C12.8284271,5 13.5,5.67157288 13.5,6.5 C13.5,7.32842712 12.8284271,8 12,8 C11.1715729,8 10.5,7.32842712 10.5,6.5 C10.5,5.67157288 11.1715729,5 12,5 Z" />
                </g>
            </g>
        </g>
    </svg>
);

const StatusSvg = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" role="img">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0a1 1 0 01.894.553l11 22A1 1 0 0123 24H1a1 1 0 01-.894-1.447l11-22A1 1 0 0112 0zm-1 15V8h2v7h-2zm2.5 3.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            fill="currentColor"
        />
    </svg>
);

export default Driftsmeldinger;
