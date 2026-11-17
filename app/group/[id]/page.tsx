"use client";
import FooterNav from "@/components/footerNav";
import GroupMenu from "@/components/groupMenu";
import TopMenu from "@/components/topMenu";
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
    <div className="bg-main-background min-h-dvh flex flex-col justify-start">
      <GroupMenu groupName={group?.name} />

      <div className="flex flex-col flex-1">

        aaaaaa
      </div>

      <FooterNav/>
    </div>
  );
}
