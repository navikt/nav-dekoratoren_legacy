import React, { Fragment } from 'react';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import Feedback from '../feedback/Feedback';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

const FooterRegular = () => {
    const { PARAMS } = useSelector((state: AppState) => state.environment);

    return (
        <Fragment>
            {PARAMS.FEEDBACK && <Feedback />}
            <FooterTopp />
            <FooterBottom />
        </Fragment>
    );
};

export default FooterRegular;
