import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

interface FeaturePageProps {
    title: string
    subtitle: string
    description: string
    icon?: React.ReactNode
}

export default function FeaturePage({ title, subtitle, description, icon }: FeaturePageProps) {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-dark-blue relative overflow-hidden">
            {/* Background Effects */}
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
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 pt-32 pb-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        {icon && (
                            <div className="flex justify-center mb-8">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                                    {icon}
                                </div>
                            </div>
                        )}

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            {title}
                        </h1>

                        <p className="text-xl text-white/80 font-medium mb-8">
                            {subtitle}
                        </p>

                        <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto">
                            {description}
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/app')}
                                className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-colors shadow-lg shadow-white/10"
                            >
                                Try It Now
                            </button>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}
