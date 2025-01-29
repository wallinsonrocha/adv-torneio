import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

interface VisibilityPasswordProps {
    onToggle: (visible: boolean) => void;
};

export default function VisibilityPassword({onToggle}: VisibilityPasswordProps){
    const [visible, setVisible] = useState<boolean>(false);

    // Função para modificar o campo pai sobre a visibilidade de Password
    function toggleVisibility() {
        const newVisibility = !visible;
        setVisible(newVisibility);
        onToggle(newVisibility);
    }

    return (
        <button type="button" className="absolute right-3 top-2 translate-y-1.5" onClick={toggleVisibility}>
            <Image width={22} height={22} src={clsx(visible ? 'icons/enter/hide-visibility.svg' : 'icons/enter/visible.svg')} alt="Icone de visualização" />
        </button>
    )
}