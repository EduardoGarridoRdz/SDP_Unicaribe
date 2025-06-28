import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSistema from "./components/generales/usuarios/Login" // Página de login
import PaginaInicio from "./components/generales/Inicio"; // Página de inicio
import ProtectedRoute from "./ProtectorRutas"; // Componente para proteger rutas


function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/inicio" element={<PaginaInicio />} />
                    <Route path="/login" element={<LoginSistema />} />
                    <Route path="/" element={<LoginSistema />} />
                </Route>
            </Routes>

        </Router>
    );
}

export default AppRouter;