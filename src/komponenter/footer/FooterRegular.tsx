import React, { Fragment } from 'react';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import './Footer.less';

interface Props {
    className: string;
}

const RegularFooter = ({ className }: Props) => {
    return (
        <Fragment>
            <FooterTopp classname={className} />
            <FooterBottom classname={className} />
        </Fragment>
    );
};

export default RegularFooter;
