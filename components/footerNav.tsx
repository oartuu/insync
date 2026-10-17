import { CalendarDays, CircleUserRound, LayoutGrid, UserRoundGroup } from "lucide-react";


export default function FooterNav() {
  return (
    <div className=" bg-dark-background flex justify-evenly w-full items-center p-4 shadow-md text-zinc-50">
      <div className="flex flex-col text-brand items-center gap-3">
        <LayoutGrid />
        <span className="text-xs">Início</span>
      </div>

      <div className="flex flex-col  items-center gap-3">
        <UserRoundGroup />
        <span className="text-xs">Grupos</span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <CalendarDays/>
        <span className="text-xs">Eventos</span>
      </div>

      <div className="flex flex-col  items-center gap-3">
        <CircleUserRound/>
        <span className="text-xs">Perfil</span>
      </div>
    </div>
  );
}
