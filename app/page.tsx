"use client";
import EventCard from "@/components/eventCard";
import FooterNav from "@/components/footerNav";
import NullEventCard from "@/components/nullEventCard";
import TopMenu from "@/components/topMenu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { User as UserType } from "@/types/user";

import {
  ArrowRight,
  Bell,
  CalendarPlus,
  EllipsisVertical,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

export default function Home() {
  const [userData, setUserData] = useState<UserType>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchPosts = async () => {
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
    fetchPosts();
  }, []);

  const onSubmit = async (formData: Inputs) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/group/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name: formData.name,
        }),
      });

      if (!response.ok) {
        return;
      }

      window.location.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };

 
  return (
    <div className="bg-main-background min-h-dvh flex flex-col justify-start">
      <TopMenu />

      {userData ? (   <div className="flex flex-col flex-1">
        {" "}
        <div className="p-4">
          <h1 className="text-zinc-50 text-2xl font-bold">
            Olá, {userData?.name}
          </h1>
          <p className="text-text-red text-sm">
            Pronto para afinar a passagem de som?
          </p>

          {userData!.nextEvent.length > 0 ? (
            <EventCard nextEvent={userData?.nextEvent[0]} />
          ) : (
            <NullEventCard />
          )}
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div>
            <p className="text-text-red">Ações rápidas</p>
          </div>
          <div className="flex justify-between">
            <Dialog>
              <DialogTrigger
                nativeButton={false}
                render={
                  <Item className="bg-card-background hover:bg-card-background/60 hover:cursor-pointer w-[45%] text-zinc-50">
                    <ItemMedia>
                      <div className="bg-brand p-3 rounded-md text-zinc-50">
                        <Users />
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Novo Grupo</ItemTitle>
                    </ItemContent>
                  </Item>
                }
              />

              <DialogContent className="bg-card-background text-zinc-50">
                <DialogHeader className="text-2xl font-bold">
                  Criar Grupo
                </DialogHeader>
                <div className="flex flex-col gap-2 p-4 rounded-xl">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Nome *</label>
                    <input
                      className="py-2 px-3 bg-dark-background rounded-xs focus:outline-none placeholder:text-zinc-300"
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Insira o nome do grupo"
                    />
                    {errors.name && (
                      <span className="ml-2 text-xs font-light text-red-400">
                        Este campo é obrigatório
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="justify-between bg-brand hover:bg-brand/60 hover:text-zinc-200 transition-all5 text-zinc-50"
                  >
                    Criar <ArrowRight />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger
                nativeButton={false}
                render={
                  <Item className="bg-card-background hover:bg-card-background/60 hover:cursor-pointer w-[45%] text-zinc-50">
                    <ItemMedia>
                      <div className="bg-zinc-500/30 p-3 rounded-md text-text-red">
                        <CalendarPlus />
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Novo Evento</ItemTitle>
                    </ItemContent>
                  </Item>
                }
              />

              <DialogContent className="bg-card-background text-zinc-50">
                <DialogHeader className="text-2xl font-bold">
                  Criar Evento
                </DialogHeader>
                <div className="flex flex-col gap-2 p-4 rounded-xl">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Nome *</label>
                    <input
                      className="py-2 px-3 bg-dark-background rounded-xs focus:outline-none placeholder:text-zinc-300"
                      type="name"
                      {...register("name", { required: true })}
                      placeholder="Insira o nome"
                    />
                    {errors.name && (
                      <span className="ml-2 text-xs font-light text-red-400">
                        Este campo é obrigatório
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="local">Local *</label>
                    <input
                      className="py-2 px-3 bg-dark-background rounded-xs focus:outline-none placeholder:text-zinc-300"
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Insira o Local"
                    />
                    {errors.name && (
                      <span className="ml-2 text-xs font-light text-red-400">
                        Este campo é obrigatório
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date">Data *</label>
                    <input
                      className="py-2 px-3 bg-dark-background rounded-xs focus:outline-none placeholder:text-zinc-300"
                      type="date"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="ml-2 text-xs font-light text-red-400">
                        Este campo é obrigatório
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="group">Grupo *</label>
                    <input
                      className="py-2 px-3 bg-dark-background rounded-xs focus:outline-none placeholder:text-zinc-300"
                      type="select"
                      {...register("name", { required: true })}
                      placeholder="Selecione o Grupo"
                    />
                    {errors.name && (
                      <span className="ml-2 text-xs font-light text-red-400">
                        Este campo é obrigatório
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="justify-between bg-brand hover:bg-brand/60 hover:text-zinc-200 transition-all5 text-zinc-50"
                  >
                    Criar <ArrowRight />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="text-text-red">Meus Grupos</p>
            <div className="rounded-full bg-card-background py-1 px-3 text-text-red">
              {userData?.groups.length}
            </div>
          </div>
          {userData?.groups.map((g) => (
            <a key={g.id} href={`/group/${g.id}`}>
              <Item className="bg-card-background text-zinc-50">
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
      </div> ) : ( <div className="flex flex-1 justify-center items-center text-zinc-50 text-xl font-bold">
        Carregando...
      </div>)}

      <FooterNav />
    </div>
  );
}

