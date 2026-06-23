import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('react', () => {
  let loading = false;
  let error = null;
  const setLoading = vi.fn((v) => { loading = v; });
  const setError = vi.fn((v) => { error = v; });
  return {
    useState: vi.fn((init) => {
      if (init === false && loading === false) return [loading, setLoading];
      if (init === null && error === null) return [error, setError];
      return [init, vi.fn()];
    }),
  };
});

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockSignOut = vi.fn();

vi.mock('@/shared/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: (...args) => mockSignIn(...args),
      signUp: (...args) => mockSignUp(...args),
      signOut: (...args) => mockSignOut(...args),
    },
  },
}));

describe('useAuthActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exports a default function', async () => {
    const mod = await import('@/features/auth/lib/useAuthActions');
    expect(typeof mod.default).toBe('function');
  });

  it('returns login, register, exit, loading, error', async () => {
    const mod = await import('@/features/auth/lib/useAuthActions');
    const result = mod.default();
    expect(result).toHaveProperty('login');
    expect(result).toHaveProperty('register');
    expect(result).toHaveProperty('exit');
    expect(result).toHaveProperty('loading');
    expect(result).toHaveProperty('error');
  });

  it('login returns data on success', async () => {
    mockSignIn.mockResolvedValue({ data: { user: { id: '1' } }, error: null });
    const mod = await import('@/features/auth/lib/useAuthActions');
    const { login } = mod.default();
    const res = await login('a@b.com', 'pass');
    expect(res.data).toBeTruthy();
    expect(res.error).toBeNull();
  });

  it('login returns error on failure', async () => {
    mockSignIn.mockResolvedValue({ data: null, error: { message: 'Invalid' } });
    const mod = await import('@/features/auth/lib/useAuthActions');
    const { login } = mod.default();
    const res = await login('a@b.com', 'wrong');
    expect(res.data).toBeNull();
    expect(res.error.message).toBe('Invalid');
  });

  it('register calls signUp with metadata', async () => {
    mockSignUp.mockResolvedValue({ data: { user: { id: '1' } }, error: null });
    const mod = await import('@/features/auth/lib/useAuthActions');
    const { register } = mod.default();
    await register('a@b.com', 'pass', 'John', 'Doe');
    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'a@b.com',
      password: 'pass',
      options: { data: { name: 'John', surname: 'Doe' } },
    });
  });

  it('exit calls signOut', async () => {
    mockSignOut.mockResolvedValue({ error: null });
    const mod = await import('@/features/auth/lib/useAuthActions');
    const { exit } = mod.default();
    await exit();
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('handles login exception', async () => {
    mockSignIn.mockRejectedValue(new Error('Network error'));
    const mod = await import('@/features/auth/lib/useAuthActions');
    const { login } = mod.default();
    const res = await login('a@b.com', 'pass');
    expect(res.error).toBeTruthy();
  });
});
