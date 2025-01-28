import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation"; // Supondo que você já tenha um schema definido
import React, { useState } from "react";
import clsx from "clsx";
import VisibilityPassword from "./VisibilityPassword";

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

    const onSubmit = (data: RegisterSchema) => {
        console.log("Dados enviados:", data);
        router.push('verify-email');
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Crie a sua conta</h2>
                <p>Um evento exclusivo para advogados. Registre-se e venha jogar conosco.</p>
            </div>
            {/* Nome completo */}
            <div>
                <div className="relative">
                    <input
                        {...register("fullName")}
                        type="text"
                        className={clsx("block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                            errors.fullName ? "border-red-500" : "border-gray-300"
                        )}
                        placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nome completo</label>
                </div>
                {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
            </div>
            {/* Email */}
            <div>
                <div className="relative">
                    <input
                        {...register("email")}
                        type="email"
                        className={clsx("block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                            errors.email ? "border-red-500" : "border-gray-300"
                        )}
                        placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">E-mail</label>
                </div>
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            {/* Código OAB */}
            <div>
                <div className="relative">
                    <input
                        {...register("oabCode")}
                        type="text"
                        className={clsx("block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                            errors.oabCode ? "border-red-500" : "border-gray-300"
                        )}
                        placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Código OAB</label>
                </div>
                {errors.oabCode && <span className="text-red-500 text-sm">{errors.oabCode.message}</span>}
            </div>
            {/* Senha */}
            <div>
                <div className="relative">
                    <input
                        {...register("password")}
                        type={clsx(visiblePassword ? "text" : "password")}
                        className={clsx("block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                            errors.password ? "border-red-500" : "border-gray-300"
                        )}
                        placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Senha</label>
                    {/* Visibilidade da senha */}
                    <VisibilityPassword onToggle={setVisiblePassword} />
                </div>
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            {/* Confirmação de Senha */}
            <div>
                <div className="relative">
                    <input
                        {...register("confirmPassword")}
                        type={clsx(visibleConfirmPassword ? "text" : "password")}
                        className={clsx("block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                            errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        )}
                        placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirme sua senha</label>
                    {/* Visibilidade da senha */}
                    <VisibilityPassword onToggle={setVisibleConfirmPassword} />
                </div>
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Criar conta
            </button>
        </form>
    );
}
