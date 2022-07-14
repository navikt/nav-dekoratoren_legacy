import React from 'react';

import './UnstyledList.less';
import classNames from 'classnames';

type Props = {
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLUListElement>;

export const UnstyledList = ({ children, className, ...ulAttribs }: Props) => {
    return (
        <ul {...ulAttribs} className={classNames('unstyledList', className)}>
            {children}
        </ul>
    );
};
