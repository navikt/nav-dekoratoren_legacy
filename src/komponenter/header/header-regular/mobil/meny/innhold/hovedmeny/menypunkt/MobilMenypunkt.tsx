import React from 'react';
import { Heading } from '@navikt/ds-react';
import { LenkeMedSporing } from '../../../../../../../common/lenke-med-sporing/LenkeMedSporing';
import { Next } from '@navikt/ds-icons';
import { AnalyticsCategory, AnalyticsEventArgs } from '../../../../../../../../utils/analytics/analytics';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../../store/reducers';

import './MobilMenypunkt.less';

type Props = {
    analyticsEventArgs?: AnalyticsEventArgs;
    tekst: string;
} & (
    | {
          type: 'kategori';
          callback: () => void;
      }
    | {
          type: 'lenke';
          href: string;
          withLock?: boolean;
      }
);

export const MobilMenypunkt = (props: Props) => {
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);
    const { type, tekst, analyticsEventArgs } = props;

    const analyticsArgs: AnalyticsEventArgs = {
        context: arbeidsflate,
        category: AnalyticsCategory.Meny,
        action: `mobilmeny/${type}/${tekst}`,
        label: type === 'lenke' ? props.href : undefined,
        ...analyticsEventArgs,
    };

    const commonProps = {
        className: 'mobilMenyLenke',
        analyticsEventArgs: analyticsArgs,
    };

    const Children = () => (
        <>
            {tekst}
            <Next />
        </>
    );

    return type === 'kategori' ? (
        <Heading level={'2'} size={'small'}>
            <LenkeMedSporing
                {...commonProps}
                href={'#'}
                onClick={(e) => {
                    e.preventDefault();
                    props.callback();
                }}
                closeMenusOnClick={false}
            >
                <Children />
            </LenkeMedSporing>
        </Heading>
    ) : (
        <LenkeMedSporing {...commonProps} href={props.href} withLock={props.withLock} closeMenusOnClick={true}>
            <Children />
        </LenkeMedSporing>
    );
};
