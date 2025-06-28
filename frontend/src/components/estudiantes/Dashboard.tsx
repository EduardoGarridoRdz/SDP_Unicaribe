// Función que retorna la URL del dashboard de Looker Studio según el pathname proporcionado

function Dashboard(pathname: String) {
    if (pathname === "/estudiantes/servicios-escolares") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_vocd4ud8qd"
    }
    else if (pathname === "/estudiantes/practicas-profesionales") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_0ah8pqj8qd"
    }
    else if (pathname === "/estudiantes/servicio-social") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_ln9dj63crd"
    }
    else if (pathname === "/estudiantes/desarrollo-estudiantil") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_t1nudsw8qd"
    }
    else if (pathname === "/estudiantes/idiomas") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_7vsjdc9brd"
    }
    else if (pathname === "/estudiantes/movilidad-academica") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_kk90hm9prd"
    }
    else if (pathname === "/estudiantes/tutorias") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_5t3jsywyrd"
    }
}

export default Dashboard;