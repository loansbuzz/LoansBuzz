import jwt from "jsonwebtoken";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

const TOKEN_KEY = "loan_admin_user";
const JWT_SECRET = process.env.JWT_SECRET!; // set in .env — never commit this

if (!JWT_SECRET && typeof window === "undefined") {
  // Only matters server-side; the client bundle never sees this file's
  // server-only functions since Next.js tree-shakes unused server code,
  // but warn loudly in case it's actually missing at runtime.
  console.warn("JWT_SECRET is not set — token signing/verification will fail");
}

// --- Server-side: sign and verify JWTs ---

export function signToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}
export function verifyToken(token: string): AuthUser | null {
  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthUser;

    console.log("Decoded:", decoded);

    return decoded;
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    return null;
  }
}
// --- Client-side: store/retrieve the token in localStorage ---
// Keeps the same TOKEN_KEY and function names your app already calls,
// so existing saveAuth(user) / getAuth() / clearAuth() call sites don't
// need to change — only what's stored under the hood changes (a signed
// JWT string instead of a plain JSON user object).

export function saveAuth(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export  function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

// Client-side convenience: decode the JWT payload WITHOUT verifying it
// (verification only ever happens server-side, where the secret lives).
// This is fine for UI purposes (showing the user's name, checking "am I
// logged in") but must never be trusted for authorization decisions.
export  function getAuth(): AuthUser | null {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { id: payload.id, name: payload.name, email: payload.email };
  } catch {
    clearAuth();
    return null;
  }
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}