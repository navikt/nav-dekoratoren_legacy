import { localhost, preprod } from './remotes'
import { erDev } from 'utils/Environment'

export function chooseFeedbackNoRemote(): string {
    return erDev
        ? localhost.feedback_no
        : preprod.feedback_no
}

export function chooseFeedbackReportRemote(): string {
    return erDev
        ? localhost.feedback_report
        : preprod.feedback_report
} 
