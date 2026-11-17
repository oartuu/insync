import { Event } from "@/types/group";
import { ArrowRight, CalendarPlus, Navigation, Plus, Timer } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

export default function NullEventCard() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();
  

    const onSubmit = () =>{}

  return (
    <div className="bg-card-background rounded-md p-4 text-zinc-50 mt-2 relative min-h-28 overflow-hidden">
      <div className="w-16 h-16 bg-brand/90 absolute blur-3xl rounded-full -right-2 -top-1 "></div>
      <div className="flex justify-between">
        <p className="font-bold text-xl">Nenhum evento encontrado</p>
      </div>
      <div className="flex flex-col justify-between mt-2 gap-2">
        <div className="flex justify-between gap-2">
              <Dialog>
                <DialogTrigger 
                  render={
                   <Button className="justify-between items-center bg-brand hover:bg-brand/60 hover:text-zinc-200 transition-all5 text-zinc-50 w-full">
              Novo Evento <Plus /> </Button>
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
    </div>
  );
}
