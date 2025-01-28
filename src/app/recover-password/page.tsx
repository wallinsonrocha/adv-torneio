'use client'
import { recoverPassword } from "@/lib/validation";
import { useState } from "react";
import { z } from "zod";
import RecoverPasswordForm from "../components/recover-password/RecoverPasswordForm";

type RecoverPasswordSchema = z.infer<typeof recoverPassword>;

export default function RecoverPassword() {


    const [emailSended, setEmailSended] = useState<boolean>(false);

    return (
        <section className="flex flex-col p-4 justify-center items-center text-center w-screen h-screen">
            {
                !emailSended ? (
                    // Componente para enviar email
                    < RecoverPasswordForm />
                ) :
                    ('')
            }

            {/* Componente de confirmação de email enviado */}
        </section>
    )
}