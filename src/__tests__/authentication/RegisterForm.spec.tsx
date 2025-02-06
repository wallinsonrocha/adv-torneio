import RegisterForm from "@/app/components/enter/RegisterForm";
import { makeServer } from "@/mocks/handlers";
import { fireEvent, render, screen, waitFor, prettyDOM } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

let server: any;
const pushMock = jest.fn();

beforeEach(() => {
    // Inicialização do server e alimentação dos dados
    server = makeServer({ environment: "test" });
    server.db.loadData({
        users: [
            { id: "1", role: "user", email: "user@email.com", password: "@Senha123" },            
        ],
    });

    (useRouter as jest.Mock).mockReturnValue({
        push: pushMock,
        back: jest.fn(),
    });
});

afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
});

describe("Test if RegisterForm works correctly", () => {
    it("should return email already exists if registred email", async () => {
        render(<RegisterForm />);

        // Inputs para colocar credenciais
        const name = screen.getByTestId("name-reg");
        const email = screen.getByTestId("email-reg");
        const password = screen.getByTestId("password-reg");
        const oabCode = screen.getByTestId("oabcode-reg");
        const passwordConfirm = screen.getByTestId("passwordConfirm-reg");
        const submit = screen.getByText(/Criar conta/i);

        // Eventos para inserir valores
        fireEvent.change(name, { target: { value: "Usuário" } });
        fireEvent.change(email, { target: { value: "user@email.com" } });
        fireEvent.change(oabCode, {target: {value: "123456"}});
        fireEvent.change(password, { target: { value: "@Senha321" } });
        fireEvent.change(passwordConfirm, { target: { value: "@Senha321" } });
        fireEvent.click(submit);

        // Respostas
        await waitFor(() => {
            expect(screen.getByText(/Este e-mail já possui uma conta. Faça o login para jogar conosco!/i)).toBeInTheDocument();
        });
    });

    it("should redirect if register is successful", async () => {
        render(<RegisterForm />);

        // Inputs para colocar credenciais
        const name = screen.getByTestId("name-reg");
        const email = screen.getByTestId("email-reg");
        const password = screen.getByTestId("password-reg");
        const oabCode = screen.getByTestId("oabcode-reg");
        const passwordConfirm = screen.getByTestId("passwordConfirm-reg");
        const submit = screen.getByText(/Criar conta/i);

        // Eventos para inserir valores
        fireEvent.change(name, { target: { value: "Usuário" } });
        fireEvent.change(email, { target: { value: "email@email.com" } });
        fireEvent.change(oabCode, {target: {value: "123456"}});
        fireEvent.change(password, { target: { value: "@Senha321" } });
        fireEvent.change(passwordConfirm, { target: { value: "@Senha321" } });
        fireEvent.click(submit);

        // Redirecionamento esperado
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/verify-email");
        });
    });
});
