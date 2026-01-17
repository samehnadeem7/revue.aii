import { useEffect, useMemo, useRef, useState } from 'react'
import { extractPdfText } from '../lib/extractPdfText'

type Mode = 'paste' | 'upload'

export const UNACADEMY_DEMO_DATA = {
  TEXT: {
    label: "Unacademy Feedback (Raw Text)",
    content: `Unacademy has some of the best educators I've come across. The way complex topics are broken down makes learning feel much less intimidating.

The app crashes way too often during live classes. For a tech-first education platform, this is honestly unacceptable.

Compared to offline coaching, Unacademy is extremely cost-effective. You get access to multiple educators at a fraction of the price.

Their customer support is painfully slow. I raised a ticket weeks ago and still haven't received a proper resolution.

The structured courses and test series helped me stay consistent with my exam prep. It feels well-designed for serious aspirants.

There's too much content and very little guidance on what to follow. Beginners can easily feel lost.

I love the flexibility Unacademy offers. Recorded lectures make it easy to study even with a full-time job.

The subscription feels overpriced considering many classes are repetitive or recycled from older batches.

The learner community and live interactions keep me motivated. Seeing others work hard pushes me to stay disciplined.

Not all educators maintain the same quality. Some classes feel rushed and poorly planned.`,
  },
  CSV: {
    label: "Unacademy Dataset (CSV Format)",
    content: `Category,Comment
Educators,"Unacademy has some of the best educators I've come across."
Tech,"The app crashes way too often during live classes. Unacceptable."
Value,"Extremely cost-effective compared to offline coaching."
Support,"Customer support is painfully slow. Tickets take weeks."
Design,"Structured courses and test series help consistency."
UX,"Too much content, beginners feel lost without guidance."
Flexibility,"Recorded lectures are great for full-time workers."
Pricing,"Subscription feels overpriced due to repetitive content."
Community,"Live interactions and community keep me motivated."
Quality,"Educator quality varies; some classes feel rushed."`,
  },
  PDF: {
    label: "Unacademy Report (PDF Extraction)",
    content: `[INTERNAL PDF REPORT: UNACADEMY USER SENTIMENT Q1]
Summary: High educator satisfaction (8.5/10) contrasted with low technical stability (3/10).
Student Feedback Included:
- Educators break down complex topics well.
- App crashes frequently during live sessions.
- Pricing is favorable compared to offline alternatives.
- Support resolution times are below industry standards.
- Beginners require better onboarding pathways.
- Community features are a strong retention driver.`,
  }
}

type Persona = {
  name?: string
  goal?: string
  pain?: string
  [k: string]: unknown
}

function pick<T = unknown>(obj: any, keys: string[]): T | undefined {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k] as T
  }
  return undefined
}

function asArray(x: any): any[] {
  if (!x) return []
  if (Array.isArray(x)) return x
  return [x]
}

function toBullets(x: any): string[] {
  if (!x) return []
  if (Array.isArray(x)) return x.map(String).filter(Boolean)
  if (typeof x === 'string') {
    const lines = x
      .split(/\r?\n/)
      .map((s) => s.replace(/^\s*[-*]\s*/, '').trim())
      .filter(Boolean)
    return lines.length ? lines : [x]
  }
  if (typeof x === 'object') {
    return Object.values(x)
      .map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
      .filter(Boolean)
  }
  return [String(x)]
}

function glassCardClass(extra?: string) {
  return [
    'rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg',
    extra ?? '',
  ].join(' ')
}

export default function DecisionIntelligence() {
  const [mode, setMode] = useState<Mode>('paste')
  const [feedback, setFeedback] = useState('')
  const [decisionQuestion, setDecisionQuestion] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const canSubmit = useMemo(() => {
    return feedback.trim().length > 0 && !isLoading
  }, [feedback, isLoading])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isDropdownOpen])

  // Sample data handlers
  function handleSamplePDF() {
    const sampleText = UNACADEMY_DEMO_DATA.PDF.content
    setFeedback(sampleText)
    setMode('upload')
    setError(null)
    setResult(null)

    // Create a fake file object to simulate PDF upload
    const fakeFile = new File([sampleText], 'unacademy_sample.pdf', { type: 'application/pdf' })
    setSelectedFile(fakeFile)

    setIsDropdownOpen(false)
  }

  function handleSampleCSV() {
    const sampleText = UNACADEMY_DEMO_DATA.CSV.content
    setFeedback(sampleText)
    setMode('upload')
    setError(null)
    setResult(null)

    // Create a fake file object to simulate CSV upload
    const fakeFile = new File([sampleText], 'unacademy_sample.csv', { type: 'text/csv' })
    setSelectedFile(fakeFile)

    setIsDropdownOpen(false)
  }

  function handleSampleText() {
    const sampleText = UNACADEMY_DEMO_DATA.TEXT.content
    setFeedback(sampleText)
    setMode('paste')
    setSelectedFile(null)
    setError(null)
    setResult(null)
    setIsDropdownOpen(false)
  }

  async function onPickFile(file: File) {
    setError(null)
    setResult(null)
    setSelectedFile(file)

    try {
      const ext = (file.name.split('.').pop() ?? '').toLowerCase()
      if (file.type === 'application/pdf' || ext === 'pdf') {
        const text = await extractPdfText(file)
        setFeedback(text)
        return
      }

      const text = await file.text()
      setFeedback(text)
    } catch (e: any) {
      setError(e?.message ? String(e.message) : 'Failed to read file')
      setFeedback('')
    }
  }

  async function onSubmit() {
    setError(null)
    setResult(null)
    setIsLoading(true)

    try {
      const payload = {
        feedback,
        decision_question: decisionQuestion,
      }

      const primaryUrl = process.env.REACT_APP_N8N_REVUE_URL || 'https://gnosiss.app.n8n.cloud/webhook/revue'
      const fallbackUrl = '/api/revue'

      // Create a timeout promise that rejects after 60 seconds
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('TIMEOUT'))
        }, 60000)
      })

      // Fetch with timeout handling
      let response: Response
      try {
        response = await Promise.race([
          fetch(primaryUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }),
          timeoutPromise,
        ]) as Response
      } catch (fetchError: any) {
        if (fetchError?.message === 'TIMEOUT') {
          setError('Check back in a moment')
          setIsLoading(false)
          return
        }
        // Try fallback URL
        try {
          response = await Promise.race([
            fetch(fallbackUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }),
            timeoutPromise,
          ]) as Response
        } catch (fallbackError: any) {
          if (fallbackError?.message === 'TIMEOUT') {
            setError('Check back in a moment')
            setIsLoading(false)
            return
          }
          throw fallbackError
        }
      }

      // Capture the response and parse JSON
      const result = await response.json()

      // Console log removed


      if (!response.ok) {
        const msg = typeof result === 'string' ? result : JSON.stringify(result)
        throw new Error(msg || `Request failed (${response.status})`)
      }

      // Map the data to state variable so UI updates automatically
      setResult(result)

      // If sentiment_score is present, store it in localStorage to update dashboard
      // Handle array format: result[0].sentiment_score or result.data[0].sentiment_score
      let sentimentScore: any = null
      if (Array.isArray(result) && result.length > 0) {
        sentimentScore = result[0]?.sentiment_score
      } else if (Array.isArray(result?.data) && result.data.length > 0) {
        sentimentScore = result.data[0]?.sentiment_score
      } else if (result?.data && typeof result.data === 'object' && !Array.isArray(result.data)) {
        sentimentScore = result.data?.sentiment_score
      } else {
        sentimentScore = result?.sentiment_score ?? result?.result?.sentiment_score
      }

      if (sentimentScore !== undefined && sentimentScore !== null) {
        let scorePercentage: number
        if (typeof sentimentScore === 'number') {
          // If score is between 0-1, multiply by 100; if 0-100, use as is
          scorePercentage = sentimentScore <= 1 ? Math.round(sentimentScore * 100) : Math.round(sentimentScore)
        } else {
          // Parse string value
          const parsed = parseFloat(String(sentimentScore))
          scorePercentage = parsed <= 1 ? Math.round(parsed * 100) : Math.round(parsed)
        }
        // Ensure it's within valid range
        scorePercentage = Math.max(0, Math.min(100, scorePercentage))
        localStorage.setItem('sentiment_score', JSON.stringify(scorePercentage))
        // Dispatch custom event for immediate update in same tab
        window.dispatchEvent(new Event('sentimentScoreUpdate'))
        // console.log('Sentiment score updated:', scorePercentage)
      }
    } catch (e: any) {
      if (e?.message === 'TIMEOUT') {
        setError('Check back in a moment')
      } else {
        setError(e?.message ? String(e.message) : 'Request failed')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle array response format: data[0].key - More robust extraction
  const getDataItem = useMemo(() => {
    if (!result) return null

    // Handle direct array response: [ {...} ]
    if (Array.isArray(result) && result.length > 0) {
      return result[0]
    }

    // Handle nested array: { data: [ {...} ] }
    if (Array.isArray(result?.data) && result.data.length > 0) {
      return result.data[0]
    }

    // Handle nested object: { data: {...} }
    if (result?.data && typeof result.data === 'object' && !Array.isArray(result.data)) {
      return result.data
    }

    // Handle result.result structure: { result: {...} }
    if (result?.result && typeof result.result === 'object') {
      if (Array.isArray(result.result) && result.result.length > 0) {
        return result.result[0]
      }
      return result.result
    }

    // Handle output structure: { output: {...} }
    if (result?.output && typeof result.output === 'object') {
      if (Array.isArray(result.output) && result.output.length > 0) {
        return result.output[0]
      }
      return result.output
    }

    // Return result as-is if it's an object
    if (typeof result === 'object' && result !== null) {
      return result
    }

    return null
  }, [result])

  const finalDecision = useMemo(() => {
    if (!getDataItem) return null
    return pick<string>(getDataItem, [
      'decision',
      'final_decision',
      'finalDecision',
      'Final Decision',
      'finalDecision',
      'FINAL DECISION',
      'recommendation',
      'Recommended Decision',
      'recommended_decision'
    ]) ?? null
  }, [getDataItem])

  const personas: Persona[] = useMemo(() => {
    if (!getDataItem) return []
    const p = pick<any>(getDataItem, [
      'persona',
      'personas',
      'Personas',
      'PERSONAS',
      'customer_personas',
      'user_personas'
    ])
    return asArray(p)
  }, [getDataItem])

  const whyThisDecision = useMemo(() => {
    if (!getDataItem) return []
    const raw = pick<any>(getDataItem, [
      'insights',
      'why_this_decision',
      'whyThisDecision',
      'rationale',
      'why',
      'reasoning',
      'explanation',
      'WHY THIS DECISION',
      'why_this_decision'
    ])
    return toBullets(raw)
  }, [getDataItem])

  const rejectedAlternative = useMemo(() => {
    if (!getDataItem) return null
    return pick<string>(getDataItem, [
      'rejected_alternative',
      'rejectedAlternative',
      'what_not_to_do',
      'rejected_option',
      'alternative_rejected',
      'REJECTED ALTERNATIVE'
    ]) ?? null
  }, [getDataItem])

  const riskIfIgnored = useMemo(() => {
    if (!getDataItem) return null
    return pick<string>(getDataItem, [
      'risk_if_ignored',
      'riskIfIgnored',
      'risk',
      'risks',
      'consequences',
      'RISK IF IGNORED',
      'risk_if_ignored'
    ]) ?? null
  }, [getDataItem])

  // Extract status, message, and reason for error/rejection handling
  const responseStatus = useMemo(() => {
    if (!result) return null
    return pick<string>(getDataItem || result, [
      'status',
      'Status',
      'STATUS',
      'state',
      'State'
    ]) ?? null
  }, [result, getDataItem])

  const responseMessage = useMemo(() => {
    if (!result) return null
    return pick<string>(getDataItem || result, [
      'message',
      'Message',
      'MESSAGE',
      'msg',
      'error_message',
      'errorMessage'
    ]) ?? null
  }, [result, getDataItem])

  const responseReason = useMemo(() => {
    if (!result) return null
    return pick<string>(getDataItem || result, [
      'reason',
      'Reason',
      'REASON',
      'error_reason',
      'errorReason',
      'details'
    ]) ?? null
  }, [result, getDataItem])

  // Check if response is rejected/error
  const isRejected = useMemo(() => {
    if (!responseStatus) return false
    const status = String(responseStatus).toLowerCase()
    return status === 'rejected' || status === 'error' || status === 'failed' || status === 'invalid'
  }, [responseStatus])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="text-sm tracking-widest text-white font-semibold">REVUE INTELLIGENCE</div>
        </div>
        <h1 className="text-4xl font-bold leading-tight text-white">
          TRANSFORMING FEEDBACK INTO STRATEGY
        </h1>
        <div className="text-white/70 text-lg">
          Paste feedback or upload CSV/PDF, ask a decision question, then generate a judge-ready recommendation.
        </div>
      </div>

      <div className={glassCardClass('p-5 md:p-6')}>
        <div className="mb-5">
          <div className="relative flex items-center justify-center mb-2">
            <div className="text-lg font-semibold text-white">Input</div>
            <div className="absolute right-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-white/20 via-white/15 to-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold transition-all duration-300 hover:from-white/25 hover:via-white/20 hover:to-white/15 shadow-lg"
              >
                <span>Demo Trial</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/20 bg-black/60 backdrop-blur-xl shadow-lg z-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={handleSamplePDF}
                    className="w-full px-4 py-3 text-left text-sm text-white/90 hover:bg-white/10 transition-colors duration-200"
                  >
                    Test Demo PDF
                  </button>
                  <button
                    type="button"
                    onClick={handleSampleCSV}
                    className="w-full px-4 py-3 text-left text-sm text-white/90 hover:bg-white/10 transition-colors duration-200 border-t border-white/10"
                  >
                    Test Demo CSV
                  </button>
                  <button
                    type="button"
                    onClick={handleSampleText}
                    className="w-full px-4 py-3 text-left text-sm text-white/90 hover:bg-white/10 transition-colors duration-200 border-t border-white/10"
                  >
                    Test Demo Text
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="text-sm text-white/65 text-center">Choose feedback source and ask your decision question.</div>
        </div>

        <div className="space-y-4">
          {/* Feedback Section */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-white/85">Feedback</div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setMode('paste')
                  setError(null)
                  setResult(null)
                }}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden group border border-white/10 bg-black/40 backdrop-blur-xl text-white/80 hover:text-white shadow-lg"
              >
                <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">
                  Paste feedback
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('upload')
                  setError(null)
                  setResult(null)
                }}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden group border border-white/10 bg-black/40 backdrop-blur-xl text-white/80 hover:text-white shadow-lg"
              >
                <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">
                  Upload CSV/PDF
                </span>
              </button>
            </div>

            {mode === 'paste' ? (
              <textarea
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value)
                  setSelectedFile(null)
                  setError(null)
                  setResult(null)
                }}
                placeholder="Paste user feedback, reviews, interview transcripts, support tickets..."
                className="h-56 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-white/40 focus:ring-2 focus:ring-white/15"
              />
            ) : (
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.pdf,text/csv,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) void onPickFile(file)
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/8 text-white"
                >
                  <div className="text-sm font-semibold">Choose file</div>
                  <div className="mt-1 text-xs text-white/60">CSV or PDF. We'll extract text and send it as feedback.</div>
                </button>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-white/85">
                        {selectedFile ? selectedFile.name : 'No file selected'}
                      </div>
                      <div className="mt-1 text-xs text-white/55">
                        {selectedFile
                          ? `${(selectedFile.size / 1024).toFixed(1)} KB • ${selectedFile.type || 'unknown type'}`
                          : 'Upload to populate the feedback payload.'}
                      </div>
                    </div>
                    {selectedFile ? (
                      <button
                        type="button"
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
                        onClick={() => {
                          setSelectedFile(null)
                          setFeedback('')
                          setResult(null)
                          setError(null)
                          if (fileInputRef.current) fileInputRef.current.value = ''
                        }}
                      >
                        Clear
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-3 text-xs text-white/45">
                    Preview (first 800 chars):
                  </div>
                  <div className="mt-1 max-h-28 overflow-auto rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-white/70">
                    {(feedback || '').slice(0, 800) || '—'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Decision Question Section */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-white/85">
              Decision Question <span className="text-white/50 text-xs font-normal">(Optional)</span>
            </div>
            <input
              value={decisionQuestion}
              onChange={(e) => {
                setDecisionQuestion(e.target.value)
                setError(null)
                setResult(null)
              }}
              placeholder="e.g., Should we redesign onboarding?"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-white/40 focus:ring-2 focus:ring-white/15"
            />
          </div>

          {/* Get Decision Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!canSubmit || isLoading}
              onClick={() => void onSubmit()}
              className={[
                'w-full rounded-xl px-5 py-4 text-sm font-semibold tracking-wide transition-all duration-300',
                'border border-white/10 shadow-lg overflow-hidden flex items-center justify-center gap-2',
                canSubmit && !isLoading
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
                  <span>Running workflow…</span>
                </>
              ) : (
                <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">
                  Get Decision
                </span>
              )}
            </button>

            {error ? (
              <div className="mt-3 rounded-xl border border-white/30 bg-white/10 p-4 text-sm text-white/90">
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {result ? (
        <div className={glassCardClass('p-5 md:p-6')}>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-lg font-semibold text-white">Output</div>
              <div className="text-sm text-white/65"></div>
            </div>
          </div>

          {isRejected ? (
            // Rejected/Error State
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/30 bg-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm font-semibold tracking-widest text-white/80 uppercase">
                    {responseStatus || 'Status'}
                  </div>
                </div>
                {responseMessage && (
                  <div className="text-base font-medium text-white mb-3 leading-relaxed">
                    {String(responseMessage)}
                  </div>
                )}
                {responseReason && (
                  <div className="text-sm text-white/70 leading-relaxed">
                    <span className="font-medium text-white/80">Reason: </span>
                    {String(responseReason)}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Normal Output State
            <div className="mt-5 space-y-4">
              {/* Final Decision - Always Visible */}
              <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
                <div className="text-xs font-semibold tracking-widest text-white/60 mb-4">FINAL DECISION</div>
                <div className="text-lg font-medium leading-relaxed text-white/90 whitespace-pre-wrap">
                  {finalDecision ? String(finalDecision) : 'Processing...'}
                </div>
              </div>

              {/* Why This Decision - Expandable */}
              <details className="rounded-2xl border border-white/10 bg-black/25 p-6 group">
                <summary className="cursor-pointer flex items-center justify-between text-sm font-semibold text-white/85 hover:text-white transition-colors">
                  <span>Why This Decision</span>
                  <svg className="w-4 h-4 text-white/60 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 pt-4 border-t border-white/10">
                  {whyThisDecision.length ? (
                    <div className="space-y-3">
                      {whyThisDecision.map((b, idx) => (
                        <div key={idx} className="text-sm text-white/85 leading-relaxed">
                          {b}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-white/60">Processing...</div>
                  )}
                </div>
              </details>

              {/* Personas - Expandable */}
              {personas.length > 0 && (
                <details className="rounded-2xl border border-white/10 bg-black/25 p-6 group">
                  <summary className="cursor-pointer flex items-center justify-between text-sm font-semibold text-white/85 hover:text-white transition-colors">
                    <span>Personas</span>
                    <svg className="w-4 h-4 text-white/60 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="space-y-4">
                      {personas.map((persona, idx) => (
                        <div key={idx} className="rounded-lg border border-white/10 bg-black/20 p-4">
                          {persona.name && (
                            <div className="text-sm font-semibold text-white mb-2">{persona.name}</div>
                          )}
                          {persona.goal && (
                            <div className="mb-2">
                              <div className="text-xs font-medium text-white/60 mb-1">Goal:</div>
                              <div className="text-sm text-white/85 leading-relaxed">{String(persona.goal)}</div>
                            </div>
                          )}
                          {persona.pain && (
                            <div>
                              <div className="text-xs font-medium text-white/60 mb-1">Pain Point:</div>
                              <div className="text-sm text-white/85 leading-relaxed">{String(persona.pain)}</div>
                            </div>
                          )}
                          {!persona.name && !persona.goal && !persona.pain && (
                            <div className="text-sm text-white/85 leading-relaxed whitespace-pre-wrap">
                              {typeof persona === 'string' ? persona : JSON.stringify(persona, null, 2)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* Risk If Ignored - Expandable */}
              <details className="rounded-2xl border border-white/10 bg-black/25 p-6 group">
                <summary className="cursor-pointer flex items-center justify-between text-sm font-semibold text-white/85 hover:text-white transition-colors">
                  <span>Risk If Ignored</span>
                  <svg className="w-4 h-4 text-white/60 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/85 leading-relaxed whitespace-pre-wrap">
                  {riskIfIgnored ? String(riskIfIgnored) : 'Processing...'}
                </div>
              </details>

            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
