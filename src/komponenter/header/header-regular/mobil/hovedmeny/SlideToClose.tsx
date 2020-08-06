import React from 'react';

interface Props {
    children: JSX.Element;
}
export const SlideToClose = ({ children }: Props) => {
    console.log('slide to close');

    const onTouchMove = () => {
        console.log('Touching');
    };

    return <div onTouchMove={onTouchMove}>{children}</div>;
};

export default SlideToClose;
