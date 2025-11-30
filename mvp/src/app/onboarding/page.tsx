'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/**
 * Onboarding Page - Set preferences after signup
 */
export default function OnboardingPage() {
  const { user, updateUser, isLoading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    preferredRoles: [] as string[],
    preferredLocations: [] as string[],
    internshipType: [] as string[],
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Parse resume and extract skills
  const handleResumeSubmit = async () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume text');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, userEmail: user?.email }),
      });

      const data = await response.json();

      if (data.success) {
        setExtractedSkills(data.data.skills);
        setStep(2);
      } else {
        setError(data.error || 'Failed to parse resume');
      }
    } catch (err) {
      setError('An error occurred while parsing your resume');
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle a preference option
  const togglePreference = (category: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value],
    }));
  };

  // Complete onboarding
  const handleComplete = async () => {
    setIsProcessing(true);
    setError('');

    try {
      await updateUser({
        preferences,
        skills: extractedSkills,
        resumeText,
        onboardingComplete: true,
      });

      router.push('/dashboard');
    } catch (err) {
      setError('Failed to save preferences');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
      </div>
    );
  }

  const roleOptions = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'fullstack', label: 'Full Stack Development' },
    { value: 'data-science', label: 'Data Science / ML' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps / Cloud' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'product', label: 'Product Management' },
  ];

  const locationOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'chennai', label: 'Chennai' },
  ];

  const typeOptions = [
    { value: 'summer', label: 'Summer Internship' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'co-op', label: 'Co-op Program' },
  ];

  return (
    <main className="page" style={{ minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        {/* Progress Indicator */}
        <div className="mb-8 text-center">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: step >= 1 ? 'var(--color-primary)' : 'var(--color-gray-300)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              1
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: step >= 2 ? 'var(--color-primary)' : 'var(--color-gray-300)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              2
            </div>
          </div>
          <p className="text-muted">Step {step} of 2</p>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            {error}
          </div>
        )}

        {/* Step 1: Resume Upload */}
        {step === 1 && (
          <div className="card">
            <h2 className="mb-4">📄 Upload Your Resume</h2>
            <p className="text-muted mb-6">
              Paste your resume text below. We'll automatically extract your skills.
            </p>

            <div className="form-group">
              <label className="form-label">Resume Text</label>
              <textarea
                className="form-textarea"
                style={{ minHeight: '300px' }}
                placeholder="Paste your resume content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <p className="form-hint">
                Tip: Copy the text from your resume PDF or Word document
              </p>
            </div>

            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={handleResumeSubmit}
              disabled={isProcessing || !resumeText.trim()}
            >
              {isProcessing ? 'Analyzing...' : 'Analyze Resume'}
            </button>

            <div className="alert alert-info mt-6">
              <strong>🎓 Workshop Note:</strong> This uses keyword matching to extract skills. 
              In production, you could use OpenAI or a specialized resume parsing API for better accuracy.
            </div>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 2 && (
          <div className="card">
            <h2 className="mb-4">🎯 Set Your Preferences</h2>

            {/* Extracted Skills */}
            {extractedSkills.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-2">Extracted Skills</h4>
                <div className="skill-tags">
                  {extractedSkills.map(skill => (
                    <span key={skill} className="skill-tag matched">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Role Preferences */}
            <div className="form-group">
              <label className="form-label">Preferred Roles (select all that apply)</label>
              <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {roleOptions.map(option => (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences.preferredRoles.includes(option.value)}
                      onChange={() => togglePreference('preferredRoles', option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Location Preferences */}
            <div className="form-group">
              <label className="form-label">Preferred Locations</label>
              <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {locationOptions.map(option => (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences.preferredLocations.includes(option.value)}
                      onChange={() => togglePreference('preferredLocations', option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Internship Type */}
            <div className="form-group">
              <label className="form-label">Internship Type</label>
              <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {typeOptions.map(option => (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences.internshipType.includes(option.value)}
                      onChange={() => togglePreference('internshipType', option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="btn btn-primary btn-full btn-lg"
                onClick={handleComplete}
                disabled={isProcessing}
              >
                {isProcessing ? 'Saving...' : 'Complete Setup'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
