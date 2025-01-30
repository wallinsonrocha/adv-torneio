'use client'
import { useState } from "react";
import RecoverPasswordForm from "../components/recover-password/RecoverPasswordForm";

export default function RecoverPassword() {

    const [emailSended, setEmailSended] = useState<boolean>(false);

    return (
        <section className="flex flex-col p-4 justify-center items-center text-center w-screen h-screen">
            {
                !emailSended ? (
                    // Componente para enviar email
                    <div className="max-w-[560px] flex flex-col gap-2 bg-white p-8 drop-shadow-md">
                        < RecoverPasswordForm onToggle={setEmailSended} />
                    </div>
                ) :
                    (
                        <div className="max-w-[560px] flex flex-col gap-2 bg-white p-8 drop-shadow-md">
                            <h2>Verifique o seu email</h2>
                            <p>Confirme no seu email o link que foi enviado para você.</p>
                            <button onClick={()=>setEmailSended(false)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Não recebi nenhum link</button>
                        </div>
                    )
            }

            {/* Componente de confirmação de email enviado */}
        </section>
    )
}