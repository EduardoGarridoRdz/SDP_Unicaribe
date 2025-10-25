// Función que retorna la URL del dashboard de Looker Studio según el pathname proporcionado

function Dashboard(pathname: String) {
    if (pathname === "/estudiantes/servicios-escolares") {
        return "http://localhost:8088/superset/dashboard/p/lQ5Gp97zo26/"
    }
    else if (pathname === "/estudiantes/practicas-profesionales") {
        return "http://localhost:8088/superset/dashboard/p/YKwGMV6zgjr/"
    }
    else if (pathname === "/estudiantes/servicio-social") {
        return "http://localhost:8088/superset/dashboard/p/72nq0BZGQ1m/"
    }
    else if (pathname === "/estudiantes/desarrollo-estudiantil") {
        return "http://localhost:8088/superset/dashboard/p/MbJqo15GPlv/"
    }
    else if (pathname === "/estudiantes/idiomas") {
        return "http://localhost:8088/superset/dashboard/p/lQ5Gpm7zo26/"
    }
    else if (pathname === "/estudiantes/movilidad-academica") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_kk90hm9prd"
    }
    else if (pathname === "/estudiantes/tutorias") {
        return "https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_5t3jsywyrd"
    }
}

export default Dashboard;