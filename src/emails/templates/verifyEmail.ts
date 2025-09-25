import { renderLayout } from './layout';

export function renderVerifyEmailTemplate(verifyUrl: string): string {
  return renderLayout({
    title: 'Verify your email',
    previewText: 'Complete your signup by verifying your email',
    heading: 'Verify your email',
    body: `<p>Thanks for signing up! Please verify your email address to activate your account.</p>`,
    ctaText: 'Verify Email',
    ctaUrl: verifyUrl,
  });
}
