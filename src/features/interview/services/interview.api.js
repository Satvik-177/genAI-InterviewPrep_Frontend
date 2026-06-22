import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true
})

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    try {
        const formData = new FormData()
        formData.append("jobDescription", jobDescription)
        formData.append("selfDescription", selfDescription)
        formData.append("resume", resumeFile)

        const response = await api.post("/api/interview/", formData)
        return response.data
    } catch(err) {
        throw err.response?.data || err
    }
}

export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`)
        return response.data
    } catch(err) {
        throw err.response?.data || err
    }
}

export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview/")
        return response.data
    } catch(err) {
        throw err.response?.data || err
    }
}

export const generateResumePdf = async ({ interviewReportId }) => {
    try {
        const response = await api.post(
            `/api/interview/resume/pdf/${interviewReportId}`,
            null
        )
        return response.data
    } catch(err) {
        throw err.response?.data || err
    }
}

export const sendChatMessage = async ({ interviewId, message, history }) => {
    try {
        const response = await api.post(`/api/chat/${interviewId}`, {
            message,
            history
        })
        return response.data
    } catch(err) {
        throw err.response?.data || err
    }
}