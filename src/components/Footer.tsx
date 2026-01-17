import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success'>('idle')

  const handleScrollClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const section = document.getElementById(id)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const section = document.getElementById(id)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      // Send email to n8n webhook
      await fetch('https://gnosiss.app.n8n.cloud/webhook/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      setSubscribeStatus('success')
      setEmail('')

      // Reset after 3 seconds
      setTimeout(() => setSubscribeStatus('idle'), 3000)
    } catch (error) {
      console.error('Newsletter subscription failed:', error)
      // Optional: Handle error state here
    }
  }

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content - 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">REVUE. AI</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Transforming enterprise feedback into actionable foresight.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://www.linkedin.com/in/revue-ai-50b4963a6/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <svg className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://x.com/Revue_ai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <svg className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <svg className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Solution Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Solution</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/solution/feedback-analysis" className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block hover:-translate-y-0.5 transition-transform duration-300">Feedback Analysis</Link>
              </li>
              <li>
                <Link to="/solution/executive-reporting" className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block hover:-translate-y-0.5 transition-transform duration-300">Executive Reporting</Link>
              </li>
              <li>
                <Link to="/solution/webhook-integration" className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block hover:-translate-y-0.5 transition-transform duration-300">Webhook Integration</Link>
              </li>
              <li>
                <a href="#pricing" onClick={handleScrollClick('pricing')} className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block hover:-translate-y-0.5 transition-transform duration-300">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/company/about" className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block hover:-translate-y-0.5 transition-transform duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/company/documentation" className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block hover:-translate-y-0.5 transition-transform duration-300">Documentation</Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block hover:-translate-y-0.5 transition-transform duration-300">API Reference</Link>
              </li>
              <li>
                <Link to="/company/security" className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block hover:-translate-y-0.5 transition-transform duration-300">Security</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Waitlist/Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Stay Ahead</h4>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Join our enterprise waitlist for the latest in AI feedback intelligence.
            </p>

            {/* Email Input Form */}
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-white/40 text-sm outline-none focus:border-white/30 transition-colors duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={subscribeStatus === 'success'}
                className="w-full px-6 py-3 rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 text-white/80 font-semibold overflow-hidden group transition-all duration-300 hover:border-white/30"
              >
                {subscribeStatus === 'success' ? (
                  <span className="text-green-400">Joined!</span>
                ) : (
                  <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">Subscribe</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="border-t border-white/10 pt-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            {/* Left: Copyright */}
            <div className="text-white/60">
              © 2026 Revue.Ai. All rights reserved.
            </div>

            {/* Middle: Legal Links */}
            <div className="flex items-center gap-6">
              <Link to="/legal/privacy" className="text-white/60 hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link to="/legal/terms" className="text-white/60 hover:text-white transition-colors duration-300">Terms of Service</Link>
              <Link to="/legal/cookie" className="text-white/60 hover:text-white transition-colors duration-300">Cookie Policy</Link>
            </div>

            {/* Right: System Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="text-white/60">All systems operational</span>
            </div>
          </div>

          {/* Bottom Center: Hackathon Text */}
          <div className="text-center text-white/60 text-sm">
            Built for NxtWave X Open AI Hackathon 2026, scaling to enterprise soon.
          </div>
        </div>
      </div>
    </footer>
  )
}
