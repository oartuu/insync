"use client";
import FooterNav from "@/components/footerNav";
import GroupMenu from "@/components/groupMenu";
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
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Clipboard, EllipsisVertical, Plus, PlusCircle, UserRoundPlus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Group = {
  id: string;
  authorId: string;
  planId: any;
  name: string;
  paymentStatus: any;
  createdAt: string;
  members: Member[];
  events: any[];
};

type Member = {
  id: string;
  groupId: string;
  userId: string;
  accessLevel: string;
  status: string;
  function: string[];
  user: User;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

type Inputs = {
  name: string;
};

export default function Home({ params }: PageProps) {
  const { id } = use(params);
  const [group, setGroup] = useState<Group>();
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const link = `http://localhost:3000/group/join/${group?.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Erro ao copiar o texto: ", err);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/group/list", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Group[] = await res.json();

      const group = data.find((g) => g.id.includes(id));

      console.log(group);
      setGroup(group);
    };
    fetchPosts();
  }, []);

  const onSubmit = () => {};

  return (
    <div className="bg-main-background min-h-dvh flex flex-col justify-start">
      <GroupMenu groupName={group?.name} />

      {group?.name ? (
        <div className="flex flex-col items-center flex-1 p-4">
          <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
            <div className="text-zinc-50 w-[80%] bg-card-background flex items-center justify-evenly gap-4 py-4 shadow-2xs rounded-lg border border-zinc-700">
              <div className="flex flex-col items-center">
                <span className="font-bold text-brand">
                  {group.members.length}
                </span>{" "}
                membros
              </div>
              <Separator orientation="vertical" className="bg-zinc-700" />
              <div className="flex flex-col items-center">
                <span className="font-bold text-brand">
                  {group.events.length}
                </span>{" "}
                eventos
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Dialog>
                <DialogTrigger
                  render={
                    <Button className="justify-between items-center bg-brand hover:bg-brand/60 hover:text-zinc-200 transition-all5 text-zinc-50">
                      <PlusCircle />
                      Novo Evento
                    </Button>
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

              <Dialog>
                <DialogTrigger
                  render={
                    <Button className="justify-between bg-zinc-900 hover:zinc-900/60 hover:text-zinc-200 transition-all5 text-zinc-50">
                      <UserRoundPlus />
                      Convidar Membros
                    </Button>
                  }
                />

                <DialogContent className="bg-card-background text-zinc-50">
                  <DialogHeader className="text-2xl font-bold">
                    Link de Convite:
                  </DialogHeader>
                  <div className="flex flex-col gap-2 p-4 rounded-xl">
                    <div className="flex flex-col gap-2">
                      <input
                        className="py-2 px-3 border border-zinc-700 rounded-md focus:outline-none shadow-md "
                        type="text"
                        readOnly
                        value={link}
                      />
                    </div>

                    <Button
                      onClick={handleCopy}
                      className="justify-between items-center bg-brand hover:bg-brand/60 hover:text-zinc-200 transition-all5 text-zinc-50 w-full"
                      variant="default"
                      size="lg"
                    >
                      Copiar <Clipboard />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-3xl text-zinc-50 mt-8">
            <div className="flex items-center gap-2 self-start">
              <span className="font-bold text-brand text-xl">•</span>
              <h2 className="font-bold">Próximo Evento</h2>
            </div>
            <NullEventCard />
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-3xl text-zinc-50 mt-8">
            <div className="flex items-center gap-2 self-start">
              <span className="font-bold text-brand text-xl">•</span>
              <h2 className="font-bold">Membros</h2>
            </div>

            {group.members.map((member) => (
              <Item key={member.id} className="bg-card-background text-zinc-50">
                <ItemMedia>
                  <div className="bg-zinc-500/30 py-4 px-5 rounded-md text-zinc-50 uppercase font-bold">
                    {member.user.name.charAt(0)}
                  </div>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{member.user.name}</ItemTitle>
                  <ItemDescription className="text-text-red">
                    {member.function}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <EllipsisVertical className="text-text-red" />
                </ItemActions>
              </Item>
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
