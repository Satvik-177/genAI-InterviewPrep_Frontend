import "../auth.form.scss"
import { useNavigate, Link, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Login = () => {
    const { loading, handleLogin, error, user } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const success = await handleLogin({ email, password })
        if(success) navigate("/")
    }

    if(loading) return <main><h1>Loading...</h1></main>
    if(user) return <Navigate to="/" />

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        className="button primary-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login