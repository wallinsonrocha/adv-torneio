import Link from "next/link";

interface TeamProps {
  id: string;
  teamName: string;
  capName: string;
  imgTeam: string;
}

export default function TeamCard({ id, teamName, capName, imgTeam }: TeamProps) {
  return (
    <div key={id} className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={imgTeam}
          alt={teamName}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-bold">{teamName}</h3>
          <p className="text-gray-600">{capName}</p>
        </div>
      </div>
      <Link
        href={`/times/${id}`}
        className="text-blue-600 hover:underline"
      >
        Ver Detalhes
      </Link>
    </div>
  );
};
