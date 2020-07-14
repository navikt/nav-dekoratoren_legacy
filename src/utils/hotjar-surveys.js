import { verifyWindowObj } from 'utils/Environment';

export default function loadHotjarSurvey(surveyName) {
    if (verifyWindowObj() && window.hj) {
        hj('trigger', surveyName);
    }
}
