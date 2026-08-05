import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { requestPasswordOtp, verifyPasswordOtp, resetPassword } from '../lib/auth';
import { toast } from 'sonner';

export function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await requestPasswordOtp(email);
      toast.success('OTP sent to your email address.');
      setStep('otp');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await verifyPasswordOtp(email, otp);
      toast.success('OTP verified. Set your new password.');
      setStep('newPassword');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, otp, password);
      toast.success('Password reset successfully.');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/60 px-4 py-10">
      <Card className="w-full max-w-md border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/40 sm:p-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Password reset</p>
          <h1 className="text-2xl font-semibold text-foreground">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground">
            {step === 'email' && 'Enter your registered email to receive an OTP.'}
            {step === 'otp' && 'Enter the OTP sent to your email to continue.'}
            {step === 'newPassword' && 'Set a new password for your account.'}
          </p>
        </div>

        {step === 'email' && (
          <form className="mt-6 space-y-4" onSubmit={handleEmailSubmit}>
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email address</Label>
              <Input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending OTP…' : 'Send OTP'}
            </Button>
          </form>
        )}

        {step === 'otp' && (
          <form className="mt-6 space-y-4" onSubmit={handleOtpSubmit}>
            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                inputMode="numeric"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder="Enter 6-digit OTP"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying…' : 'Verify OTP'}
            </Button>
          </form>
        )}

        {step === 'newPassword' && (
          <form className="mt-6 space-y-4" onSubmit={handleResetSubmit}>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter new password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating…' : 'Reset password'}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-600">
          Back to <Link to="/login" className="font-semibold text-primary hover:underline">Login</Link>
        </p>
      </Card>
    </div>
  );
}
