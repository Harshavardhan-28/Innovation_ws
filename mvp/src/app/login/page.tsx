'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Login Page
 */
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <div className="card">
          <div className="text-center mb-6">
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>🎯 InternScout AI</h1>
            <p className="text-muted mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full btn-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted">
              Don't have an account?{' '}
              <Link href="/signup">Sign up</Link>
            </p>
          </div>

          <div className="alert alert-info mt-6">
            <strong>Demo Account:</strong>
            <br />
            Email: demo@student.edu
            <br />
            Password: demo123
          </div>
        </div>
      </div>
    </main>
  );
}
