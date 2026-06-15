import { useContext, useState } from "react"
import { AuthContext } from "../auth.context"
import { login, register, logout } from "../services/auth.api.js"

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)
    const [error, setError] = useState(null)

    const handleLogin = async({ email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } catch(err) {
            setError(err.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async({ username, email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch(err) {
            setError(err.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async() => {
        setLoading(true)
        setError(null)
        try {
            await logout()
            setUser(null)
        } catch(err) {
            setError(err.message || "Logout failed")
        } finally {
            setLoading(false)
        }
    }

    return {
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout
    }
}