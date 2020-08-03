import { verifyWindowObj } from 'utils/Environment';
import amplitudeTriggers from 'utils/amplitude-triggers';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

function sendFeedbackNo(categories: string[]): void {
    for (let category of categories) {
        logAmplitudeEvent(amplitudeTriggers.neiKnapp, { svar: category });
    }
}

export default sendFeedbackNo;
