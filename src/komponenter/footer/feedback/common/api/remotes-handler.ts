import { EnvironmentState } from 'store/reducers/environment-duck'

export function chooseFeedbackNoRemote(environment: EnvironmentState): string {
    let remote: string = ''

    if (process.env.NODE_ENV === 'development') {
        const { FEEDBACK_NO_LOCALHOST } = environment
        remote = FEEDBACK_NO_LOCALHOST
    } else {
        const { FEEDBACK_NO_PREPROD } = environment
        console.log("CFNR", FEEDBACK_NO_PREPROD)
        remote = FEEDBACK_NO_PREPROD
    }

    return remote;
}

export function chooseFeedbackReportRemote(environment: EnvironmentState): string {
    let remote: string = ''

    if (process.env.NODE_ENV === 'development') {
        const { FEEDBACK_REPORT_LOCALHOST } = environment
        remote = FEEDBACK_REPORT_LOCALHOST
    } else {
        const { FEEDBACK_REPORT_PREPROD } = environment
        remote = FEEDBACK_REPORT_PREPROD
    }

    return remote;
}