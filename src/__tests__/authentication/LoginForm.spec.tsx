import LoginForm from "@/app/components/enter/LoginForm";
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

describe("Test if LoginForm works correctly", () => {
    it("should return invite to register if not exists", async () => {
        render(<LoginForm />);

        // Inputs para colocar credenciais
        const email = screen.getByTestId("email-login");
        const password = screen.getByTestId("password-login");
        const submit = screen.getByText(/Fazer login/i);

        // Eventos para inserir valores
        fireEvent.change(email, { target: { value: "email@email.com" } });
        fireEvent.change(password, { target: { value: "@Senha123" } });
        fireEvent.click(submit);

        // Respostas
        await waitFor(() => {
            expect(screen.getByText(/Este e-mail ainda não está cadastrado. Que tal criar uma conta?/i)).toBeInTheDocument();
        });
    });

    it("should not return an error if login is successful", async () => {
        render(<LoginForm />);

        // Inputs para colocar credenciais
        const email = screen.getByTestId("email-login");
        const password = screen.getByTestId("password-login");
        const submit = screen.getByText(/Fazer login/i);

        // Eventos para inserir valores
        fireEvent.change(email, { target: { value: "user@email.com" } });
        fireEvent.change(password, { target: { value: "@Senha123" } });
        fireEvent.click(submit);

        // Respostas
        await waitFor(() => {
            expect(
                screen.queryByText(/email ou senha incorretas/i)
            ).not.toBeInTheDocument();
        });
    });

    it("should redirect if authentication is successful", async () => {
        render(<LoginForm />);

        // Inputs para colocar credenciais
        const email = screen.getByTestId("email-login");
        const password = screen.getByTestId("password-login");
        const submit = screen.getByText(/Fazer login/i);

        // Eventos para inserir valores
        fireEvent.change(email, { target: { value: "user@email.com" } });
        fireEvent.change(password, { target: { value: "@Senha123" } });
        fireEvent.click(submit);

        // Redirecionamento esperado
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/torneios");
        });
    });
});
