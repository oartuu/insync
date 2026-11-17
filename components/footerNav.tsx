import {
  CalendarDays,
  CircleUserRound,
  LayoutGrid,
  UserRoundGroup,
} from "lucide-react";

import Link from "next/link";

// Definimos os tipos possíveis para a página ativa
type ActivePage = "home" | "groups" | "events" | "profile";

interface FooterNavProps {
  activePage: ActivePage;
}

export default function FooterNav({ activePage }: FooterNavProps) {
  return (
    <div className="bg-dark-background flex justify-evenly w-full items-center p-4 shadow-md text-zinc-50">
      {/* Início */}
      <Link href="/">
        <div
          className={`flex flex-col items-center gap-3 ${
            activePage === "home" ? "text-brand" : "text-zinc-400"
          }`}
        >
          <LayoutGrid />
          <span className="text-xs">Início</span>
        </div>
      </Link>

      {/* Grupos */}
      <Link href="/group">
        <div
          className={`flex flex-col items-center gap-3 ${
            activePage === "groups" ? "text-brand" : "text-zinc-400"
          }`}
        >
          <UserRoundGroup />
          <span className="text-xs">Grupos</span>
        </div>
      </Link>

      {/* Eventos */}
      <Link href="#">
        <div
          className={`flex flex-col items-center gap-3 ${
            activePage === "events" ? "text-brand" : "text-zinc-700"
          }`}
        >
          <CalendarDays />
          <span className="text-xs">Eventos</span>
        </div>
      </Link>

      {/* Perfil */}
      <Link href="#">
        <div
          className={`flex flex-col items-center gap-3 ${
            activePage === "profile" ? "text-brand" : "text-zinc-700"
          }`}
        >
          <CircleUserRound />
          <span className="text-xs">Perfil</span>
        </div>
      </Link>
    </div>
  );
}
