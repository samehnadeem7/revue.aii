export default function CodeSnippet() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Code Window */}
      <div className="rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-white/10">
          {/* Traffic Light Controls */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {/* File Name */}
          <div className="text-sm text-white/60 font-mono">agent_core_v2.py</div>
        </div>
        
        {/* Code Content */}
        <div className="p-4 font-mono text-sm">
          <div className="space-y-2">
            <div>
              <span className="text-blue-400">import</span>{' '}
              <span className="text-cyan-400">LangChain</span>
            </div>
            <div>
              <span className="text-purple-400">class</span>{' '}
              <span className="text-cyan-400">AutonomousWorker</span>:
            </div>
            <div className="pl-4">
              <span className="text-purple-400">def</span>{' '}
              <span className="text-cyan-400">optimize_workflow</span>
              <span className="text-white">(</span>
              <span className="text-cyan-400">self</span>
              <span className="text-white">):</span>
            </div>
            <div className="pl-8 text-gray-400">
              # AI logic initialized
            </div>
            <div className="pl-8">
              <span className="text-purple-400">return</span>{' '}
              <span className="text-cyan-400">self</span>
              <span className="text-white">.</span>
              <span className="text-cyan-400">execute</span>
              <span className="text-white">()</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Indicator */}
      <div className="mt-4 flex items-center gap-3 text-sm">
        <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
        </div>
        <span className="text-white/80">Status</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-white/80">OPERATIONAL</span>
        </div>
      </div>
    </div>
  )
}
