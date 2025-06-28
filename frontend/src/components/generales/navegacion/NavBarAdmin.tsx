import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import Person4Icon from "@mui/icons-material/Person4";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Definimos el tipo para los elementos de navegación
type HeaderItem = {
    kind: "header";
    title: string;
};

type DividerItem = {
    kind: "divider";
};

type SingleItemHijo = {
    segment: string;
    title: string;
    icon?: React.ReactNode;
};

type SingleItemPadre = {
    segment: string;
    title: string;
    icon?: React.ReactNode;
    children: SingleItemHijo[];
};


// Definimos el tipo para la navegación completa
type Navigation = (HeaderItem | DividerItem | SingleItemHijo | SingleItemPadre)[];

// Función que genera y devuelve la navegación
const NavAdmin = (): Navigation => {
    return [
        {
            kind: "header",
            title: "Menú principal",
        },
        {
            segment: "estudiantes",
            title: "Estudiantes",
            icon: <SchoolIcon />,
            children: [
                {
                    segment: "servicios-escolares",
                    title: "Servicios Escolares",
                },
                {
                    segment: "practicas-profesionales",
                    title: "Prácticas Profesionales",
                },
                {
                    segment: "servicio-social",
                    title: "Servicio Social",
                },
                {
                    segment: "desarrollo-estudiantil",
                    title: "Desarrollo Estudiantil",
                },
                {
                    segment: "idiomas",
                    title: "Idiomas",
                },
                {
                    segment: "movilidad-academica",
                    title: "Movilidad Académica",
                },
                {
                    segment: "tutorias",
                    title: "Tutorías",
                },
            ],
        },

        // Profesores departamentos
        {
            segment: "profesores",
            title: "Profesores",
            icon: <Person4Icon />,

            children: [
                {
                    segment: "dashboard-profesor",
                    title: "Dashboard Profesores",
                },
                {
                    segment: "formulario",
                    title: "Recursos Humanos",
                },
                {
                    segment: "ciencias-basicas",
                    title: "Ciencias básicas de ingeniería",
                },
                {
                    segment: "economia-negocios",
                    title: "Economía y Negocios",
                },
                {
                    segment: "turismo-sustentable",
                    title: "Turismo Sustentable, Gastronomía y Hotelería",
                },

                {
                    segment: "desarrollo-humano",
                    title: "Desarrollo Humano",
                },

                {
                    segment: "recursos-humanos",
                    title: "Recursos Humanos",
                },
                {
                    segment: "desarrollo-academico",
                    title: "Desarrollo Académico",
                },
                {
                    segment: "departamento-investigacion",
                    title: "Departamento de Investigacion",
                },
            ],
        },

        {
            kind: "divider",
        },
        {
            kind: "header",
            title: "Gestión de usuarios",
        },
        {
            segment: "administrar-usuarios",
            title: "Administrar Usuarios",
            icon: <GroupIcon />,
            children: [
                {
                    segment: "anadir-usuario",
                    title: "Añadir Usuario",
                },
                {
                    segment: "gestionar-usuario",
                    title: "Gestionar Ususario",
                },
            ],
        },
        {
            kind: "divider",
        },
        {
            kind: "header",
            title: "Cerrar Sesión",
        },
        {
            segment: "salir",
            title: "Cerrar Sesión",
            icon: <ExitToAppIcon />,
        }
    ];
};

// Exportamos la función
export default NavAdmin;
