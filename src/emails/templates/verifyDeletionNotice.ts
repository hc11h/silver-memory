import { renderLayout } from './layout';

export function renderVerifyDeletionNoticeTemplate(): string {
  const subject = `Account deleted due to unverified email`;
  return renderLayout({
    title: subject,
    heading: 'Account Removed',
    body: `<p>Your account was removed because your email was not verified within 5 days. You may re-register anytime.</p>`,
  });
}
