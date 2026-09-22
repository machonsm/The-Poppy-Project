const warsawDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Warsaw",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function eventDay(date: Date): string {
  const parts = warsawDate.formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)!.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function isUpcomingEvent(event: { date: string; endDate?: string }, today: string): boolean {
  return eventDay(new Date(event.endDate ?? event.date)) >= today;
}

export const currentEventDay = () => eventDay(new Date());
// A static export cannot know the visitor's date. Wait for the browser clock.
export const serverEventDay = () => "";

export function subscribeEventDay(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, 30_000);
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}
