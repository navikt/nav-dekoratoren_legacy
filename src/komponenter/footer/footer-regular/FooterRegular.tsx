import React, { Fragment, useEffect, useState } from 'react';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import { verifyWindowObj } from 'utils/Environment';
import checkIfContainsUrl from 'utils/url-filter/url-filter';
import Feedback from '../feedback/Feedback';

const FooterRegular = () => {
    const [showFeedback, setShowFeedback] = useState(false);

    const clientUrl = verifyWindowObj() ? window.location.href : '';

    useEffect(() => {
        if (checkIfContainsUrl(clientUrl)) {
            setShowFeedback(false);
        } else {
            setShowFeedback(true);
        }
    }, [clientUrl]);

    return (
        <Fragment>
            {showFeedback ? <Feedback /> : null}
            <FooterTopp />
            <FooterBottom />
        </Fragment>
    );
};

export default FooterRegular;
