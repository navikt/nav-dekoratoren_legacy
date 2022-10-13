import React from 'react';
import classNames from 'classnames';

import 'komponenter/header/header-regular/mobil/meny/innhold/utils/UnstyledList.scss';

type Props = {
    children: React.ReactNode[];
} & React.HTMLAttributes<HTMLUListElement>;

export const UnstyledList = ({ children, className, ...ulAttribs }: Props) => {
    return (
        <ul {...ulAttribs} className={classNames('unstyledList', className)}>
            {children.map((element, index) => (
                <li key={index}>{element}</li>
            ))}
        </ul>
    );
};
