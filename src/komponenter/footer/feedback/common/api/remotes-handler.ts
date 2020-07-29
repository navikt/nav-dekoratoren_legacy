import { localhost, preprod } from './remotes'

export function chooseFeedbackNoRemote(hostName: string): string {
    return process.env.NODE_ENV === "development"
        ? localhost.feedback_no
        : preprod.feedback_no
}

export function chooseFeedbackReportRemote(hostName: string): string {
    return process.env.NODE_ENV === "development"
        ? localhost.feedback_report
        : preprod.feedback_report
} 
