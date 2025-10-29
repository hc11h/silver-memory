import { renderLayout } from './layout';

export function renderVerifyReminderTemplate(verifyUrl: string, hoursLeft: 24 | 72): string {
  const subject = `Reminder: verify your email (${hoursLeft} hours left)`;
  return renderLayout({
    title: subject,
    heading: 'Please verify your email',
    body: `<p>Your verification link is pending. Complete verification to continue using the platform.</p>`,
    ctaText: 'Verify Email',
    ctaUrl: verifyUrl,
  });
}
