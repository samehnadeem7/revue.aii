export default function DashboardImage() {
  return (
    <div className="relative w-full max-w-md">
      {/* Simple Dashboard Illustration */}
      <div className="rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden p-8">
        {/* Minimal Dashboard Preview */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Revue.</span>
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Ai</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>

          {/* Simple Sentiment Indicator */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs text-white/60 mb-2">Sentiment</div>
            <div className="text-2xl font-bold text-cyan-400">92%</div>
            <div className="h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-cyan-400 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          {/* Mini Chart Representation */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs text-white/60 mb-3">Trend</div>
            <div className="h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path
                  d="M 0 35 Q 25 30 50 20 T 100 10"
                  stroke="rgb(34, 211, 238)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 0 35 Q 25 30 50 20 T 100 10 L 100 40 L 0 40 Z"
                  fill="rgba(34, 211, 238, 0.2)"
                />
              </svg>
            </div>
          </div>

          {/* Key Metrics Dots */}
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
