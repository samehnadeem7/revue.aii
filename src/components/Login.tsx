import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function glassCardClass(extra?: string) {
  return [
    'rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg',
    extra ?? '',
  ].join(' ')
}

export default function Login() {
  const { login, isLoading: authLoading, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isLoading = authLoading || isSubmitting

  function validatePassword(password: string): string | null {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (errors.length > 0) {
      return errors.join(', ')
    }
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // Validate password format
      const passwordError = validatePassword(password)
      if (passwordError) {
        setError(passwordError)
        setIsSubmitting(false)
        return
      }

      await login(email)
    } catch (e: any) {
      setError(e?.message ? String(e.message) : 'Login failed')
      setIsSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-8">
          <span className="text-3xl font-bold text-white">REVUE. AI</span>
        </Link>

        {/* Login Card */}
        <div className={glassCardClass('p-8')}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Login</h1>
            <p className="text-sm text-white/65">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/85 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-white/40 focus:ring-2 focus:ring-white/15"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/85 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-white/40 focus:ring-2 focus:ring-white/15"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-white/30 bg-white/10 p-4 text-sm text-white/90">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={[
                'w-full rounded-xl px-5 py-4 text-sm font-semibold tracking-wide transition-all duration-300',
                'border border-white/10 shadow-lg overflow-hidden flex items-center justify-center gap-2',
                !isLoading
                  ? 'bg-gradient-to-r from-white/20 via-white/15 to-white/10 text-white group'
                  : 'cursor-not-allowed bg-white/5 text-white/40',
              ].join(' ')}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Logging in...</span>
                </>
              ) : (
                <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">
                  Login
                </span>
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white/65">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white font-semibold hover:text-white/80 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}