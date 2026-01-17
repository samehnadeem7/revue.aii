import Navbar from './Navbar'
import Footer from './Footer'

interface InfoPageProps {
    title: string
    content: React.ReactNode
    updatedAt?: string
}

export default function InfoPage({ title, content, updatedAt }: InfoPageProps) {
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

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 pt-32 pb-20 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-12 border-b border-white/10 pb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {title}
                            </h1>
                            {updatedAt && (
                                <p className="text-white/40 text-sm">Last updated: {updatedAt}</p>
                            )}
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-white/70">
                            {content}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}
