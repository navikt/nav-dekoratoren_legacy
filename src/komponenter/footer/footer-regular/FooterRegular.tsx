import React, { Fragment, useEffect, useState } from 'react';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import { verifyWindowObj } from 'utils/Environment';
import checkIfContainsUrl from 'utils/url-filter/url-filter';
import Feedback from '../feedback/Feedback';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

const FooterRegular = () => {
    const [showFeedback, setShowFeedback] = useState(false);

    const clientUrl = verifyWindowObj() ? window.location.href : '';

    const { PARAMS } = useSelector(
        (state: AppState) => state.environment
    );

    useEffect(() => {
        if (checkIfContainsUrl(clientUrl)) {
            setShowFeedback(true);
        } else {
            setShowFeedback(false);
        }
        console.log('Param Feedback: ', PARAMS.FEEDBACK);
    }, [clientUrl]);

    return (
        <Fragment>
            {PARAMS.FEEDBACK && <Feedback />}
            <FooterTopp />
            <FooterBottom />
        </Fragment>
    );
};

export default FooterRegular;
