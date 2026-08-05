const STORAGE_AUTH_KEY = 'loansbuzz_auth';
const STORAGE_TOKEN_KEY = 'loansbuzz_token';
const STORAGE_USER_KEY = 'loansbuzz_user';
const AUTH_CHANGE_EVENT = 'loansbuzz-auth-changed';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL
  return configuredUrl.replace(/\/$/, '');
}

export const API_BASE_URL = getApiBaseUrl();

// Internal: wipes storage without dispatching the change event. Used by
// clearAuthSession() when the user explicitly logs out.
function clearAuthStorageSilently() {
  window.localStorage.removeItem(STORAGE_AUTH_KEY);
  window.localStorage.removeItem(STORAGE_TOKEN_KEY);
  window.localStorage.removeItem(STORAGE_USER_KEY);
}

function readSessionFromLegacyStorage(): AuthSession | null {
  const token = window.localStorage.getItem(STORAGE_TOKEN_KEY);
  const user = window.localStorage.getItem(STORAGE_USER_KEY);

  if (!token || !user) {
    return null;
  }

  if (token === 'undefined' || token === 'null' || user === 'undefined' || user === 'null') {
    return null;
  }

  try {
    return { token, user: JSON.parse(user) as AuthUser };
  } catch {
    return null;
  }
}

export function getStoredAuth(): AuthSession | null {
  const savedAuth = window.localStorage.getItem(STORAGE_AUTH_KEY);

  if (savedAuth) {
    try {
      const parsed = JSON.parse(savedAuth) as Partial<AuthSession>;
      if (parsed?.token && parsed?.user) {
        return { token: parsed.token, user: parsed.user };
      }
    } catch {
      // Fall back to the legacy key format below.
    }
  }

  const legacySession = readSessionFromLegacyStorage();

  if (legacySession) {
    saveAuthSession(legacySession);
  }

  return legacySession;
}

export function getAuthToken(): string | null {
  return getStoredAuth()?.token ?? null;
}

export function saveAuthSession(session: AuthSession) {
  console.log("========== SAVE AUTH ==========");
  console.log("Session:", session);

  if (!session || !session.token) {
    console.log("Invalid session");
    return;
  }

  localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(session));
  localStorage.setItem(STORAGE_TOKEN_KEY, session.token);
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(session.user));

  console.log(
    "Stored Token:",
    localStorage.getItem(STORAGE_TOKEN_KEY)
  );

  console.log(
    "Stored User:",
    localStorage.getItem(STORAGE_USER_KEY)
  );

  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));

  console.log("========== END SAVE ==========");
}
export function clearAuthSession() {
  clearAuthStorageSilently();
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

// Components (e.g. Navbar) should listen to this in addition to 'storage'
// to catch same-tab login/logout, not just cross-tab changes.
export { AUTH_CHANGE_EVENT };

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      (data as { message?: string; error?: string }).message ||
      (data as { message?: string; error?: string }).error ||
      `Request failed with status ${response.status}`;

    throw new Error(errorMessage);
  }

  if ((data as { success?: boolean }).success === false) {
    const errorMessage =
      (data as { message?: string; error?: string }).message ||
      (data as { message?: string; error?: string }).error ||
      'Authentication request was rejected by the server.';

    throw new Error(errorMessage);
  }

  return data as T;
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthSession> {

  console.log("LOGIN START");

  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  console.log("Status:", response.status);

  const data = await parseResponse<{
    token?: string;
    accessToken?: string;
    user?: AuthUser;
    success?: boolean;
    error?: string;
    message?: string;
  }>(response);

  console.log("Response:", data);

  const token = data.token || data.accessToken;

  if (!token || !data.user) {
    throw new Error(data.message || data.error || 'No authentication token received from server.');
  }

  const session: AuthSession = {
    token,
    user: data.user,
  };

  console.log("Before Save");

  saveAuthSession(session);

  console.log("After Save");

  return session;
}
export async function signupUser(
  name: string,
  email: string,
  password: string
): Promise<AuthSession> {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await parseResponse<{
    token?: string;
    accessToken?: string;
    user?: AuthUser;
    success?: boolean;
    error?: string;
    message?: string;
  }>(response);

  const token = data.token || data.accessToken;

  if (!token || !data.user) {
    throw new Error(data.message || data.error || 'No authentication token received from server.');
  }

  const session: AuthSession = { token, user: data.user };
  saveAuthSession(session);
  return session;
}

export async function requestPasswordOtp(
  email: string
): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  return parseResponse<{ message: string }>(response);
}

export async function verifyPasswordOtp(
  email: string,
  otp: string
): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });

  return parseResponse<{ message: string }>(response);
}

export async function resetPassword(
  email: string,
  otp: string,
  password: string
): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp, password }),
  });

  return parseResponse<{ message: string }>(response);
}

export async function getCurrentUser(token?: string): Promise<AuthUser | null> {
  const activeToken = token || getStoredAuth()?.token;

  if (!activeToken || activeToken === 'undefined') {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${activeToken}` },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json().catch(() => ({}));
  return (data as { user?: AuthUser }).user || null;
}