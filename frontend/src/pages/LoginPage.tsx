import { AuthForm } from '../components/AuthForm';

export function LoginPage() {
  return (
    // This strictly centers whatever is inside it, vertically and horizontally
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-4">
      <AuthForm mode="login" />
    </div>
  );
}