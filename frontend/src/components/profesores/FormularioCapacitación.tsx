import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import Alert from "@mui/material/Alert";

import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

import useWindowSize from "../../../API/WindowSize";
import { DynamicSelect } from "../../../API/ApiItems";
import { API_CONFIG } from "../../../API/config";

type CapacitacionFormData = {
    tipo_capacitacion: string,
    nombre_evento: string,
    organizador: string,
    sede: string,
    fecha_inicio: Dayjs | null,
    fecha_finalizacion: Dayjs | null,
    id_usuario: string
}

export default function FormularioAcademico() {

    const { width } = useWindowSize()

    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);


    const [capacitacionFormData, setCapacitacionFormData] = useState<CapacitacionFormData>({
        tipo_capacitacion: '',
        nombre_evento: '',
        organizador: '',
        sede: '',
        fecha_inicio: null,
        fecha_finalizacion: null,
        id_usuario: ''
    })

    const handleChange = (field: keyof CapacitacionFormData) => (value: string) => {
        setCapacitacionFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDateChange = (field: keyof CapacitacionFormData) => (value: Dayjs | null) => {
        setCapacitacionFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        capacitacionFormData.id_usuario = localStorage.getItem('sdp_userId') ?? ''

        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PROFESOR_CAPACITACION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(capacitacionFormData)
            });

            if (!response.ok) {
                throw new Error("Error al registrar capacitación");
            }

            const datos = await response.json()

            setAlert({ severity: 'success', message: datos.message })
            setCapacitacionFormData({
                tipo_capacitacion: '',
                nombre_evento: '',
                organizador: '',
                sede: '',
                fecha_inicio: null,
                fecha_finalizacion: null,
                id_usuario: ''
            })

        } catch (error) {
            setAlert({ severity: 'error', message: error instanceof Error ? error.message : 'Error desconocido' });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1} direction="column">

                    <Paper elevation={3} sx={{ mx: (width / 100) * 2, my: 1 }}>

                        <Typography variant="h4" align="center"
                            sx={{ mx: 5, my: 5, fontWeight: "bold", color: "#1976d2" }}>
                            Capacitaciones
                        </Typography>

                        {alert && (
                            <Alert severity={alert?.severity}>
                                {
                                    alert.message
                                }
                            </Alert>)}

                        <Grid container spacing={2} direction="column"
                            sx={{ mx: (width / 100) * 1, my: 3 }}>

                            <DynamicSelect
                                endpoint={API_CONFIG.TIPO_CAPACITACION_URL}
                                label="Tipo de Capacitación"
                                value={capacitacionFormData.tipo_capacitacion}
                                valueKey="tipo_capacitacion"
                                labelKey="tipo_capacitacion"
                                onChange={handleChange('tipo_capacitacion')}
                                fullWidth
                            />

                            <TextField
                                id="nombre_evento"
                                label="Nombre del evento"
                                fullWidth
                                required
                                value={capacitacionFormData.nombre_evento}
                                onChange={(e) => handleChange('nombre_evento')(e.target.value)}
                            />


                            <TextField
                                id="organizador"
                                label="Nombre del organizador"
                                fullWidth
                                required
                                value={capacitacionFormData.organizador}
                                onChange={(e) => handleChange('organizador')(e.target.value)}
                            />


                            <TextField
                                id="sede"
                                label="Sede de la capacitación"
                                fullWidth
                                required
                                value={capacitacionFormData.sede}
                                onChange={(e) => handleChange('sede')(e.target.value)}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField
                                    label="Fecha Inicio"
                                    required
                                    value={capacitacionFormData.fecha_inicio}
                                    onChange={handleDateChange('fecha_inicio')}
                                />
                                <DateField
                                    label="Fecha Final"
                                    required
                                    value={capacitacionFormData.fecha_finalizacion}
                                    onChange={handleDateChange('fecha_finalizacion')}
                                />
                            </LocalizationProvider>

                            <Button
                                type="submit"
                                variant="outlined"
                            >
                                Enviar
                            </Button>

                        </Grid>
                    </Paper>
                </Grid>
            </form>
        </>
    );
};