import { PoppyLanding } from "@/components/PoppyLanding";
import { currentEventDay } from "@/lib/event-dates";

export default function Page() {
  return <PoppyLanding initialLanguage="pl" initialEventDay={currentEventDay()} />;
}
