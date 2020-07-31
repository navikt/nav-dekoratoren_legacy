import { EnvironmentState } from 'store/reducers/environment-duck'
import { erDev } from 'utils/Environment'

export function chooseFeedbackNoRemote(environment: EnvironmentState): string {
    if (erDev) {
        const { FEEDBACK_NO_LOCALHOST } = environment
        return FEEDBACK_NO_LOCALHOST
    } else {
        const { FEEDBACK_NO_PREPROD } = environment
        console.log('CFNR', FEEDBACK_NO_PREPROD)

        return FEEDBACK_NO_PREPROD
    }
}

export function chooseFeedbackReportRemote(environment: EnvironmentState): string {
    if (erDev) {
        const { FEEDBACK_REPORT_LOCALHOST } = environment
        return FEEDBACK_REPORT_LOCALHOST
    } else {
        const { FEEDBACK_REPORT_PREPROD } = environment
        return FEEDBACK_REPORT_PREPROD
    }
}