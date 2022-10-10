import React from 'react';
import './ArkiverKnapp.less';

type Props = {
    setIsHover: (setIsHover: boolean) => void;
};

const ArkiverKnapp = ({ setIsHover }: Props) => {
    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <button className="arkiver-btn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Arkiver
        </button>
    );
};

export default ArkiverKnapp;
