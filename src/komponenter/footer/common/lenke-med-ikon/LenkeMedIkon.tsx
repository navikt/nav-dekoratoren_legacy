import * as React from 'react';
import classnames from 'classnames';
import { Link } from '@navikt/ds-react';

import BEMHelper from 'utils/bem';

import './LenkeMedIkon.less';

interface Props {
    className?: string;
    href?: string;
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    ikon: JSX.Element;
    tekst: string | JSX.Element;
    venstrestiltIkon?: boolean;
    id?: string;
}

const LenkeMedIkon = ({ className, href = '#', onClick, ikon, tekst, venstrestiltIkon = false, id }: Props) => {
    const cls = BEMHelper('lenke-med-ikon');
    return (
        <Link
            className={classnames(className, cls.className, {
                [cls.modifier('venstrestiltIkon')]: venstrestiltIkon,
            })}
            onClick={onClick}
            href={href}
            id={id}
        >
            <span>{tekst}</span>
            <span className={cls.element('ikon')}>{ikon}</span>
        </Link>
    );
};
export default LenkeMedIkon;
