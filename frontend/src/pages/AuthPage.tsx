// import { useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Card } from '../components/ui/card';
// import { loginUser, signupUser, saveAuthSession, getStoredAuth } from '../lib/auth';
// import { toast } from 'sonner';

// export function AuthPage({ mode = 'login' }: { mode?: 'login' | 'signup' }) {
//   const [isLogin, setIsLogin] = useState(mode === 'login');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     setIsLogin(mode === 'login');
//   }, [mode]);

//   useEffect(() => {
//     const session = getStoredAuth();
//     if (session) {
//       navigate('/check-cibil', { replace: true });
//     }
//   }, [navigate]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const session = isLogin
//         ? await loginUser(email, password)
//         : await signupUser(name, email, password);

//       saveAuthSession(session);
//       toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');

//       const from = (location.state as { from?: string } | null)?.from || '/check-cibil';
//       navigate(from, { replace: true });
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : 'Authentication failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-4 py-16">
//       <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row">
//         <div className="max-w-xl space-y-6 text-center lg:text-left">
//           <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
//             <ShieldCheck size={16} />
//             Secure customer access
//           </div>
//           <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
//             {isLogin ? 'Welcome back' : 'Create your customer account'}
//           </h1>
//           <p className="text-lg text-muted-foreground">
//             Sign in or create an account to unlock your CIBIL score, track your profile, and access a smoother customer experience.
//           </p>
//           <div className="rounded-2xl border bg-white/80 p-6 shadow-sm">
//             <p className="text-sm font-medium text-foreground">Why customers use this account</p>
//             <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
//               <li>• Save your progress and return anytime</li>
//               <li>• Securely access your CIBIL score details</li>
//               <li>• Get a faster, personalized experience</li>
//             </ul>
//           </div>
//         </div>

//         <Card className="w-full max-w-md border-0 shadow-2xl">
//           <div className="p-6 sm:p-8">
//             <div className="mb-6 flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-semibold">{isLogin ? 'Login' : 'Sign up'}</h2>
//                 <p className="text-sm text-muted-foreground">
//                   {isLogin ? 'Use your customer account to continue' : 'Fill in your details to get started'}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => navigate(isLogin ? '/signup' : '/login')}
//                 className="text-sm font-medium text-primary"
//               >
//                 {isLogin ? 'Create account' : 'Sign in'}
//               </button>
//             </div>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full name</Label>
//                   <Input
//                     id="name"
//                     value={name}
//                     onChange={(event) => setName(event.target.value)}
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email address</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(event) => setEmail(event.target.value)}
//                   placeholder="you@example.com"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create account'}
//               </Button>
//             </form>

//             <p className="mt-6 text-center text-sm text-muted-foreground">
//               By continuing you agree to our{' '}
//               <Link to="/terms" className="text-primary">Terms</Link> and{' '}
//               <Link to="/privacy" className="text-primary">Privacy Policy</Link>
//             </p>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
