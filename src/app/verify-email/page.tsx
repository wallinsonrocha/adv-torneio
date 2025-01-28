import Image from "next/image";

export default function VerifyEmail() {
    return (
        <section className="flex flex-col p-4 justify-center items-center text-center w-screen h-screen">
            <Image className="-mb-8" width={220} height={220} src='icons/verify/confirm.svg' alt="Confirmação de recebimento do registro" />
            <div className="max-w-[460px] flex flex-col items-center">
                <h2>Falta pouco para concluir</h2>
                <p>Verifique o seu email. Enviamos um link para o seu email para confirmar a criação da sua conta!</p>
            </div>
        </section>
    )
}