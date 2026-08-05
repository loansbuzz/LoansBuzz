import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { loginUser, signupUser, saveAuthSession, getStoredAuth } from '../lib/auth';
import { toast } from 'sonner';

type AuthMode = 'login' | 'signup';

const authText = {
  login: {
    title: 'Login',
    subtitle: 'Use your customer account to continue',
    description: 'Sign in to check your CIBIL score and access your dashboard.',
    alternateText: 'New to Loans Buzz?',
    alternateLink: '/signup',
    alternateLabel: 'Create account',
    submitLabel: 'Login',
  },
  signup: {
    title: 'Sign up',
    subtitle: 'Create a new account to get started',
    description: 'Register with your name, email, and a secure password.',
    alternateText: 'Already have an account?',
    alternateLink: '/login',
    alternateLabel: 'Login',
    submitLabel: 'Create account',
  },
};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const text = authText[mode];

  useEffect(() => {
    const session = getStoredAuth();
    if (session) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const session =
        mode === 'login'
          ? await loginUser(email, password)
          : await signupUser(name, email, password);

      toast.success(mode === 'login' ? 'Logged in successfully!' : 'Account created successfully!');

      const from = (location.state as { from?: string } | null)?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/40 ">
      <div className="p-6 sm:p-8 lg:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Customer access</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{text.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{text.subtitle}</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                required
                className="rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative flex items-center">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border-slate-200 bg-slate-50 py-2.5 pl-4 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Please wait…' : text.submitLabel}
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-slate-200 pt-5 text-sm">
          {mode === 'login' && (
            <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
              Forgot password?
            </Link>
          )}
          <p className="text-slate-600">
            {text.alternateText}{' '}
            <Link to={text.alternateLink} className="font-semibold text-primary hover:underline">
              {text.alternateLabel}
            </Link>
          </p>
          <p className="text-center text-xs text-slate-500">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </Card>
  );
}