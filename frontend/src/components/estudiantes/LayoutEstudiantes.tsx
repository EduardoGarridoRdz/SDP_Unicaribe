import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dashboard from "./Dashboard";
import SubirExcel from "./botones/SubirExcel";
import DarFormato from "./botones/DarFormato";
import useWindowSize from "../../../API/WindowSize";

interface LayoutEstudiantesProps {
    pathname: string;
}

export default function LayoutEstudiantes({ pathname }: LayoutEstudiantesProps) {

    // Obtenemos la altura y la anchura de la ventana
    const { width, height } = useWindowSize();

    // Obtenemos la URL del iframe según el pathnname
    const iframesrc = Dashboard(pathname);

    return (
        <Box>
            <Grid container spacing={2} sx={{ pt: 2 }} justifyContent={"center"}>
                <Grid container columnSpacing={10}>
                    <SubirExcel />
                    <DarFormato />
                </Grid>
                <Grid>
                    <iframe
                        src={iframesrc}
                        allowFullScreen
                        style={{
                            flex: 1,
                            width: `${width / 100 * 92}px`,
                            height: `${height / 100 * 80}px`,
                            position: "relative",
                        }}
                        frameBorder={0}
                        loading="lazy"
                        sandbox="allow-storage-access-by-user-activation 
                                allow-scripts allow-same-origin 
                                allow-popups allow-downloads
                                allow-popups-to-escape-sandbox"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
