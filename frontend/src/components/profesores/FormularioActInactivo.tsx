import { Grid, Paper, Typography, Button, TextField } from "@mui/material"
import BackupIcon from '@mui/icons-material/Backup';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import useWindowSize from "../../../API/WindowSize";

export default function FormularioActInactivo() {
    const { width } = useWindowSize()

    return (
        <>
            <form>
                <Grid container spacing={1} direction="column">
                    <Paper elevation={3} sx={{ mx: width * 0.01, my: 1 }}>
                        <Typography variant="h4" align="center"
                            sx={{ mx: 5, my: 5, fontWeight: "bold", color: "#1976d2" }}>
                            Actividades realizadas como Inactivo
                        </Typography>

                        <Grid container spacing={2} direction="column" sx={{ mx: width * 0.01, my: 3 }}>
                            <Button
                                variant="outlined"
                                startIcon={<BackupIcon />}
                            >
                                Subir Carta de Autorización
                            </Button>

                            <TextField
                                label="Nombre de la Institución"
                            />

                            <Button
                                variant="outlined"
                                startIcon={<BackupIcon />}
                            >
                                Subir Carta de Aceptación
                            </Button>

                            <TextField
                                label="Nombre del Proyecto"
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha Inicio"
                                />
                                <DatePicker
                                    label="Fecha Final"
                                />
                            </LocalizationProvider>

                            <Button
                                variant="outlined"
                                startIcon={<BackupIcon />}
                            >
                                Subir Carta de Incorporación
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </form>

        </>
    );
};