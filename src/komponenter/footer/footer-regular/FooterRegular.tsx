import React, { Fragment } from 'react';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import Feedback from '../feedback/Feedback';

const FooterRegular = () => {
    return (
        <Fragment>
            <Feedback /> 
            <FooterTopp />
            <FooterBottom />
        </Fragment>
    );
};

export default FooterRegular;
