import React from 'react';
import './HamburgerKnapp.less';

type Props = {
    isOpen: boolean,
    className?: string
}

const HamburgerKnapp = ({isOpen, className}: Props) => {
    return (
        <div className={`hamburger-knapp-container${className ? ` ${className}` : ''}`}>
            <div className={`hamburger-knapp${isOpen ? '--open' : ''}`} />
        </div>
    );
};

export default HamburgerKnapp;
