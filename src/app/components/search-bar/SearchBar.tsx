"use client";

import { useState } from "react";
import Image from "next/image";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    buttonText?: string;
}

export default function SearchBar({
    onSearch,
    placeholder = "Pesquise algo...",
    buttonText = "Buscar"
}: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
            <label htmlFor="search-input" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Buscar
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Image width={16} height={16} src="/icons/magnifying-glass.svg" alt="Lupa" />
                </div>
                <input
                    type="search"
                    id="search-input"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {buttonText}
                </button>
            </div>
        </form>
    );
}
