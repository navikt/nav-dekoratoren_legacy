import React, { Fragment } from 'react';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import './FooterSimple.less';
import './Footer';

interface Props {
    className: string;
}

const SimpleFooter = ({ className }: Props) => {
    return (
        <Fragment>
            <FooterTopp classname={className} />
            <FooterBottom classname={className} />
        </Fragment>
    );
};

export default SimpleFooter;
