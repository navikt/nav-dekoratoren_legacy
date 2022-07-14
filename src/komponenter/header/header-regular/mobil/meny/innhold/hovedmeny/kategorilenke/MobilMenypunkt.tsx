import React from 'react';
import { Heading } from '@navikt/ds-react';
import { LenkeMedSporing } from '../../../../../../../common/lenke-med-sporing/LenkeMedSporing';
import classNames from 'classnames';
import { Next } from '@navikt/ds-icons';
import { AnalyticsEventArgs } from '../../../../../../../../utils/analytics/analytics';

import './MobilMenypunkt.less';

type Props = {
    analyticsEventArgs?: AnalyticsEventArgs;
    children: React.ReactNode;
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
    const { type, children, analyticsEventArgs } = props;

    return type === 'kategori' ? (
        <Heading level={'2'} size={'small'}>
            <LenkeMedSporing
                className={classNames('mobilMenyLenke')}
                href={'#'}
                onClick={(e) => {
                    e.preventDefault();
                    props.callback();
                }}
                closeMenusOnClick={false}
                analyticsEventArgs={analyticsEventArgs}
            >
                {children}
                <Next />
            </LenkeMedSporing>
        </Heading>
    ) : (
        <LenkeMedSporing
            className={classNames('mobilMenyLenke')}
            href={props.href}
            withLock={props.withLock}
            closeMenusOnClick={true}
            analyticsEventArgs={analyticsEventArgs}
        >
            {children}
            <Next />
        </LenkeMedSporing>
    );
};
