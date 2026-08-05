import { AuthForm } from '../components/AuthForm';

export function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <div className="flex justify-center">
          <AuthForm mode="signup" />
        </div>
      </div>
    </div>
  );
}