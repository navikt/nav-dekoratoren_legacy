import amplitudeTriggers from 'utils/amplitude-triggers';
import { logAmplitudeEvent } from 'utils/amplitude';

function sendFeedbackNo(categories: string[]): void {
    for (const category of categories) {
        logAmplitudeEvent(amplitudeTriggers.neiKnapp, { svar: category });
    }
}

export default sendFeedbackNo;
