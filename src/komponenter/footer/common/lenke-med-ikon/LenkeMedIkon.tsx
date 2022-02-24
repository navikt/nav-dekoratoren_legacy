import * as React from 'react';
import classnames from 'classnames';
import Lenke from 'nav-frontend-lenker';

import BEMHelper from 'utils/bem';

import './LenkeMedIkon.less';
import { Link } from '@navikt/ds-react';

interface Props {
    className?: string;
    href?: string;
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    ikon: JSX.Element;
    tekst: string | JSX.Element;
    venstrestiltIkon?: boolean;
    id?: string;
}

const LenkeMedIkon = ({ className, href = '#', onClick, ikon, tekst, venstrestiltIkon = false, id = '' }: Props) => {
    const cls = BEMHelper('lenke-med-ikon');
    return (
        <Link
            className={classnames(className, cls.className, {
                [cls.modifier('venstrestiltIkon')]: venstrestiltIkon,
            })}
            onClick={onClick}
            href={href}
            role="button"
            id={id}
        >
            <span>{tekst}</span>
            <span className={cls.element('ikon')}>{ikon}</span>
        </Link>
    );
};
export default LenkeMedIkon;
