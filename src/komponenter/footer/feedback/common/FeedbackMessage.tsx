import React, { useState, Fragment } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';

const FeedbackMessage = () => {
    const [feedbackMessage, setFeedbackMessage] = useState(String);
    
    return (
        <Fragment>
            <Textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                />
        </Fragment>
    );
};
