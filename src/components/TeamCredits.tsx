export default function TeamCredits() {
    return (
        <section className="relative z-10 py-24 border-t border-white/10 bg-black/20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-12">Built by the Team</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xl">SN</div>
                        <div className="text-white font-semibold mb-1">Sameh Nadeem</div>
                        <div className="text-white/60 text-sm">AI n8n Automation & UI Design</div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xl">SK</div>
                        <div className="text-white font-semibold mb-1">Saad Khan</div>
                        <div className="text-white/60 text-sm">Frontend</div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xl">AL</div>
                        <div className="text-white font-semibold mb-1">Ali</div>
                        <div className="text-white/60 text-sm">AI & Prompt Engineering</div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xl">MN</div>
                        <div className="text-white font-semibold mb-1">Mohammmad Nithash</div>
                        <div className="text-white/60 text-sm">Frontend</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
