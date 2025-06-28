import NavAdmin from "./NavBarAdmin"
import NavProfesor from "./NavBarProfesor"

// Función que selecciona la barra de navegación según el rol del usuario
function SeleccionarNavBar() {
    const sdp_userRole = localStorage.getItem("sdp_userRole")

    if (sdp_userRole === "Administrador") {
        return NavAdmin()
    }
    else if (sdp_userRole === "Profesor") {
        return NavProfesor()
    }
    else {
        return
    }
}

export default SeleccionarNavBar;