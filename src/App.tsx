import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import DecisionIntelligence from './components/DecisionIntelligence'
import ChatbotWidget from './components/ChatbotWidget'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import FeaturePage from './components/FeaturePage'
import InfoPage from './components/InfoPage'
import CookieConsent from './components/CookieConsent'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AuthProvider>
        <ChatbotWidget />
        <CookieConsent />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Solutions Routes */}
          <Route
            path="/solution/feedback-analysis"
            element={
              <FeaturePage
                title="Feedback Analysis"
                subtitle="Transform noise into signal."
                description="Our AI engine processes thousands of data points from CSVs, PDFs, and text to identify patterns, sentiments, and actionable insights. Stop guessing and start knowing what your users truly feel."
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              />
            }
          />
          <Route
            path="/solution/executive-reporting"
            element={
              <FeaturePage
                title="Executive Reporting"
                subtitle="Board-ready insights in seconds."
                description="Generate PDF reports that summarize thousands of feedback items into clear strategic directives. Perfect for sharing with leadership, stakeholders, or your product team."
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
            }
          />
          <Route
            path="/solution/webhook-integration"
            element={
              <FeaturePage
                title="Webhook Integration"
                subtitle="Real-time data pipelines."
                description="Connect Revue.Ai directly to your existing tools. Our secure webhook infrastructure ensures that as soon as feedback arrives—whether from a form, an app, or a support ticket—it gets analyzed instantly."
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
            }
          />

          {/* Company Routes */}
          <Route
            path="/company/about"
            element={
              <InfoPage
                title="About Us"
                content={
                  <div className="space-y-6">
                    <p>Revue.Ai is built for the NxtWave X Open AI Hackathon 2026. Our mission is to bridge the gap between raw customer feedback and high-level business strategy.</p>
                    <p>We believe that in the age of AI, no company should struggle to understand its users. By leveraging advanced LLMs and orchestration workflows, we turn the chaotic voice of the customer into a clear blueprint for growth.</p>
                  </div>
                }
              />
            }
          />
          <Route
            path="/company/documentation"
            element={
              <InfoPage
                title="Documentation"
                content={
                  <div className="space-y-6">
                    <h3>Getting Started</h3>
                    <p>Welcome to the Revue.Ai developer docs. Here you'll find everything you need to integrate our decision intelligence engine into your workflow.</p>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <code className="text-white/80">Current Version: v1.0.0 (Beta)</code>
                    </div>
                    <p>Refer to our <a href="#" className="text-indigo-400 hover:text-indigo-300">API Reference</a> for endpoint details.</p>
                  </div>
                }
              />
            }
          />
          <Route
            path="/company/security"
            element={
              <InfoPage
                title="Security"
                updatedAt="Jan 2026"
                content={
                  <div className="space-y-6">
                    <p>Your data security is our top priority. We employ enterprise-grade encryption for all data in transit and at rest.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>SOC 2 Type II Compliant Infrastructure (Pending)</li>
                      <li>End-to-end SSL/TLS Encryption</li>
                      <li>Regular Penetration Testing</li>
                      <li>Data Isolation for Enterprise Tenants</li>
                    </ul>
                  </div>
                }
              />
            }
          />

          {/* Legal Routes */}
          <Route
            path="/legal/privacy"
            element={
              <InfoPage
                title="Privacy Policy"
                updatedAt="January 16, 2026"
                content={
                  <div className="space-y-6">
                    <p><strong>1. Information We Collect</strong><br />We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or request customer support.</p>
                    <p><strong>2. How We Use Information</strong><br />We use the information we collect to provide, maintain, and improve our services, develop new ones, and protect Revue.Ai and our users.</p>
                    <p><strong>3. Data Retention</strong><br />We store the information we collect for as long as it is necessary for the purpose(s) for which we originally collected it.</p>
                  </div>
                }
              />
            }
          />
          <Route
            path="/legal/terms"
            element={
              <InfoPage
                title="Terms of Service"
                updatedAt="January 16, 2026"
                content={
                  <div className="space-y-6">
                    <p><strong>1. Acceptance of Terms</strong><br />By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access the services.</p>
                    <p><strong>2. Use of Services</strong><br />You may use our services only as permitted by law, including applicable export and re-export control laws and regulations.</p>
                    <p><strong>3. Termination</strong><br />We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                  </div>
                }
              />
            }
          />
          <Route
            path="/legal/cookie"
            element={
              <InfoPage
                title="Cookie Policy"
                updatedAt="January 16, 2026"
                content={
                  <div className="space-y-6">
                    <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.</p>
                    <h3>Types of Cookies We Use</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., authentication).</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the website.</li>
                    </ul>
                  </div>
                }
              />
            }
          />

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-dark-blue relative overflow-hidden">
                  {/* Grid Pattern Background */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px',
                    }}
                  />
                  {/* Radial Gradients for Glow Effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                  </div>
                  <div className="relative z-10 flex flex-col min-h-screen">
                    <Navbar />
                    <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-10 flex-1">
                      <DecisionIntelligence />
                    </div>
                    <Footer />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <div className="min-h-screen bg-dark-blue relative overflow-hidden">
                {/* Grid Pattern Background */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }}
                />
                {/* Radial Gradients for Glow Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                  <Navbar />
                  <Login />
                  <Footer />
                </div>
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="min-h-screen bg-dark-blue relative overflow-hidden">
                {/* Grid Pattern Background */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }}
                />
                {/* Radial Gradients for Glow Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                  <Navbar />
                  <Signup />
                  <Footer />
                </div>
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

