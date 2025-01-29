import { changePassword } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VisibilityPassword from "../enter/VisibilityPassword";
import clsx from "clsx";
import { useState } from "react";

type ChangePassWordSchema = z.infer<typeof changePassword>;

export default function ChangePasswordForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePassWordSchema>({
        resolver: zodResolver(changePassword)
    });

    const onSubmit = (data: ChangePassWordSchema) => {
        console.log("Dados enviados: ", data);
    }

    // Estados para mudar a visibilidade dos inputs de senha
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

    return (        
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2>Digite a sua nova senha</h2>
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
                        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nova senha</label>
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
                    Confirmar nova senha
                </button>
            </form>        
    )
}