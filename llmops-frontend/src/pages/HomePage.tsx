import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const appTarget = isAuthenticated ? '/dashboard' : '/login';

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0a] text-white relative flex flex-col">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(168,85,247,0.15),transparent_28%),radial-gradient(circle_at_78%_28%,rgba(16,185,129,0.10),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)]" />
      <div className="landing-grid absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Header with Custom ModelArena Logo */}
      <header className="relative z-10 flex h-20 items-center px-6 md:px-10">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] shrink-0" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="#111111"/>
              <path d="M12 26V16L20 22L28 12V24" stroke="url(#monochromeGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="28" cy="12" r="3.5" fill="#FFFFFF"/>
              <defs>
                <linearGradient id="monochromeGradient" x1="12" y1="26" x2="28" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6B7280" />
                  <stop offset="0.5" stopColor="#D1D5DB" />
                  <stop offset="1" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-black tracking-tight flex items-center">
              <span className="text-white">Model</span>
              <span className="text-gray-400">Arena</span>
            </span>
          </div>
        </Link>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pb-20 pt-10">
        <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
          
          <div className="landing-reveal mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#171717] px-4 py-1.5 text-xs font-medium text-gray-300 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Secure LLM evaluation workspace
          </div>

          <h1 className="landing-reveal max-w-3xl text-4xl font-bold tracking-tight md:text-6xl text-white leading-tight" style={{ animationDelay: '120ms' }}>
            Manage the full lifecycle of your LLM systems.
          </h1>

          <p className="landing-reveal mt-6 max-w-2xl text-base leading-relaxed text-gray-400" style={{ animationDelay: '220ms' }}>
            Register models, upload datasets, define judge metrics, run evaluations, and compare experiments inside one focused operational platform.
          </p>

          {/* Single Pill CTA Button */}
          <div className="landing-reveal mt-10" style={{ animationDelay: '320ms' }}>
            <Link
              to={appTarget}
              className="inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-200 px-8 py-3.5 rounded-full text-lg font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Get started
            </Link>
          </div>

          {/* Feature Highlight Boxes - 5 Item Grid */}
          <div className="landing-reveal landing-float mt-20 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 text-left shadow-2xl" style={{ animationDelay: '420ms' }}>
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#111111] p-5">
              <div className="landing-scan absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative z-10">
                
                {/* Feature 1: Models */}
                <div className="md:col-span-2 bg-[#171717] border border-white/5 rounded-xl p-5 shadow-sm hover:border-white/10 transition-all flex flex-col h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 3v4.54L5.3 15.68A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.2-3.32L15 7.54V3" /><path d="M8 3h8" /><path d="M5.5 14h13" />
                      </svg>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  </div>
                  <h3 className="text-md font-semibold text-white mb-2">Models</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Centralize and version your LLM configurations for seamless deployment.
                  </p>
                </div>

                {/* Feature 2: Datasets */}
                <div className="md:col-span-2 bg-[#171717] border border-white/5 rounded-xl p-5 shadow-sm hover:border-white/10 transition-all flex flex-col h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
                      </svg>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  </div>
                  <h3 className="text-md font-semibold text-white mb-2">Datasets</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Securely upload and organize test datasets for reproducible runs.
                  </p>
                </div>

                {/* Feature 3: Metrics */}
                <div className="md:col-span-2 bg-[#171717] border border-white/5 rounded-xl p-5 shadow-sm hover:border-white/10 transition-all flex flex-col h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="2" y1="14" x2="6" y2="14" /><line x1="10" y1="8" x2="14" y2="8" /><line x1="18" y1="16" x2="22" y2="16" />
                      </svg>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                  </div>
                  <h3 className="text-md font-semibold text-white mb-2">Metrics</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Define custom judge metrics to evaluate outputs with precision.
                  </p>
                </div>

                {/* Feature 4: Evaluations */}
                <div className="md:col-start-2 md:col-span-2 bg-[#171717] border border-white/5 rounded-xl p-5 shadow-sm hover:border-white/10 transition-all flex flex-col h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>
                  <h3 className="text-md font-semibold text-white mb-2">Evaluations</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Run automated evaluations and analyze performance dashboards.
                  </p>
                </div>

                {/* Feature 5: Experiments */}
                <div className="md:col-span-2 bg-[#171717] border border-white/5 rounded-xl p-5 shadow-sm hover:border-white/10 transition-all flex flex-col h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/>
                      </svg>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  </div>
                  <h3 className="text-md font-semibold text-white mb-2">Experiments</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Compare models side-by-side to discover the ultimate configuration.
                  </p>
                </div>

              </div>
            </div>
          </div>
          
        </section>
      </main>
    </div>
  );
}