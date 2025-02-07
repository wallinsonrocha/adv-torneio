'use client';

import { useState, useEffect } from 'react';
import CardTorneio from '../components/torneios/CardTorneio';

const Torneios = () => {
  const [torneios, setTorneios] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchTorneios = async () => {
      const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;
      try {
        const response = await fetch(`${urlEnv}/api/torneios`);
        const data = await response.json();
        setTorneios(data);
      } catch (error) {
        console.error('Erro ao buscar torneios:', error);
      }
    };

    fetchTorneios();
  }, []);

  const handleEdit = (id: string) => {
    // Lógica para abrir o modal de edição
  };

  const handleDelete = (id: string) => {
    // Lógica para deletar o torneio
  };

  const toggleMenu = (id: string) => {
    setOpenMenu(openMenu === id ? null : id); // Alterna o menu de opções
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        onClick={() => alert('Abrir modal de criação de torneio')}
      >
        Criar Torneio
      </button>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {torneios.map((torneio) => (
          <div key={torneio.id} className="relative w-fit">
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-2 mt-2 z-10">
              <button
                onClick={() => toggleMenu(torneio.id)}
                className="text-gray-500 hover:text-black"
              >
                Opções
              </button>
              {openMenu === torneio.id && (
                <div className="absolute bg-white shadow-lg rounded ml-16 mt-14 w-32 z-20">
                  <button
                    onClick={() => handleEdit(torneio.id)}
                    className="w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(torneio.id)}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
            <CardTorneio torneio={torneio} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Torneios;
