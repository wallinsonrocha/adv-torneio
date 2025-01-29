'use client'
import { changePassword } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VisibilityPassword from "../components/enter/VisibilityPassword";
import clsx from "clsx";
import { useState } from "react";
import ChangePasswordForm from "../components/recover-password/ChangePassword";

export default function ChangePassWord() {
    return (
        <section className="flex flex-col p-4 justify-center items-center text-center w-screen h-screen">
            <div className="max-w-[560px] flex flex-col gap-2 bg-white p-8 drop-shadow-md">
                <ChangePasswordForm />
            </div>
            
        </section>
    )
}