import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import React, { useState } from "react";
import clsx from "clsx";
import VisibilityPassword from "./VisibilityPassword";

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const [visible, setVisible] = useState<boolean>(false);

    const onSubmit = (data: LoginSchema) => {
        console.log("Dados enviados:", data);
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Faça o seu Login</h2>
                <p>Entre em sua conta para participar conosco! O seu time te espera para jogar.</p>
            </div>
            {/* Email */}
            <div>
                {/* Campo de preenchimento para email */}
                <div className="relative">
                    <input
                        {...register("email")}
                        type="email"
                        className={clsx("block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                            errors.password ? "border-red-500" : "border-gray-300"
                        )}
                        placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
                </div>
                {/* Mensagens de erro */}
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            {/* Senha */}
            <div>
                {/* Campo de preenchimento para senha */}
                <div className="relative">
                    <input
                        {...register("password")}
                        type={clsx(visible ? 'text' : 'password')}
                        className={clsx(`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`,
                            errors.password ? "border-red-500" : "border-gray-300"
                        )}
                        placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Senha</label>
                    {/* Visibilidade da senha */}
                    <VisibilityPassword onToggle={setVisible}/>
                </div>
                {/* Mensagens de Erro */}
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Fazer login</button>
        </form>
    )
}