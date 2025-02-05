import { render, screen, waitFor } from "@testing-library/react";
import MatchCard from "@/app/components/torneios/match/MatchCard";

// Teste para verificar se os dados são renderizados corretamente
it("deve renderizar as informações da partida corretamente", () => {
  // Mock de resposta do fetch
  let match = {
      data: "2025-02-01",
      status: "Em andamento",
      team1: {
        imgTeam: "https://example.com/team1-logo.png",
        teamName: "Team 1",
        score: 1
      },
      team2: {
        imgTeam: "https://example.com/team2-logo.png",
        teamName: "Team 2",
        score: 2
      }
  }
  


  // Renderize o componente
  render(<MatchCard match={{...match}} />);

  // Verifique se os elementos são renderizados
  expect(screen.getByText("2025-02-01")).toBeInTheDocument(); // Data
  expect(screen.getByText("Em andamento")).toBeInTheDocument(); // Status
  expect(screen.getByText("Team 1")).toBeInTheDocument(); // Nome do time 1
  expect(screen.getByText("Team 2")).toBeInTheDocument(); // Nome do time 2
  expect(screen.getByText("1 - 2")).toBeInTheDocument(); // Placar
  expect(screen.getByAltText("Team 1")).toHaveAttribute("src", "https://example.com/team1-logo.png"); // Imagem time 1
  expect(screen.getByAltText("Team 2")).toHaveAttribute("src", "https://example.com/team2-logo.png"); // Imagem time 2
});
