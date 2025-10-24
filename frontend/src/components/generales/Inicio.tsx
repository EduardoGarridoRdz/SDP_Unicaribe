import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import SeleccionarNavBar from "./navegacion/NavBar";

import { useDemoRouter } from "@toolpad/core/internal";
import logouni from "../../assets/logo.png"; // Ensure the path is correct

import LayoutEstudiantes from "../estudiantes/LayoutEstudiantes";
import LayoutUsuarios from "./usuarios/LayoutUsuarios";
import LayoutProfesores from "../profesores/LayoutProfesores";

const BRANDING = {
    logo: (<img src={logouni} alt="Universidad del Caribe" style={{ height: 50, width: 40 }} />),
    title: "Secretaría de Planeación y Desarrollo Institucional",
};

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }: { pathname: string }) {

    if (pathname === "/salir") {
        localStorage.removeItem("sdp_userToken");
        localStorage.removeItem("sdp_userRole");
        localStorage.removeItem("sdp_userId");
        window.location.href = "/login";
    }

    return (
        <>
            {/*pathname*/}

            {pathname.startsWith('/estudiantes') && (
                <LayoutEstudiantes pathname={pathname} />
            )}

            {pathname.startsWith("/administrar") && (
                <LayoutUsuarios pathname={pathname} />
            )}

            {pathname.startsWith("/datos") && (
                <LayoutProfesores pathname={pathname} />
            )}

            {pathname.startsWith("/productos") && (
                <LayoutProfesores pathname={pathname} />
            )}

        </>
    );
}

interface DemoProps {
    window?: () => Window;
}

export default function Inicio(props: DemoProps) {
    const { window } = props;

    const router = useDemoRouter();

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // preview-start
        <AppProvider
            navigation={SeleccionarNavBar()}
            router={router}
            branding={BRANDING}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout defaultSidebarCollapsed>
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}
