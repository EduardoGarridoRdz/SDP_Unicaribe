import FormularioPersonal from "./FormularioPersonal";
import FormularioAcademico from "./FormularioAcademico";
import FormularioCapacitacion from './FormularioCapacitación';
import FormularioActInactivo from "./FormularioActInactivo";
import FormularioProdep from "./FormularioProdep";
import FormularioSnii from "./FormularioSnii";
import FormularioSeii from "./FormularioSeii";

interface LayoutProfesoresProps {
    pathname: string;
}

export default function LayoutProfesores({ pathname }: LayoutProfesoresProps) {
    if (pathname === "/datos-personales") {
        return <FormularioPersonal />;
    }
    else if (pathname.includes("estudios-en-progreso")) {
        return <FormularioAcademico />
    }
    else if (pathname.includes('capacitaciones')) {
        return <FormularioCapacitacion />
    }
    else if (pathname.includes('actividades-inactivo')) {
        return <FormularioActInactivo />
    }
    else if (pathname.includes('perfil-prodep')) {
        return <FormularioProdep />
    }
    else if (pathname.includes('perfil-snii')) {
        return <FormularioSnii />
    }
    else if (pathname.includes('perfil-seii')) {
        return <FormularioSeii />
    }
};