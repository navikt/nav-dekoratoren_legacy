import React from 'react';
import classNames from 'classnames';

import './UnstyledList.less';

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
