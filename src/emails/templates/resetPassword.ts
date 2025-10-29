import { renderLayout } from './layout';

export function renderResetPasswordTemplate(resetUrl: string): string {
  return renderLayout({
    title: 'Reset your password',
    previewText: 'Reset your password',
    heading: 'Reset your password',
    body: `<p>To reset your password, click the link below:</p>`,
    ctaText: 'Reset Password',
    ctaUrl: resetUrl,
  });
}
