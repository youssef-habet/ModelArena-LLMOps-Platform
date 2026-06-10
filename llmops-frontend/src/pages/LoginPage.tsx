import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth'; 

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth(); 
  
  const initialMode = location.state?.mode === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.mode) {
      setMode(location.state.mode);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'register') {
        await register(email, password, name); 
      } else {
        await login(email, password);
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Auth error:', error);
      alert(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked for:', email);
    alert("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="landing-grid absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Auth Card */}
      <div className="w-full max-w-[420px] bg-[#171717] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
        
        {/* Custom ModelArena Logo & Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link to="/" className="mb-6 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] shrink-0" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="#111111"/>
                <path d="M12 26V16L20 22L28 12V24" stroke="url(#monochromeGradientAuth)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="28" cy="12" r="3.5" fill="#FFFFFF"/>
                <defs>
                  <linearGradient id="monochromeGradientAuth" x1="12" y1="26" x2="28" y2="12" gradientUnits="userSpaceOnUse">
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

          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {mode === 'login' ? 'Log in to continue to your workspace.' : 'Sign up to start managing your LLM operations.'}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5 mb-8">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'login' 
                ? 'bg-[#2a2a2a] text-white shadow-sm border border-white/10' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'register' 
                ? 'bg-[#2a2a2a] text-white shadow-sm border border-white/10' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Conditional Name Field */}
          {mode === 'register' && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-white/50 focus:ring-1 focus:ring-white/50 outline-none transition-all sm:text-sm"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-white/50 focus:ring-1 focus:ring-white/50 outline-none transition-all sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-white/50 focus:ring-1 focus:ring-white/50 outline-none transition-all sm:text-sm"
            />
            {mode === 'login' && (
              <div className="flex justify-end pr-1">
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-xs text-gray-400 hover:text-white hover:underline transition-all"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-gray-200 font-semibold rounded-xl px-4 py-3 mt-4 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
            ) : null}
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-xs text-gray-500 font-medium">or</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        {/* Google OAuth Stub */}
        <button
          type="button"
          className="w-full bg-transparent border border-white/10 text-white hover:bg-white/5 font-medium rounded-xl px-4 py-3 transition-all flex items-center justify-center gap-3 text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          Continue with Google
        </button>

      </div>
    </div>
  );
}