import { loginSchema, registerSchema, passwordSchema, recoverPassword } from '@/lib/validation';
import { z } from 'zod';


describe('Login Schema', () => {
    it('should validate a valid login', () => {
        const validLogin = {
            email: 'test@example.com',
            password: 'Senha123!',
        };
        expect(() => loginSchema.parse(validLogin)).not.toThrow();
    });

    it('should throw an error for invalid email', () => {
        const invalidLogin = {
            email: 'invalid-email',
            password: 'Senha123!',
        };
        expect(() => loginSchema.parse(invalidLogin)).toThrow('E-mail inválido');
    });

    it('should throw an error for missing email', () => {
        const invalidLogin = {
            email: '',
            password: 'Senha123!',
        };
        expect(() => loginSchema.parse(invalidLogin)).toThrow('O e-mail é obrigatório');
    });

    it('should throw an error for invalid password', () => {
        const invalidLogin = {
            email: 'test@example.com',
            password: 'senha',
        };
        expect(() => loginSchema.parse(invalidLogin)).toThrow('A senha deve ter, no mínimo, 8 caracteres.');
    });
});

describe('Register Schema', () => {
    it('should validate a valid registration', () => {
        const validRegistration = {
            fullName: 'João Silva',
            oabCode: '123456',
            email: 'joao@example.com',
            password: 'Senha123!',
            confirmPassword: 'Senha123!',
        };
        expect(() => registerSchema.parse(validRegistration)).not.toThrow();
    });

    it('should throw an error for invalid full name', () => {
        const invalidRegistration = {
            fullName: 'Jo',
            oabCode: '123456',
            email: 'joao@example.com',
            password: 'Senha123!',
            confirmPassword: 'Senha123!',
        };
        expect(() => registerSchema.parse(invalidRegistration)).toThrow(
            'O nome completo deve ter pelo menos 3 caracteres'
        );
    });

    it('should throw an error for invalid OAB code', () => {
        const invalidRegistration = {
            fullName: 'João Silva',
            oabCode: '12345',
            email: 'joao@example.com',
            password: 'Senha123!',
            confirmPassword: 'Senha123!',
        };
        expect(() => registerSchema.parse(invalidRegistration)).toThrow(
            'O código OAB deve conter exatamente 6 dígitos'
        );
    });

    it('should throw an error for mismatched passwords', () => {
        const invalidRegistration = {
            fullName: 'João Silva',
            oabCode: '123456',
            email: 'joao@example.com',
            password: 'Senha123!',
            confirmPassword: 'Senha456!',
        };
        expect(() => registerSchema.parse(invalidRegistration)).toThrow('As senhas não coincidem');
    });

    it('should throw an error for invalid password', () => {
        const invalidRegistration = {
            fullName: 'João Silva',
            oabCode: '123456',
            email: 'joao@example.com',
            password: 'senha',
            confirmPassword: 'senha',
        };
        expect(() => registerSchema.parse(invalidRegistration)).toThrow(
            'A senha deve ter, no mínimo, 8 caracteres.'
        );
    });
});

describe('Password Schema', () => {
    it('should validate a valid password', () => {
        const validPassword = 'Senha123!';
        expect(() => z.string().pipe(passwordSchema).parse(validPassword)).not.toThrow();
    });

    it('should throw an error for password without uppercase letter', () => {
        const invalidPassword = 'senha123!';
        expect(() => z.string().pipe(passwordSchema).parse(invalidPassword)).toThrow(
            'A senha deve conter pelo menos uma letra maiúscula.'
        );
    });

    it('should throw an error for password without lowercase letter', () => {
        const invalidPassword = 'SENHA123!';
        expect(() => z.string().pipe(passwordSchema).parse(invalidPassword)).toThrow(
            'A senha deve conter pelo menos uma letra minúscula.'
        );
    });

    it('should throw an error for password without number', () => {
        const invalidPassword = 'Senha!';
        expect(() => z.string().pipe(passwordSchema).parse(invalidPassword)).toThrow(
            'A senha deve conter pelo menos um número.'
        );
    });

    it('should throw an error for password without special character', () => {
        const invalidPassword = 'Senha123';
        expect(() => z.string().pipe(passwordSchema).parse(invalidPassword)).toThrow(
            'A senha deve conter pelo menos um caractere especial'
        );
    });
});

describe.only('Recover Password', () => {
    it('shold return error if wrong email', () => {
        const wrongEmail = {email: 'email@em.'};
        expect(() => recoverPassword.parse(wrongEmail)).toThrow('E-mail inválido');
    })

    it('shold return success if right email', () => {
        const wrongEmail = {email: 'email@email.com'};
        expect(() => recoverPassword.parse(wrongEmail)).not.toThrow();
    })
})
