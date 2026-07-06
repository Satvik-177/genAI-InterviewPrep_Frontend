import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById,
    generateResumePdf
} from "../services/interview.api.js"
import { useContext, useState } from "react"
import { InterviewContext } from "../interview.context.jsx"

export const useInterview = () => {
    const context = useContext(InterviewContext)

    if(!context) {
        return {
            loading: false,
            error: null,
            report: null,
            reports: [],
            generateReport: () => {},
            getReportById: () => {},
            getReports: () => {},
            getResumePdf: () => {}
        }
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context
    const [error, setError] = useState(null)

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        setError(null)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            const result = response.interviewReport
            setReport(result)
            return result
        } catch(err) {
            const msg = err?.message || JSON.stringify(err) || "Failed to generate report"
            setError(msg)
            throw new Error(msg)
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        setError(null)
        let result = null
        try {
            const response = await getInterviewReportById(interviewId)
            result = response.interviewReport
            setReport(result)
        } catch(err) {
            setError(err.message || "Failed to fetch report")
        } finally {
            setLoading(false)
        }
        return result
    }

    const getReports = async () => {
        setLoading(true)
        setError(null)
        let result = null
        try {
            const response = await getAllInterviewReports()
            result = response.interviewReports
            setReports(result)
        } catch(err) {
            setError(err.message || "Failed to fetch reports")
        } finally {
            setLoading(false)
        }
        return result
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        setError(null)
        try {
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(
                new Blob([response], { type: "application/pdf" })
            )
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch(err) {
            setError(err.message || "Failed to generate PDF")
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    }
}