'use client'
import { useState } from "react";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bem-vindo ao chat do time!", sender: "system" },
    { id: 2, text: "Olá, time!", sender: "user" },
    { id: 3, text: "Oi, vamos jogar?", sender: "player1" },
    { id: 4, text: "Sim, estou pronto!", sender: "player2" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "user" }]);
    setNewMessage("");
  };

  return (
    <div className="fixed z-10 bottom-4 right-4 flex flex-col items-end">
      {/* Botão flutuante para abrir o chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg focus:outline-none"
      >
        <img src="/icons/layout/chat.svg" alt="" />
      </button>

      {/* Janela do chat */}
      {isOpen && (
        <div className="w-80 bg-white shadow-xl rounded-lg fixed bottom-16 right-4 border border-gray-300 flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg text-center font-bold">Chat do Time</div>
          
          {/* Área de mensagens */}
          <div className="p-3 h-64 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg text-sm max-w-[75%] ${
                  msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-900 self-start"
                }`}
              >
                <span className="block text-xs font-bold">{msg.sender}</span>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input de mensagem */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg text-sm focus:outline-none"
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
