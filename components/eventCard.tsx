import { Event } from "@/types/group";
import { ArrowRight, Navigation, Timer } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface EventCardProps {
  nextEvent?: Event;
}
export default function EventCard({ nextEvent }: EventCardProps) {
  function getDaysRemaining(startDateString: string): number {
    const eventDate = new Date(startDateString);
    const now = new Date();

    const eventDay = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
    );
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = eventDay.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }
  function generateGoogleMapsLink(endereco: string) {
    const queryEncodada = encodeURIComponent(endereco);
    return `https://www.google.com/maps/search/?api=1&query=${queryEncodada}`;
  }

  const mapsLink = generateGoogleMapsLink(nextEvent?.location || "");
  const daysRemaining = getDaysRemaining(nextEvent?.startDate || "");

  function renderDaysText(days: number) {
    if (days < 0) return "Evento já finalizado";
    if (days === 0) return "O evento é hoje!";
    if (days === 1) return "Falta 1 dia";
    return `Faltam ${days} dias`;
  }
  function formatDayAndTime(dateString: string) {
    const data = new Date(dateString);

  
    if (isNaN(data.getTime())) {
      return { diaDaSemana: "", horario: "", textoFormatado: "" };
    }

  
    const dayOfWeek = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
    }).format(data);

    
    const time= new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(data);

    
    const dayOfWeekCapitalized =
      dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    return {
      dayOfWeek: dayOfWeekCapitalized,
      time: time,
      formattedText: `${dayOfWeekCapitalized} às ${time}`,
    };
  }

  const {formattedText} = formatDayAndTime(nextEvent?.startDate || "");

  return (
    <div className="bg-card-background rounded-md p-4 text-zinc-50 mt-2 relative min-h-28 overflow-hidden">
      <div className="w-16 h-16 bg-brand/90 absolute blur-3xl rounded-full -right-2 -top-1 "></div>
      <div className="flex justify-between">
        <p className="font-bold text-xl">Evento ao Vivo</p>
        <div className="flex text-sm text-text-red gap-2 items-center">
          <Timer size={16} />
          <p>{renderDaysText(daysRemaining)}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-2 gap-2">
        <div className="flex gap-1 items-baseline">
          {" "}
          <p className="font-semibold text-lg">{nextEvent?.name} • </p>
          <p className="text-sm text-text-red">{formattedText}</p>
        </div>

        <div className="flex justify-between gap-2">
          <a className="flex-1 " href={`/event/${nextEvent?.id}`}>
            <Button className="justify-between items-center bg-brand hover:bg-brand/60 hover:text-zinc-200 transition-all5 text-zinc-50 w-full">
              Ver Detalhes do Evento <ArrowRight />
            </Button>
          </a>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer">
            <Button className="justify-between bg-zinc-900 hover:zinc-900/60 hover:text-zinc-200 transition-all5 text-zinc-50">
              <Navigation />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
