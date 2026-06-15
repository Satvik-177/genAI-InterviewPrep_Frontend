import { useState } from "react"
import { sendChatMessage } from "../services/interview.api.js"
import "../style/chatbot.scss"

const ChatBot = ({ interviewId }) => {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hi! I can help you understand your interview report. Ask me anything!"
        }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if(!input.trim()) return

        const userMessage = { role: "user", content: input }
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput("")
        setLoading(true)

        try {
            const history = updatedMessages.slice(1) // system message hatao
            const data = await sendChatMessage({
                interviewId,
                message: input,
                history
            })

            setMessages(prev => [...prev, {
                role: "assistant",
                content: data.answer
            }])
        } catch(err) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Sorry, something went wrong. Please try again."
            }])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="chatbot">
            <div className="chatbot__header">
                <h3>Interview Assistant</h3>
                <span className="chatbot__status">● Online</span>
            </div>

            <div className="chatbot__messages">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`chatbot__message chatbot__message--${msg.role}`}
                    >
                        <span className="chatbot__bubble">{msg.content}</span>
                    </div>
                ))}
                {loading && (
                    <div className="chatbot__message chatbot__message--assistant">
                        <span className="chatbot__bubble">Thinking...</span>
                    </div>
                )}
            </div>

            <div className="chatbot__input">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your interview report..."
                    rows={2}
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatBot