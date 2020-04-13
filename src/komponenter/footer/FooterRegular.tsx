import React, { Fragment } from 'react';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';

import './Footer.less';


const RegularFooter = () => {
    return (
        <Fragment>
            <FooterTopp />
            <FooterBottom />
        </Fragment>
    );
};

export default RegularFooter;
