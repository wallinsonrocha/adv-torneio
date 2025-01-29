'use client'
import { useState } from "react"
import clsx from 'clsx';
import LoginForm from "../components/enter/LoginForm";
import RegisterForm from "../components/enter/RegisterForm";
import Link from "next/link";

export default function Login() {
    // State para alternar entre Registr e Login
    const [change, setChange] = useState<boolean>(false);

    function toggleChange() {
        setChange(!change);
    }

    return (
        <section className="overflow-hidden">
            <div className={clsx('w-[200vw] flex transition-all duration-300', change ? '-translate-x-1/2' : '')}>
                {/* Login */}
                <div className="w-1/2 p-4 flex-shrink-0 h-screen grid gap-4 place-content-center">
                    <div className="max-w-[560px] flex flex-col gap-2 bg-white p-8 drop-shadow-md">
                        <LoginForm />
                        <Link href="/recover-password" className="text-sm w-full text-blue-500 font-bold">
                            Esqueci minha senha
                        </Link>
                        <button onClick={toggleChange} >Crie sua conta aqui.</button>
                    </div>
                </div>
                {/* Register */}
                <div className="w-1/2 p-4 flex-shrink-0 h-screen grid gap-4 place-content-center">
                    <div className="max-w-[560px] flex flex-col gap-2 bg-white p-8 drop-shadow-md">
                        <RegisterForm />
                        <button onClick={toggleChange} >Possui conta? Realize o seu Login.</button>
                    </div>
                </div>

            </div>
        </section>
    )
}