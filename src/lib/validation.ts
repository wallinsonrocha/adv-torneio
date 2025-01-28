import { z } from "zod";

// Schema de validação de senha
export const passwordSchema = z
    .string()
    .min(8, { message: "A senha deve ter, no mínimo, 8 caracteres." })
    .nonempty("Digite a sua senha")
    .refine((password) => /[A-Z]/.test(password), {
        message: "A senha deve conter pelo menos uma letra maiúscula.",
    })
    .refine((password) => /[a-z]/.test(password), {
        message: "A senha deve conter pelo menos uma letra minúscula.",
    })
    .refine((password) => /[0-9]/.test(password),
        { message: "A senha deve conter pelo menos um número." })
    .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "A senha deve conter pelo menos um caractere especial",
    })

// Validação Login
export const loginSchema = z.object({
    email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
    password: passwordSchema
});

// Validação para recuperação de senha
export const recoverPassword = z.object({
    email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
})

// Validação para o formulário de registro
export const registerSchema = z.object({
    fullName: z.string().min(3, "O nome completo deve ter pelo menos 3 caracteres").nonempty("O nome completo é obrigatório"),
    oabCode: z
        .string()
        .regex(/^\d{6}$/, "O código OAB deve conter exatamente 6 dígitos")
        .nonempty("O código OAB é obrigatório"),
    email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});
