import React from 'react';
import { Heading } from '@navikt/ds-react';
import { LenkeMedSporing } from '../../../../../../../common/lenke-med-sporing/LenkeMedSporing';
import classNames from 'classnames';
import { Next } from '@navikt/ds-icons';

import './MobilMenyKategoriLenke.less';

type Props = {
    callback: () => void;
    children: React.ReactNode;
};

export const MobilMenyKategoriLenke = ({ callback, children }: Props) => {
    return (
        <Heading level={'2'} size={'small'}>
            <LenkeMedSporing
                className={classNames('mobilKategoriLenke')}
                href={'#'}
                onClick={(e) => {
                    e.preventDefault();
                    callback();
                }}
                closeMenusOnClick={false}
            >
                {children}
                <Next />
            </LenkeMedSporing>
        </Heading>
    );
};
