'use client'
import { recoverPassword } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RecoverPasswordSchema = z.infer<typeof recoverPassword>;

interface VisibilityPasswordProps {
    onToggle: (visible: boolean) => void;
};

export default function RecoverPasswordForm({onToggle}: VisibilityPasswordProps) {
    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<RecoverPasswordSchema>({
            resolver: zodResolver(recoverPassword),
        });
    
        const onSubmit = (data: RecoverPasswordSchema) => {
            console.log("Dados enviados:", data);
            onToggle(true);
        };

    return (
        <div className="max-w-[460px]">
            <div className="flex flex-col items-center">
                <h2>Recupere a sua senha</h2>
                <p>Digite o e-mail que você usou quando se inscreveu para recuperar sua senha. Você receberá um link de redefinição de senha.</p>
            </div>
            {/* Input para recuperação da senha */}
            <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit(onSubmit)}>
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
                {errors.email && <span className="text-red-500 w-full text-left text-sm">{errors.email.message}</span>}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Recuperar senha</button>
            </form>
        </div>
    )
}