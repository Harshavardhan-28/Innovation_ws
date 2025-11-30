'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Signup Page
 */
export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    degree: '',
    graduationYear: new Date().getFullYear() + 2,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        college: formData.college,
        degree: formData.degree,
        graduationYear: formData.graduationYear,
      });
      
      if (result.success) {
        router.push('/onboarding');
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  return (
    <main className="page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="card">
          <div className="text-center mb-6">
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>🎯 Create Account</h1>
            <p className="text-muted mt-2">Join InternScout AI and find your perfect internship</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="you@college.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-input"
                  placeholder="At least 6 chars"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-input"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="college">College/University</label>
              <input
                id="college"
                name="college"
                type="text"
                className="form-input"
                placeholder="e.g., IIT Delhi"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="degree">Degree</label>
                <input
                  id="degree"
                  name="degree"
                  type="text"
                  className="form-input"
                  placeholder="e.g., B.Tech CS"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="graduationYear">Graduation Year</label>
                <select
                  id="graduationYear"
                  name="graduationYear"
                  className="form-select"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  required
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full btn-lg mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted">
              Already have an account?{' '}
              <Link href="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
