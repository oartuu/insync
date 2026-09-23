import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
      <div className="flex flex-col gap-2 bg-zinc-200 w-2/3 p-4 rounded-xl">
        <h1 className="text-2xl font-bold">Cadastro</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">nome *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="text"
            placeholder="Insira o seu nome"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="email"
            placeholder="Insira o seu Email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Senha *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="password"
            placeholder="Insira o sua Senha"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Confirmar senha *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="password"
            placeholder="Insira o sua Senha"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Telefone *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="text"
            placeholder="Insira o seu Telefone"
          />
        </div>

        <Button className="justify-between" variant="default" size="lg">
          Criar <ArrowRight />
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Já tem uma conta?{" "}
          <a
            href="/auth/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}

export default page;
