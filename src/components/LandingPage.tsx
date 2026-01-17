import { useNavigate } from 'react-router-dom'
import DashboardPreview from './DashboardPreview'
import Navbar from './Navbar'
import Footer from './Footer'
import TeamCredits from './TeamCredits'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
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
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Turn Customer Voice into Business Vision.
            </h1>

            {/* Description */}
            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
              Revue.Ai is the intelligent bridge between customer feedback and business strategy. Submit reviews, unlock hidden patterns through AI analysis, and export professional reports designed for your leadership team.
            </p>

            {/* Call-to-Action Button */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/app')}
                className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-white/20 via-white/15 to-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold overflow-hidden group transition-all duration-300 hover:from-white/25 hover:via-white/20 hover:to-white/15 shadow-lg"
              >
                <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">Get started</span>
              </button>
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <div className="flex justify-center lg:justify-end">
            <DashboardPreview />
          </div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24">
        {/* Section 1: Why Revue.Ai? */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side */}
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                From raw feedback to strategic foresight.
              </h2>
            </div>

            {/* Right Side */}
            <div className="space-y-6 pt-8 lg:pt-16">
              <h3 className="text-3xl font-semibold text-white uppercase">
                WHY REVUE.AI?
              </h3>
              <p className="text-lg text-white/70 leading-relaxed">
                In the enterprise world, feedback is everywhere, but insight is rare. Most businesses are drowning in data but starving for actionable truth. We built Revue.Ai to act as an intelligent filter—stripping away the noise and highlighting the specific sentiments that drive growth, retention, and product innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Process */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Process
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ingest Card */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 transition-all duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <h4 className="text-2xl font-semibold text-white mb-3">
                  Ingest
                </h4>
              </div>
              <p className="text-white/70 leading-relaxed">
                Collect feedback from multiple sources through our secure, persistent webhook integration. Your data flows seamlessly into our system with enterprise-grade encryption and reliability.
              </p>
            </div>

            {/* Analyze Card */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 transition-all duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h4 className="text-2xl font-semibold text-white mb-3">
                  Analyze
                </h4>
              </div>
              <p className="text-white/70 leading-relaxed">
                Our AI engine processes thousands of data points, identifying patterns, sentiments, and actionable insights. Advanced algorithms surface hidden trends that inform strategic decisions.
              </p>
            </div>

            {/* Report Card */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 transition-all duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h4 className="text-2xl font-semibold text-white mb-3">
                  Report
                </h4>
              </div>
              <p className="text-white/70 leading-relaxed">
                Generate executive-ready reports with visualizations, key metrics, and strategic recommendations. Export in multiple formats tailored for your leadership team's needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative z-10 py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Built on cutting-edge orchestration and AI capabilities—not just a wrapper, but a true decision engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* n8n Orchestration */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  n8n Orchestration
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Enterprise-grade workflow orchestration that connects data sources and processes complex pipelines with scalable automation.
              </p>
            </div>

            {/* AI Decision Engine */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  AI Decision Engine
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Not just a wrapper—a true decision engine. Analyzes patterns, identifies opportunities, and generates actionable recommendations with reasoning and risk assessment.
              </p>
            </div>

            {/* AI Chatbot */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  AI Chatbot
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Intelligent conversational AI that understands context and provides real-time insights about your feedback data, trends, and recommendations.
              </p>
            </div>

            {/* Advanced AI Capabilities */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Advanced AI Capabilities
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Sentiment analysis, persona identification, trend detection, and predictive insights. Understands context and surfaces strategic intelligence.
              </p>
            </div>

            {/* Real-time Processing */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-6z" />
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Real-time Processing
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Webhook-driven architecture processes feedback instantly. Get AI-powered decisions in seconds without compromising depth of analysis.
              </p>
            </div>

            {/* Enterprise Integration */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Enterprise Integration
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Secure webhook endpoints and API-first architecture. Seamlessly integrate with your existing tools and export reports effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-white/70">
              Flexible pricing for teams of all sizes
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-lg">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Starter
                </h3>
                <p className="text-white/70 text-sm">
                  Small Agencies / SaaS
                </p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-1">₹4,999</div>
                <div className="text-sm text-white/60">PER MONTH</div>
              </div>

              <button className="w-full mb-6 px-6 py-3 rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 text-white/80 font-semibold overflow-hidden group/btn transition-all duration-300">
                <span className="inline-block group-hover/btn:-translate-y-1 transition-transform duration-300">Get Started</span>
              </button>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">WHAT'S INCLUDED</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Up to 1,400 reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Standard Webhook</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Automated Sentiment Tagging</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Business Plan */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-lg">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Business
                </h3>
                <p className="text-white/70 text-sm">
                  Mid-size Enterprise
                </p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-1">₹11,999</div>
                <div className="text-sm text-white/60">PER MONTH</div>
              </div>

              <button className="w-full mb-6 px-6 py-3 rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 text-white/80 font-semibold overflow-hidden group/btn transition-all duration-300">
                <span className="inline-block group-hover/btn:-translate-y-1 transition-transform duration-300">Get Started</span>
              </button>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">EVERYTHING IN STARTER, PLUS</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">8,000 reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Priority Webhooks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Custom AI "Themes"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Professional PDF Reports</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-lg">
              <div className="mb-6">
                <svg className="w-12 h-12 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enterprise
                </h3>
                <p className="text-white/70 text-sm">
                  Large Scale / Govt
                </p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-1">₹49,999</div>
                <div className="text-sm text-white/60">PER MONTH</div>
              </div>

              <button className="w-full mb-6 px-6 py-3 rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 text-white/80 font-semibold overflow-hidden group/btn transition-all duration-300">
                <span className="inline-block group-hover/btn:-translate-y-1 transition-transform duration-300">Contact Sales</span>
              </button>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">EVERYTHING IN BUSINESS, PLUS</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Unlimited reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Dedicated AI Model</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">SSO (Single Sign-On)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">24/7 Support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/70">Custom SLA</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Credits Section */}
      <TeamCredits />

      {/* Footer Section */}
      <Footer />
    </div>
  )
}
