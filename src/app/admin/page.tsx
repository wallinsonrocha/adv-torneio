'use client';

import { useState, useEffect } from 'react';
import CardTorneio from '../components/torneios/CardTorneio';
import ModalCriacaoTorneio from '../components/admin/modal';

const Torneios = () => {
  const [torneios, setTorneios] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [torneioEditado, setTorneioEditado] = useState<any | null>(null);

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

  const handleEdit = (torneio: any) => {
    setTorneioEditado(torneio); // Carrega o torneio para edição
    setIsModalOpen(true); // Abre o modal
  };

  const handleDelete = (id: string) => {
    // Lógica para deletar o torneio
  };

  const toggleMenu = (id: string) => {
    setOpenMenu(openMenu === id ? null : id); // Alterna o menu de opções
  };

  const handleModalOpen = () => {
    setTorneioEditado(null); // Limpa o torneio para criação
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateTorneio = (novoTorneio: any) => {
    if (torneioEditado) {
      // Atualizar o torneio
      console.log('Atualizando torneio:', novoTorneio);
    } else {
      // Criar o torneio
      console.log('Criando torneio:', novoTorneio);
    }
    setIsModalOpen(false); // Fecha o modal após criação/edição
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        onClick={handleModalOpen}
      >
        Criar Torneio
      </button>

      <ModalCriacaoTorneio
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleCreateTorneio}
        torneioEditado={torneioEditado} // Passa os dados para edição
      />

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
                    onClick={() => handleEdit(torneio)}
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
