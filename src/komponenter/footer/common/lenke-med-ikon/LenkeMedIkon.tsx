import * as React from 'react';
import classnames from 'classnames';
import Lenke from 'nav-frontend-lenker';

import BEMHelper from 'utils/bem';

import './LenkeMedIkon.less';

interface Props {
    className?: string;
    href?: string;
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    ikon: JSX.Element;
    tekst: string | JSX.Element;
    venstrestiltIkon?: boolean;
}

const LenkeMedIkon = ({ className, href = '#', onClick, ikon, tekst, venstrestiltIkon = false }: Props) => {
    const cls = BEMHelper('lenke-med-ikon');
    return (
        <Lenke
            className={classnames(className, cls.className, {
                [cls.modifier('venstrestiltIkon')]: venstrestiltIkon,
            })}
            onClick={onClick}
            href={href}
            role="button"
        >
            <span>{tekst}</span>
            <span className={cls.element('ikon')}>{ikon}</span>
        </Lenke>
    );
};
export default LenkeMedIkon;
