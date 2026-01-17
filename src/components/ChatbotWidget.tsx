import { useState, useRef, useEffect } from 'react'

type Message = {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

function glassCardClass(extra?: string) {
  return [
    'rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg',
    extra ?? '',
  ].join(' ')
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [messages, isOpen])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setError(null)
    setIsLoading(true)

    try {
      const payload = {
        message: userMessage.text,
      }

      const webhookUrl = process.env.REACT_APP_N8N_CHATBOT_URL || 'https://gnosiss.app.n8n.cloud/webhook/chatbot-webhook'

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('TIMEOUT'))
        }, 60000)
      })

      const response = await Promise.race([
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        timeoutPromise,
      ]) as Response

      const result = await response.json()

      // console.log('Chatbot webhook result:', result)

      if (!response.ok) {
        const msg = typeof result === 'string' ? result : JSON.stringify(result)
        throw new Error(msg || `Request failed (${response.status})`)
      }

      // Extract bot response - handle different response structures
      let botResponseText = ''

      if (typeof result === 'string') {
        botResponseText = result
      } else if (result?.response) {
        botResponseText = String(result.response)
      } else if (result?.message) {
        botResponseText = String(result.message)
      } else if (result?.text) {
        botResponseText = String(result.text)
      } else if (result?.data?.response) {
        botResponseText = String(result.data.response)
      } else if (result?.data?.message) {
        botResponseText = String(result.data.message)
      } else if (Array.isArray(result) && result.length > 0) {
        botResponseText = String(result[0]?.response || result[0]?.message || result[0]?.text || JSON.stringify(result[0]))
      } else {
        botResponseText = JSON.stringify(result)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (e: any) {
      if (e?.message === 'TIMEOUT') {
        setError('Request timed out. Please try again.')
      } else {
        setError(e?.message ? String(e.message) : 'Failed to get response')
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleToggle = () => {
    // console.log('Chatbot toggle clicked, current state:', isOpen)
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Animated Notification Badge */}
      {!isOpen && (
        <div className="fixed bottom-20 right-6 z-[49] animate-bounce pointer-events-none">
          <div className="relative">
            {/* Pulsing Glow Effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping pointer-events-none"></div>

            {/* Notification Card */}
            <div className="relative bg-gradient-to-r from-white/20 via-white/15 to-white/10 border border-white/20 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs font-semibold text-white">AI Assistant</div>
                  <div className="text-xs text-white/70">Ask me anything</div>
                </div>
              </div>
              {/* Arrow pointing down */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <svg className="w-4 h-4 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 6l5 5 5-5H5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-white/20 via-white/15 to-white/10 border border-white/10 backdrop-blur-xl shadow-lg flex items-center justify-center group hover:scale-110 transition-transform duration-300 relative cursor-pointer active:scale-95"
          aria-label="Open chatbot"
          type="button"
        >
          {/* Pulsing ring when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping pointer-events-none"></div>
          )}

          {isOpen ? (
            <svg className="w-6 h-6 text-white relative z-10 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white relative z-10 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[55] w-96 h-[600px] flex flex-col">
          <div className={glassCardClass('flex flex-col h-full p-0')}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="text-sm font-semibold text-white">REVUE CHATBOT</div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close chatbot"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.isUser
                        ? 'bg-gradient-to-r from-white/20 via-white/15 to-white/10 text-white'
                        : 'bg-black/30 border border-white/10 text-white/90'
                      }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </div>
                    <div className={`text-xs mt-2 ${message.isUser ? 'text-white/60' : 'text-white/50'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-black/30 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-white/70">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-4 mb-2 rounded-xl border border-white/30 bg-white/10 p-3 text-sm text-white/90">
                {error}
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-white/10 p-4">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-white/40 focus:ring-2 focus:ring-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className={[
                    'rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300',
                    'border border-white/10 shadow-lg overflow-hidden flex items-center justify-center',
                    !isLoading && inputText.trim()
                      ? 'bg-gradient-to-r from-white/20 via-white/15 to-white/10 text-white group'
                      : 'cursor-not-allowed bg-white/5 text-white/40',
                  ].join(' ')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}