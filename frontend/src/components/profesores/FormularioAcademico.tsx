import { useEffect } from "react";
import {
    Grid, Paper, Typography, TextField, Button
} from "@mui/material"

import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import { DynamicSelect } from "../../../API/ApiItems";
import useWindowSize from "../../../API/WindowSize";
import { API_CONFIG } from "../../../API/config";
import { useState } from "react";
import Alert from "@mui/material/Alert";

type EstudiosFormData = {
    grado_actual: string;
    grado_estudiando: string;
    fecha_inicio: Dayjs | null;
    fecha_final: Dayjs | null;
    nombre_institucion: string;
    id_usuario: string;
}

export default function FormularioAcademico() {

    const { width } = useWindowSize();

    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

    const [estudiosFormData, setEstudiosFormData] = useState<EstudiosFormData>({
        grado_actual: '',
        grado_estudiando: '',
        fecha_inicio: null,
        fecha_final: null,
        nombre_institucion: '',
        id_usuario: '',
    })

    useEffect(() => {
        handleLoad();
    }, []);

    const handleChange = (field: keyof EstudiosFormData) => (value: string) => {
        setEstudiosFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDateChange = (field: keyof EstudiosFormData) => (value: Dayjs | null) => {
        setEstudiosFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        estudiosFormData.id_usuario = localStorage.getItem('sdp_userId') ?? ''

        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ESTUDIOS_AÑADIR_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(estudiosFormData)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const datos = await response.json()

            setAlert({ severity: 'success', message: datos.message })

        } catch (error) {
            setAlert({ severity: 'error', message: error instanceof Error ? error.message : 'Error desconocido' });
        }
    }

    const handleLoad = async () => {
        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ESTUDIOS_PROFESOR_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localStorage.getItem('sdp_userId'))
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const datos = await response.json();

            if (datos.data === false) {
                setEstudiosFormData({
                    grado_actual: '',
                    grado_estudiando: '',
                    fecha_inicio: null,
                    fecha_final: null,
                    nombre_institucion: '',
                    id_usuario: ''
                })
            } else {
                setEstudiosFormData({
                    ...datos.data,
                    fecha_inicio: datos.data.fecha_inicio ? dayjs(datos.data.fecha_inicio) : null,
                    fecha_final: datos.data.fecha_final ? dayjs(datos.data.fecha_final) : null,
                })
            }
        } catch (error) {
            setAlert({ severity: 'error', message: "Hubo un error al cargar los datos" });
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column">

                    <Paper elevation={3} sx={{ mx: (width / 100) * 2, my: 1 }}>

                        <Typography variant="h4" align="center"
                            sx={{ mx: 5, my: 5, fontWeight: "bold", color: "#1976d2" }}>
                            Estudios en Progreso
                        </Typography>

                        {alert && (
                            <Alert severity={alert?.severity}>
                                {
                                    alert.message
                                }
                            </Alert>)}

                        {estudiosFormData && (
                            <Grid container spacing={2} direction="column"
                                sx={{ mx: (width / 100) * 1, my: 2 }}>

                                <DynamicSelect
                                    endpoint={API_CONFIG.GRADO_ACADEMICO_URL}
                                    label="Grado Académico Actual"
                                    value={estudiosFormData.grado_actual}
                                    valueKey="grado_academico"
                                    labelKey="grado_academico"
                                    onChange={handleChange('grado_actual')}
                                    fullWidth
                                />

                                <DynamicSelect
                                    endpoint={API_CONFIG.GRADO_ACADEMICO_URL}
                                    label="Grado Académico Estudiando"
                                    value={estudiosFormData.grado_estudiando}
                                    valueKey="grado_academico"
                                    labelKey="grado_academico"
                                    onChange={handleChange('grado_estudiando')}
                                    fullWidth
                                />

                                <TextField
                                    id="nombre_institucion"
                                    label="Nombre de la Institución"
                                    fullWidth
                                    required
                                    value={estudiosFormData.nombre_institucion}
                                    onChange={(e) => handleChange('nombre_institucion')(e.target.value)}
                                    error={!!estudiosFormData.nombre_institucion && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(estudiosFormData.nombre_institucion)}
                                    helperText={
                                        !!estudiosFormData.nombre_institucion && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(estudiosFormData.nombre_institucion)
                                            ? "Solo se permiten letras y espacios"
                                            : ""
                                    }
                                    inputProps={{
                                        pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                                        title: "Solo se permiten letras y espacios"
                                    }}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateField
                                        label="Fecha Inicio"
                                        required
                                        value={estudiosFormData.fecha_inicio}
                                        onChange={handleDateChange('fecha_inicio')}
                                    />
                                    <DateField
                                        label="Fecha Final"
                                        required
                                        value={estudiosFormData.fecha_final}
                                        onChange={handleDateChange('fecha_final')}
                                    />
                                </LocalizationProvider>

                                <Button
                                    type="submit"
                                    variant="outlined"
                                    sx={{ color: "#03c03c" }}
                                >
                                    Guardar
                                </Button>

                            </Grid>
                        )}
                    </Paper>
                </Grid>
            </form>
        </>
    );

};