import { verifyWindowObj } from 'utils/Environment';

export default function loadHotjarSurvey(surveyName: string) {
    if (verifyWindowObj() && (window as any).hj) {
        (window as any).hj('trigger', surveyName);
    }
}
