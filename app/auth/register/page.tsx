'use client'
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit = async (formData: Inputs) => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirmation: formData.confirmPassword,
          phone: formData.phone,
        }),
      });


      if (!response.ok) {
        return;
      }

     
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
      <div className="flex flex-col gap-2 bg-zinc-200 w-2/3 p-4 rounded-xl">
        <h1 className="text-2xl font-bold">Cadastro</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nome *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="text"
            {...register("name", { required: true })}
            placeholder="Insira o seu nome"
          />
          {errors.name && (
            <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
              Este campo é obrigatório
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="email"
            {...register("email", { required: true })}
            placeholder="Insira o seu Email"
          />
          {errors.email && (
            <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
              Este campo é obrigatório
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Senha *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="password"
            {...register("password", { required: true })}
            placeholder="Insira o sua Senha"
          />
          {errors.password && (
            <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
              Este campo é obrigatório
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirmar senha *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Insira o sua Senha"
          />
          {errors.confirmPassword && (
            <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
              Este campo é obrigatório
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Telefone *</label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
            type="text"
            {...register("phone", { required: true })}
            placeholder="Insira o seu Telefone"
          />
          {errors.phone && (
            <span className="ml-2 text-xs font-light text-red-600 dark:text-red-400">
              Este campo é obrigatório
            </span>
          )}
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          className="justify-between mt-3"
          variant="default"
          size="lg"
        >
          Criar Conta <ArrowRight />
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
