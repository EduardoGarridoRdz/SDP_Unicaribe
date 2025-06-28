import AñadirUsuario from "./Añadir";
import GestionarUsuario from "./Gestionar";

interface LayoutUsuariosProps {
    pathname: string;
}

export default function LayoutUsuarios({ pathname }: LayoutUsuariosProps) {
    if (pathname.includes("anadir-usuario")) {
        return <AñadirUsuario />;
    }
    return <GestionarUsuario />;
};