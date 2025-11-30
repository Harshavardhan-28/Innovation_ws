'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MatchResult } from '@/types';

/**
 * Dashboard Page - Main view after login
 * Shows matched internships and user profile summary
 */
export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);
  const [error, setError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Redirect to onboarding if not complete
  useEffect(() => {
    if (user && !user.onboardingComplete) {
      router.push('/onboarding');
    }
  }, [user, router]);

  // Fetch matches
  useEffect(() => {
    const fetchMatches = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: user.email }),
        });

        const data = await response.json();

        if (data.success) {
          setMatches(data.data.matches);
        } else {
          setError(data.error || 'Failed to load matches');
        }
      } catch (err) {
        setError('Failed to load internship matches');
      } finally {
        setIsLoadingMatches(false);
      }
    };

    if (user?.onboardingComplete) {
      fetchMatches();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) return null;

  const getScoreClass = (score: number) => {
    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link href="/dashboard" className="nav-logo">🎯 InternScout AI</Link>
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link active">Dashboard</Link>
            <Link href="/onboarding" className="nav-link">Update Profile</Link>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="page">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1>Welcome back, {user.name}!</h1>
            <p className="text-muted mt-2">
              Here are your personalized internship matches based on your skills and preferences.
            </p>
          </div>

          {/* Profile Summary Card */}
          <div className="card mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h3>Your Profile</h3>
                <p className="text-muted">{user.degree} at {user.college}</p>
              </div>
              <Link href="/onboarding" className="btn btn-outline btn-sm">
                Edit Profile
              </Link>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Your Skills</h4>
              <div className="skill-tags">
                {user.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
                {user.skills.length === 0 && (
                  <span className="text-muted">No skills added yet</span>
                )}
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error mb-6">
              {error}
            </div>
          )}

          {/* Matches Section */}
          <h2 className="mb-4">🎯 Your Top Matches</h2>

          {isLoadingMatches ? (
            <div className="loading-page" style={{ minHeight: '200px' }}>
              <div className="spinner"></div>
            </div>
          ) : matches.length > 0 ? (
            <div className="grid" style={{ gap: '1.5rem' }}>
              {matches.map(match => (
                <div key={match.internship.id} className="card internship-card">
                  <div className="internship-card-header">
                    <div className={`score-badge ${getScoreClass(match.score)}`}>
                      {match.score}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ marginBottom: '0.25rem' }}>{match.internship.title}</h3>
                      <div className="company-info">
                        <span>{match.internship.company}</span>
                        <span>•</span>
                        <span>{match.internship.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="internship-card-body">
                    <p className="text-muted text-sm" style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {match.internship.description}
                    </p>

                    <div className="internship-meta">
                      {match.internship.stipend && <span>💰 {match.internship.stipend}</span>}
                      {match.internship.duration && <span>📅 {match.internship.duration}</span>}
                      <span>📋 {match.internship.internshipType}</span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
                      <div className="skill-tags">
                        {match.internship.requiredSkills.map(skill => (
                          <span 
                            key={skill} 
                            className={`skill-tag ${user.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase()) ? 'matched' : ''}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {match.matchReasons.length > 0 && (
                      <ul className="match-reasons">
                        {match.matchReasons.slice(0, 3).map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="internship-card-footer">
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <Link 
                        href={`/internship/${match.internship.id}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                      <a 
                        href={match.internship.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                      >
                        Apply ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3>No matches found</h3>
              <p className="text-muted mt-2">
                Try updating your profile with more skills or adjusting your preferences.
              </p>
              <Link href="/onboarding" className="btn btn-primary mt-4">
                Update Profile
              </Link>
            </div>
          )}

          {/* Workshop Note */}
          <div className="alert alert-info mt-8">
            <strong>🎓 Workshop Note:</strong> The matching scores are calculated using a 
            weighted scoring system (skills: 50pts, role: 20pts, location: 15pts, type: 15pts).
            In production, you would use vector embeddings for semantic matching.
          </div>
        </div>
      </main>
    </>
  );
}
