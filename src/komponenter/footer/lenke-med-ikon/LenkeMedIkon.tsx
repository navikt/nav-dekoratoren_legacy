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

const LenkeMedIkon: React.StatelessComponent<Props> = ({
    className,
    href = '#',
    onClick,
    ikon,
    tekst,
    venstrestiltIkon = false,
}) => {
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
            <div className={cls.element('ikon')}>{ikon}</div>
        </Lenke>
    );
};
export default LenkeMedIkon;
