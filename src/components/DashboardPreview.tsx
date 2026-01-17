import { useState, useEffect } from 'react'

export default function DashboardPreview() {
  const [sentimentScore, setSentimentScore] = useState<number>(92)

  useEffect(() => {
    // Read sentiment_score from localStorage on mount
    const updateSentimentScore = () => {
      const storedScore = localStorage.getItem('sentiment_score')
      if (storedScore) {
        try {
          const score = JSON.parse(storedScore)
          if (typeof score === 'number' && score >= 0 && score <= 100) {
            setSentimentScore(score)
          }
        } catch (e) {
          console.error('Failed to parse sentiment_score from localStorage:', e)
        }
      }
    }

    // Initial load
    updateSentimentScore()

    // Listen for custom event for same-tab updates
    const handleSentimentScoreUpdate = () => {
      updateSentimentScore()
    }

    // Listen for storage events to update when sentiment_score changes from another tab/window
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sentiment_score' && e.newValue) {
        try {
          const score = JSON.parse(e.newValue)
          if (typeof score === 'number' && score >= 0 && score <= 100) {
            setSentimentScore(score)
          }
        } catch (error) {
          console.error('Failed to parse sentiment_score from storage event:', error)
        }
      }
    }

    window.addEventListener('sentimentScoreUpdate', handleSentimentScoreUpdate)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('sentimentScoreUpdate', handleSentimentScoreUpdate)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <div className="relative w-full max-w-md">
      {/* Dashboard Preview Card */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg overflow-hidden">
        {/* Dashboard Header */}
        <div className="px-5 py-4 bg-black/30 border-b border-white/10 flex items-center justify-between">
          <span className="text-sm font-bold text-white">REVUE. AI</span>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>

        {/* Dashboard Content */}
        <div className="p-5 space-y-4">
          {/* Recent Decisions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-black/30 p-3 hover:bg-black/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/80">Decision</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed line-clamp-2">Improve onboarding flow...</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-3 hover:bg-black/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/80">Feedback</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed line-clamp-2">User experience concerns...</p>
            </div>
          </div>

          {/* Insights Detected */}
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <div className="text-xs font-semibold tracking-widest text-white/60 mb-3 uppercase">INSIGHTS DETECTED</div>
            <div className="relative h-12 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-white/10"></div>
                <div className="absolute w-0.5 h-full bg-white/10"></div>
                <div className="absolute w-3 h-3 bg-white rounded-full border border-white/20 shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Key Patterns */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-white/90">Key patterns</h4>
              <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Product Feedback */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/70">Product Feedback</span>
                <span className="text-xs font-semibold text-green-400">+87%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-white via-white/70 to-white/40 rounded-full" style={{ width: '73%' }}></div>
              </div>
            </div>

            {/* Feature Requests */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/70">Feature Requests</span>
                <span className="text-xs font-semibold text-green-400">+64%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-white via-white/70 to-white/40 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
          </div>

          {/* Sentiment & Trend */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs text-white/60 mb-2">Sentiment</div>
              <div className="text-2xl font-bold text-green-400 mb-2">{sentimentScore}%</div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-white via-white/70 to-white/40 rounded-full" style={{ width: `${sentimentScore}%` }}></div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs text-white/60 mb-2">Trend</div>
              <div className="h-12 relative">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 45 Q 25 40 50 30 T 100 15"
                    fill="url(#trendGradient)"
                  />
                  <path
                    d="M 0 45 Q 25 40 50 30 T 100 15"
                    stroke="rgb(255, 255, 255)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}