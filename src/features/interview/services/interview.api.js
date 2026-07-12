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
        if(resumeFile) {
            formData.append("resume", resumeFile, resumeFile.name)
        }
        
        // FIX: Last se '/' hataya aur headers add kiye taaki mobile browser file crash na kare
        const response = await api.post("/api/interview", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
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
        const response = await api.get("/api/interview") // FIX: Trailing slash yahan se bhi hata diya
        return response.data
    } catch(err) {
        throw err.response?.data || err
    }
}

export const generateResumePdf = async ({ interviewReportId }) => {
    try {
        const response = await api.post(
            `/api/interview/resume/pdf/${interviewReportId}`,
            null,
            { responseType: "blob" }
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