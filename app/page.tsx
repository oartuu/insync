'use client';
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Group = {
  id: string;
  authorId: string;
  planId: any;
  name: string;
  paymentStatus: any;
  createdAt: string;
  members: Member[];
}

type Member = {
  id: string;
  groupId: string;
  userId: string;
  accessLevel: string;
  status: string;
  function: string[];
  user: User;
}

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
}

type Inputs ={
  name: string
}

export default function Home() {

  const [groups, setGroups] = useState<Group[]>([]);
 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm<Inputs>();
 
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/group/list", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }

        });
      const data = await res.json();
      console.log(data);
      setGroups(data);
    };
    fetchPosts();
  }, []);

   const onSubmit = async (formData: Inputs) => {
     try {
      const token = localStorage.getItem("token")
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

       window.location.reload()
     } catch (error: any) {
       console.log(error.message);
     }
   };


  return (
    <div className="bg-zinc-900 min-h-dvh flex flex-col justify-start">
      <div className="bg-red-800 flex justify-between w-full items-center p-3 shadow-2xl">
        <p className="text-zinc-50 font-extrabold">InSync</p>

        <Dialog>
          <DialogTrigger
            render={
              <Button variant={"secondary"}>
                Novo grupo <Plus />{" "}
              </Button>
            }
          />

          <DialogContent>
            <DialogHeader>Criar Grupo</DialogHeader>
            <div className="flex flex-col gap-2 p-4 rounded-xl">

              <div className="flex flex-col gap-2">
                <label htmlFor="name">nome *</label>
                <input
                  className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
                  type="email"
                  {...register("name", { required: true })}
                  placeholder="Insira o nome do grupo"
                />
                {errors.name && (
                  <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
                    Este campo é obrigatório
                  </span>
                )}
              </div>

              <Button
                onClick={handleSubmit(onSubmit)}
                className="justify-between"
                variant="default"
                size="lg"
              >
                Criar <ArrowRight />
              </Button>

             
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {groups.map((g) => (
          <Card
            key={g.id}
            className="bg-linear-to-br from-zinc-900 to-zinc-800 text-zinc-50 border border-zinc-600"
          >
            <CardHeader>{g.name}</CardHeader>
            <CardContent>
              <p>Membros: {g.members.length}</p>
              {/* <p>proximo evento: group.nextEvent</p> */}
              <CardAction className="self-end">
                <a href={`/group/${g.id}`}>
                <Button>Mais Detalhes <ArrowRight/> </Button>
                </a>
              </CardAction>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
