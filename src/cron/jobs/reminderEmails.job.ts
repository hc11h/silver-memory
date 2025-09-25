import { subHours, isWithinInterval } from 'date-fns';
import { sendEmail } from '@/utils';
import { renderLayout } from '@/emails/templates/layout';
import { logger } from '@/utils/logger';

// Placeholder: replace with your actual model and query logic
type EventLike = { id: string; title: string; startAt: Date; participants: { email: string }[] };

async function fetchUpcomingEvents(): Promise<EventLike[]> {
  // TODO: replace with real DB query
  return [];
}

export async function scheduleReminderEmails(): Promise<void> {
  const now = new Date();
  const window72hStart = subHours(now, 72);
  const window24hStart = subHours(now, 24);

  const events = await fetchUpcomingEvents();

  for (const event of events) {
    const is72hWindow = isWithinInterval(event.startAt, {
      start: now,
      end: new Date(now.getTime() + 72 * 60 * 60 * 1000),
    });
    const is24hWindow = isWithinInterval(event.startAt, {
      start: now,
      end: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    });

    const subject = is24hWindow
      ? `Reminder: ${event.title} starts in 24 hours`
      : is72hWindow
        ? `Reminder: ${event.title} starts in 72 hours`
        : '';
    if (!subject) continue;

    const html = renderLayout({
      title: subject,
      heading: subject,
      body: `<p>Your event <strong>${event.title}</strong> is coming up.</p>`,
      ctaText: 'View details',
      ctaUrl: '#',
    });

    for (const participant of event.participants) {
      try {
        await sendEmail({ to: participant.email, subject, html });
      } catch (err) {
        logger.error(
          `Failed to send reminder email to ${participant.email} for event ${event.title}`
        );
      }
    }
  }
}
