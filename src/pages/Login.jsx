import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../store/auth.store"

const Login = () => {
  const navigate = useNavigate()

  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      await login(formData)
      navigate("/")
    } catch (err) {
      setError(err.message || "Login failed")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-dark px-6">
      <div className="w-full max-w-md rounded-2xl border border-border-dark bg-surface-dark p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-neutral-100">Floww</h1>

          <p className="mt-2 text-sm text-text-dark-secondary">
            Welcome back! Sign in to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-text-dark">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-border-dark bg-background-dark-secondary px-4 py-3 text-text-dark placeholder:text-text-dark-secondary focus:border-primary-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-dark">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-border-dark bg-background-dark-secondary px-4 py-3 pr-16 text-text-dark placeholder:text-text-dark-secondary focus:border-primary-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-300 hover:text-neutral-100"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-10  p-3 text-sm text-neutral-100 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-primary-600 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-dark-secondary">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-500 hover:text-primary-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
