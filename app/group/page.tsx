"use client";
import FooterNav from "@/components/footerNav";
import TopMenu from "@/components/topMenu";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User as UserType } from "@/types/user";

export default function page() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/user/data", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        router.push("/auth/login");
      }

      console.log(data);
      setUserData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-main-background min-h-dvh flex flex-col justify-start">
      <TopMenu />

      {userData ? (
        <div className="flex flex-col items-center flex-1 p-4">
          <div className="flex items-center gap-2 self-start text-zinc-50">
            <span className="font-bold text-brand text-xl">•</span>
            <h2 className="font-bold">Grupos</h2>
          </div>

          <div className="flex flex-col gap-2 w-full mt-4">
            {userData?.groups.map((g) => (
              <a key={g.id} href={`/group/${g.id}`}>
                <Item key={g.id} className="bg-card-background text-zinc-50">
                  <ItemMedia>
                    <div className="bg-zinc-500/30 py-4 px-5 rounded-md text-zinc-50 uppercase font-bold">
                      {g.name[0]}
                    </div>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{g.name}</ItemTitle>
                    <ItemDescription className="text-text-red">
                      {g.members.length}{" "}
                      {g.members.length > 1 ? "membros" : "membro"}
                      {g.events.length > 0
                        ? ` • ${g.events.length} ${
                            g.events.length > 1 ? "eventos" : "evento"
                          }`
                        : ""}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <EllipsisVertical className="text-text-red" />
                  </ItemActions>
                </Item>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center text-zinc-50 text-xl font-bold">
          Carregando...
        </div>
      )}

      <FooterNav activePage="groups" />
    </div>
  );
}
