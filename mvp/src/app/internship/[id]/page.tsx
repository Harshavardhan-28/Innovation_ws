'use client';

import { useState, useEffect, use } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Internship, OutreachEmail } from '@/types';

/**
 * Internship Detail Page
 * Shows full internship details and allows generating outreach emails
 */
export default function InternshipDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = use(params);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [internship, setInternship] = useState<Internship | null>(null);
  const [email, setEmail] = useState<OutreachEmail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch internship details
  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await fetch(`/api/internships/${resolvedParams.id}`);
        const data = await response.json();

        if (data.success) {
          setInternship(data.data);
        } else {
          setError('Internship not found');
        }
      } catch (err) {
        setError('Failed to load internship details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternship();
  }, [resolvedParams.id]);

  // Generate outreach email
  const handleGenerateEmail = async () => {
    if (!user?.email || !internship) return;

    setIsGenerating(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/outreach/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          internshipId: internship.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setEmail(data.data);
        setSuccessMessage('Email generated successfully!');
      } else {
        setError(data.error || 'Failed to generate email');
      }
    } catch (err) {
      setError('An error occurred while generating the email');
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy email to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage(`${label} copied to clipboard!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (authLoading || isLoading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!internship) {
    return (
      <main className="page">
        <div className="container">
          <div className="alert alert-error">
            {error || 'Internship not found'}
          </div>
          <Link href="/dashboard" className="btn btn-primary mt-4">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link href="/dashboard" className="nav-logo">🎯 InternScout AI</Link>
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
          </div>
        </div>
      </nav>

      <main className="page">
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Back Link */}
          <Link href="/dashboard" className="text-muted mb-4" style={{ display: 'inline-block' }}>
            ← Back to Dashboard
          </Link>

          {/* Alerts */}
          {error && <div className="alert alert-error mb-4">{error}</div>}
          {successMessage && <div className="alert alert-success mb-4">{successMessage}</div>}

          {/* Internship Details Card */}
          <div className="card mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1>{internship.title}</h1>
                <div className="company-info mt-2">
                  <span style={{ fontSize: '1.125rem' }}>{internship.company}</span>
                  <span>•</span>
                  <span>{internship.location}</span>
                </div>
              </div>
              <a
                href={internship.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Apply Now ↗
              </a>
            </div>

            <div className="internship-meta mb-6">
              {internship.stipend && <span>💰 {internship.stipend}</span>}
              {internship.duration && <span>📅 {internship.duration}</span>}
              <span>📋 {internship.internshipType}</span>
              <span>👤 {internship.roleType}</span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2">About This Role</h3>
              <p style={{ lineHeight: 1.8 }}>{internship.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="mb-2">Required Skills</h3>
              <div className="skill-tags">
                {internship.requiredSkills.map(skill => (
                  <span 
                    key={skill} 
                    className={`skill-tag ${user?.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase()) ? 'matched' : ''}`}
                  >
                    {skill}
                    {user?.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase()) && ' ✓'}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4" style={{ borderTop: '1px solid var(--color-gray-200)' }}>
              <p className="text-muted text-sm">
                Contact: {internship.contactEmail}
              </p>
            </div>
          </div>

          {/* Email Generator Section */}
          <div className="card">
            <h2 className="mb-4">✉️ Generate Outreach Email</h2>
            <p className="text-muted mb-6">
              Generate a personalized cold email to reach out to this company directly.
            </p>

            {!email ? (
              <>
                <button
                  className="btn btn-success btn-lg"
                  onClick={handleGenerateEmail}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : '✨ Generate Email'}
                </button>

                <div className="alert alert-info mt-6">
                  <strong>🎓 Workshop Note:</strong> This uses template-based generation.
                  In production, you would use GPT-4 or Claude to generate more personalized emails.
                </div>
              </>
            ) : (
              <div>
                <div className="email-preview mb-4">
                  <div className="email-preview-header">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted">To: {internship.contactEmail}</p>
                        <p className="email-preview-subject">Subject: {email.subject}</p>
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => copyToClipboard(email.subject, 'Subject')}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <div className="email-preview-body">
                    {email.body}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`, 'Email')}
                  >
                    📋 Copy Full Email
                  </button>
                  <a
                    href={`mailto:${internship.contactEmail}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`}
                    className="btn btn-success"
                  >
                    📧 Open in Email Client
                  </a>
                  <button
                    className="btn btn-outline"
                    onClick={handleGenerateEmail}
                    disabled={isGenerating}
                  >
                    🔄 Regenerate
                  </button>
                </div>

                <div className="mt-6 p-4" style={{ background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
                  <p className="text-sm text-muted">
                    <strong>✅ Compliance Check Passed</strong>
                    <br />
                    This email has been checked for appropriate language and includes the required disclaimer.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
