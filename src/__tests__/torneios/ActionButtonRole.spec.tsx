import { render, screen, waitFor } from "@testing-library/react";
import ActionButtonRole from "@/app/components/torneios/ActionButtonRole";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
});

describe("ActionButtonRole Component", () => {

    it("should not render if role user is 'user'", async () => {
        localStorage.setItem("token", "fake-token");
        fetchMock.mockResponseOnce(JSON.stringify({ role: "user" }));

        render(<ActionButtonRole />);

        await waitFor(() => {
            expect(screen.queryByRole("link")).not.toBeInTheDocument();
        });
    });

    it("should render enrollment if role is 'captain'", async () => {
        localStorage.setItem("token", "fake-token");
        fetchMock.mockResponseOnce(JSON.stringify({ role: "captain" }));

        render(<ActionButtonRole />);

        await waitFor(() => {
            expect(screen.getByRole("link", { name: /inscrever-se/i })).toBeInTheDocument();
        });
    });

    it("should render edit function if role is 'admin'", async () => {
        localStorage.setItem("token", "fake-token");
        fetchMock.mockResponseOnce(JSON.stringify({ role: "admin" }));

        render(<ActionButtonRole />);

        await waitFor(() => {
            expect(screen.getByRole("link", { name: /editar/i })).toBeInTheDocument();
        });
    });
});
