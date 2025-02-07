import React, { useState, useEffect } from 'react';

type ModalCriacaoTorneioProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (torneio: any) => void;
  torneioEditado?: any; // Dados para edição
};

function ModalCriacaoTorneio({
  isOpen,
  onClose,
  onCreate,
  torneioEditado,
}: ModalCriacaoTorneioProps) {
  const [novoTorneio, setNovoTorneio] = useState({
    nome: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    regras: '',
    limiteJogadores: 0,
  });

  // Efeito para carregar os dados de um torneio existente para edição
  useEffect(() => {
    if (torneioEditado) {
      setNovoTorneio(torneioEditado);
    }
  }, [torneioEditado]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNovoTorneio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTorneio = () => {
    onCreate(novoTorneio); // Passa os dados para o callback onCreate
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{torneioEditado ? 'Editar' : 'Criar'} Torneio</h2>

        {/* Nome do Torneio */}
        <label htmlFor="nome" className="text-sm text-gray-600 mb-1 block">
          Nome do Torneio
        </label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={novoTorneio.nome}
          onChange={handleInputChange}
          placeholder="Nome do Torneio"
          className="w-full mb-2 p-2 border rounded"
        />

        {/* Descrição do Torneio */}
        <label htmlFor="descricao" className="text-sm text-gray-600 mb-1 block">
          Descrição do Torneio
        </label>
        <input
          id="descricao"
          type="text"
          name="descricao"
          value={novoTorneio.descricao}
          onChange={handleInputChange}
          placeholder="Descrição do Torneio"
          className="w-full mb-2 p-2 border rounded"
        />

        {/* Data de Início */}
        <label htmlFor="dataInicio" className="text-sm text-gray-600 mb-1 block">
          Data de Início
        </label>
        <input
          id="dataInicio"
          type="date"
          name="dataInicio"
          value={novoTorneio.dataInicio}
          onChange={handleInputChange}
          className="w-full mb-2 p-2 border rounded"
        />

        {/* Data de Fim */}
        <label htmlFor="dataFim" className="text-sm text-gray-600 mb-1 block">
          Data de Fim
        </label>
        <input
          id="dataFim"
          type="date"
          name="dataFim"
          value={novoTorneio.dataFim}
          onChange={handleInputChange}
          className="w-full mb-2 p-2 border rounded"
        />

        {/* Regras do Torneio */}
        <label htmlFor="regras" className="text-sm text-gray-600 mb-1 block">
          Regras do Torneio
        </label>
        <textarea
          id="regras"
          name="regras"
          value={novoTorneio.regras}
          onChange={handleInputChange}
          placeholder="Regras do Torneio"
          className="w-full mb-2 p-2 border rounded h-24"
        />

        {/* Limite de Jogadores */}
        <label htmlFor="limiteJogadores" className="text-sm text-gray-600 mb-1 block">
          Limite de Jogadores
        </label>
        <input
          id="limiteJogadores"
          type="number"
          name="limiteJogadores"
          value={novoTorneio.limiteJogadores}
          onChange={handleInputChange}
          placeholder="Limite de Jogadores"
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleCreateTorneio}
          >
            {torneioEditado ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCriacaoTorneio;
