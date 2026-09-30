"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item";
import {  Clipboard, Plus } from "lucide-react";
import { use, useEffect, useState } from "react";


type Group = {
  id: string;
  authorId: string;
  planId: any;
  name: string;
  paymentStatus: any;
  createdAt: string;
  members: Member[];
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

export default function Home({params}:PageProps) {
  const {id} = use(params)
  const [group, setGroup] = useState<Group>();
  const [copied, setCopied] =useState(false)

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
      const data:Group[] = await res.json();
     
      const group = data.find((g)=>(
        g.id.includes(id)
      ))

      console.log(group)
      setGroup(group);
    };
    fetchPosts();
  }, []);


  return (
    <div className="bg-zinc-900 min-h-dvh flex flex-col justify-start">
      <div className="bg-red-800 flex justify-between w-full items-center p-3 shadow-2xl">
        <p className="text-zinc-50 font-extrabold">{group?.name}</p>

        <Dialog>
          <DialogTrigger
            render={
              <Button variant={"secondary"}>
                Adicionar <Plus />{" "}
              </Button>
            }
          />

          <DialogContent>
            <DialogHeader>Link de convite:</DialogHeader>
            <div className="flex flex-col gap-2 p-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <input
                  className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
                  type="text"
                  readOnly
                  value={link}
                />
              </div>

              <Button
                onClick={handleCopy}
                className="justify-between"
                variant="default"
                size="lg"
              >
                Copiar <Clipboard />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {group?.members.map((m) => (
          <Item key={m.id} variant="outline" className="border-zinc-700">
            <ItemContent>
              <ItemTitle className="text-zinc-50">{m.user.name}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>
    </div>
  );
}
