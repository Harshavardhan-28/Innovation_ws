'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Home Page - Landing page for InternScout AI
 * 
 * Shows a welcome message and directs users to login/signup
 * or to dashboard if already logged in.
 */
export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '80px 0',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            🎯 InternScout AI
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
            Find your perfect internship with AI-powered matching. 
            Upload your resume, set your preferences, and let us find the best opportunities for you.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/signup" className="btn btn-lg" style={{ background: 'white', color: '#2563eb' }}>
              Get Started Free
            </Link>
            <Link href="/login" className="btn btn-lg btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              Sign In
            </Link>
          </div>

          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
            Demo account: demo@student.edu / demo123
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container page">
        <h2 className="text-center mb-8">How It Works</h2>
        
        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          <div className="card text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <h3>1. Upload Resume</h3>
            <p className="text-muted mt-2">
              Paste your resume text and we'll extract your skills automatically.
            </p>
          </div>

          <div className="card text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3>2. Set Preferences</h3>
            <p className="text-muted mt-2">
              Tell us what you're looking for - role type, location, and internship type.
            </p>
          </div>

          <div className="card text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
            <h3>3. Get Matched</h3>
            <p className="text-muted mt-2">
              View personalized matches and generate outreach emails with one click.
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Note */}
      <section className="container" style={{ paddingBottom: '4rem' }}>
        <div className="alert alert-info" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <strong>🎓 Workshop MVP Notice:</strong> This is a demonstration MVP built for learning purposes.
          It uses simulated AI matching (not real vector embeddings) and template-based email generation
          (not LLM-powered). The codebase is designed to be readable and extendable.
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: 'var(--color-gray-100)', 
        padding: '2rem 0',
        textAlign: 'center',
        color: 'var(--color-gray-600)',
        fontSize: '0.875rem'
      }}>
        <p>InternScout AI MVP - Built for Workshop Learning</p>
        <p className="mt-2">Phase 1.3 Implementation</p>
      </footer>
    </main>
  );
}
