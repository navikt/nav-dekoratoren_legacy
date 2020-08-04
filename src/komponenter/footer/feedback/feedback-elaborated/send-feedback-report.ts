import { verifyWindowObj } from 'utils/Environment';
import amplitudeTriggers from 'utils/amplitude-triggers';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

function sendFeedbackReport(category: string): void {
    logAmplitudeEvent(amplitudeTriggers.rapporterKnapp, { svar: category });
}

export default sendFeedbackReport;
