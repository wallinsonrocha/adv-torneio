import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import InfoTournament from "@/app/(tournament)/torneios/[id]/page";
import { useParams } from "next/navigation";
import { makeServer } from "@/mocks/handlers";

jest.mock("next/navigation", () => ({
    useParams: jest.fn(),
}));

let server: any;

beforeEach(() => {
    server = makeServer({ environment: "test" });

    (useParams as jest.Mock).mockReturnValue({ id: "1" });
});

afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
});

describe("InfoTournament Component", () => {
    it("should display loading message initially", () => {
        render(<InfoTournament />);
        expect(screen.getByText(/Carregando torneio.../i)).toBeInTheDocument();
    });

    it("should display error message if fetch fails", async () => {
        jest.spyOn(global, "fetch").mockRejectedValue(new Error("Erro ao carregar o torneio."));

        render(<InfoTournament />);

        await waitFor(() => {
            expect(screen.getByText(/Erro ao carregar torneio./i)).toBeInTheDocument();
        });
    });

    it("should switch tabs correctly", async () => {
        server.createList("tournament", 20);
        render(<InfoTournament />);

        await waitFor(() => {
            expect(screen.queryByText("Carregando torneio...")).not.toBeInTheDocument();
        });

        await screen.findByText("Times Inscritos");

        fireEvent.click(screen.getByText(/Partidas/i));
        const matchCards = await screen.findAllByTestId("match-card");
        expect(matchCards.length).toBeGreaterThan(0);

        fireEvent.click(screen.getByText(/Times Inscritos/i));
        const teamCards = await screen.findAllByTestId("team-card");
        expect(teamCards.length).toBeGreaterThan(0);

        fireEvent.click(screen.getByText(/Ranking/i));
        const ranking = await screen.findAllByTestId("ranking-card");
        expect(ranking.length).toBeGreaterThan(0);
    });
});
