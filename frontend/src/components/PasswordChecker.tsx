import { useState } from 'react';
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react';
import axios from 'axios';
import ResultDisplay, { CheckResult } from './ResultDisplay';

const API_BASE_URL = 'http://localhost:8847';

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post<CheckResult>(`${API_BASE_URL}/api/check`, {
        password: password,
      });
      setResult(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Failed to check password. Please try again.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleCheck();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Input Card */}
      <div className="glass-panel rounded-tahoe-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-tahoe-accent/10 rounded-full">
            <Lock className="w-8 h-8 text-tahoe-accent" />
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold text-center text-white mb-2">
          Password Leak Detector
        </h1>
        <p className="text-sm text-center text-gray-400 mb-8">
          Check if your password has been compromised in a data breach
        </p>

        <div className="space-y-4">
          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter password to check"
              className="w-full px-4 py-3 rounded-tahoe bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tahoe-accent focus:border-transparent transition-tahoe"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-white transition-tahoe"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Check Button */}
          <button
            onClick={handleCheck}
            disabled={loading || !password.trim()}
            className="w-full py-3 px-6 bg-tahoe-accent hover:bg-tahoe-accent-hover text-white font-medium rounded-full transition-tahoe disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <span>Check Password</span>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-tahoe text-sm text-red-400 animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {/* Info Text */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Your password is checked securely using k-anonymity. Only a partial hash is sent to haveibeenpwned, 
            ensuring your actual password is never transmitted.
          </p>
        </div>
      </div>

      {/* Result Display */}
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

