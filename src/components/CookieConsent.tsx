import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent')
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
            <div className="max-w-7xl mx-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-white font-semibold text-lg">We value your privacy</h3>
                    <p className="text-white/70 text-sm max-w-2xl">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link to="/legal/cookie" className="text-white hover:underline">Cookie Policy</Link>.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsVisible(false)} // Just close for now, or could handle as 'Reject'
                        className="px-6 py-2.5 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors shadow-lg shadow-white/10"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    )
}
