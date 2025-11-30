/**
 * =============================================================================
 * InternScout AI MVP - Safety & Compliance Module
 * =============================================================================
 * 
 * This module ensures outreach emails meet compliance and safety standards.
 * 
 * 🎓 WORKSHOP NOTE:
 * This is a PLACEHOLDER compliance checker. In production, you would:
 * 
 * 1. Implement GDPR compliance:
 *    - Ensure proper consent for data processing
 *    - Include opt-out mechanisms
 *    - Handle data retention policies
 * 
 * 2. Implement CAN-SPAM compliance:
 *    - Include physical address
 *    - Provide unsubscribe option
 *    - Use accurate sender information
 * 
 * 3. Implement India's DPDP Act compliance:
 *    - Clear purpose specification
 *    - Data minimization
 *    - User consent management
 * 
 * 4. Use AI for content moderation:
 *    const moderation = await openai.moderations.create({
 *      input: emailContent
 *    });
 *    if (moderation.results[0].flagged) {
 *      // Handle inappropriate content
 *    }
 * 
 * The current implementation demonstrates the concept with simple rules.
 */

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const CONFIG = {
  maxEmailLength: 2000,        // Maximum characters in email body
  minEmailLength: 100,         // Minimum characters in email body
  maxSubjectLength: 100,       // Maximum subject line length
  requiredDisclaimer: true,    // Whether to require a disclaimer footer
};

/**
 * Words that might indicate spam or unprofessional content
 */
const BLACKLISTED_WORDS = [
  'guaranteed',
  'urgent',
  'act now',
  'limited time',
  'click here',
  'free money',
  'winner',
  'congratulations',
  'prize',
];

/**
 * Disclaimer footer to add to emails
 */
const DISCLAIMER_FOOTER = `
---
This email was generated with assistance from InternScout AI. 
If you received this email in error or wish to opt-out of future communications, 
please reply with "UNSUBSCRIBE" in the subject line.`;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ComplianceCheckResult {
  passed: boolean;
  issues: string[];
  sanitizedBody?: string;
  sanitizedSubject?: string;
}

// -----------------------------------------------------------------------------
// Compliance Functions
// -----------------------------------------------------------------------------

/**
 * Check if email content contains blacklisted words
 */
function checkForBlacklistedWords(text: string): string[] {
  const issues: string[] = [];
  const lowerText = text.toLowerCase();
  
  for (const word of BLACKLISTED_WORDS) {
    if (lowerText.includes(word.toLowerCase())) {
      issues.push(`Contains potentially spam-like phrase: "${word}"`);
    }
  }
  
  return issues;
}

/**
 * Check email length constraints
 */
function checkLength(body: string, subject: string): string[] {
  const issues: string[] = [];
  
  if (body.length > CONFIG.maxEmailLength) {
    issues.push(`Email body too long (${body.length} chars, max ${CONFIG.maxEmailLength})`);
  }
  
  if (body.length < CONFIG.minEmailLength) {
    issues.push(`Email body too short (${body.length} chars, min ${CONFIG.minEmailLength})`);
  }
  
  if (subject.length > CONFIG.maxSubjectLength) {
    issues.push(`Subject line too long (${subject.length} chars, max ${CONFIG.maxSubjectLength})`);
  }
  
  return issues;
}

/**
 * Add required disclaimer footer if not present
 */
function ensureDisclaimer(body: string): string {
  if (CONFIG.requiredDisclaimer && !body.includes('InternScout AI')) {
    return body + DISCLAIMER_FOOTER;
  }
  return body;
}

/**
 * Main compliance check function
 * 
 * 🎓 WORKSHOP NOTE:
 * In production, this function would:
 * - Call an AI moderation API
 * - Check against dynamic compliance rules per jurisdiction
 * - Log all checks for audit purposes
 * - Integrate with legal/compliance team workflows
 */
export function checkCompliance(
  subject: string,
  body: string
): ComplianceCheckResult {
  const issues: string[] = [];
  
  // Check for blacklisted words
  issues.push(...checkForBlacklistedWords(subject));
  issues.push(...checkForBlacklistedWords(body));
  
  // Check length constraints
  issues.push(...checkLength(body, subject));
  
  // Check for required elements
  if (!body.includes('Best regards') && !body.includes('Sincerely') && !body.includes('Thank you')) {
    issues.push('Email should include a professional closing');
  }
  
  // If there are blocking issues, fail the check
  const hasBlockingIssues = issues.some(issue => 
    issue.includes('spam-like') || issue.includes('too long')
  );
  
  if (hasBlockingIssues) {
    return {
      passed: false,
      issues,
    };
  }
  
  // Add disclaimer and return sanitized content
  const sanitizedBody = ensureDisclaimer(body);
  const sanitizedSubject = subject.slice(0, CONFIG.maxSubjectLength);
  
  return {
    passed: true,
    issues: issues.length > 0 ? issues : [],
    sanitizedBody,
    sanitizedSubject,
  };
}

/**
 * Quick check if content is safe (for UI validation)
 */
export function isContentSafe(text: string): boolean {
  const issues = checkForBlacklistedWords(text);
  return issues.length === 0;
}

/**
 * Get compliance configuration (for UI display)
 */
export function getComplianceConfig() {
  return { ...CONFIG };
}
