import React from "react";
import SchoolIcon from '@mui/icons-material/School';
import Person4Icon from "@mui/icons-material/Person4";
import BiotechIcon from '@mui/icons-material/Biotech';
import FindInPageIcon from '@mui/icons-material/FindInPage';
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
const NavProfesor = (): Navigation => {
    return [
        {
            kind: "header",
            title: "Formularios",
        },

        // Información personal del profesor
        {
            segment: "datos-personales",
            title: "Datos Personales",
            icon: <Person4Icon />,
        },

        // Información académica del profesor
        {
            segment: "datos-academicos",
            title: "Datos Académicos",
            icon: <SchoolIcon />,
            children: [

                {
                    segment: "estudios-en-progreso",
                    title: "Estudios en Progreso",
                },
                {
                    segment: "capacitaciones",
                    title: "Capacitaciones",
                },
                {
                    segment: "actividades-inactivo",
                    title: "Actividades realizadas (Inactivo)",
                },
            ],
        },
        // Información referente a los profesores investigadores
        {
            segment: "datos-investigadores",
            title: "Datos de Investigadores",
            icon: <BiotechIcon />,
            children: [
                {
                    segment: "perfil-prodep",
                    title: "Perfil PRODEP"
                },
                {
                    segment: "perfil-snii",
                    title: "Perfil SNII"
                },
                {
                    segment: "perfil-seii",
                    title: "Perfil SEII"
                }
            ]
        },
        // Información de los productos obtenidos de las investigaciones
        {
            segment: "productos-investigacion",
            title: "Producto de Investigación",
            icon: <FindInPageIcon />,
            children: [
                {
                    segment: "proyecto-investigacion",
                    title: "Proyectos de Investigación"
                },
                {
                    segment: "libros-articulos",
                    title: "Libros y Artículos"
                },
                {
                    segment: "direccion-tesis",
                    title: "Dirección de Tesis"
                },
                {
                    segment: "estancias",
                    title: "Estancias",
                }
            ]
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
export default NavProfesor;
