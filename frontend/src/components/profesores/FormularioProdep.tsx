import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import useWindowSize from '../../../API/WindowSize';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from "@mui/material/Alert";

import { API_CONFIG } from '../../../API/config';


type PerfilProdepFormData = {
    id_usuario: string;
    pertenece_prodep: boolean;
    vigencia_prodep: string;
}

export default function FormularioProdep() {

    const { width } = useWindowSize()
    const [perteneceProdep, setPerteneceProdep] = useState(false);
    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

    const [perfilProdepFormData, setPerfilProdepFormData] = useState<PerfilProdepFormData>({
        id_usuario: '',
        pertenece_prodep: false,
        vigencia_prodep: '',
    })

    useEffect(() => {
        handleLoad();
    }, []);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setPerteneceProdep(event.target.checked);
    };

    const handleChange = (field: keyof PerfilProdepFormData) => (value: string) => {
        setPerfilProdepFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLoad = async () => {
        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PERFIL_PRODEP_URL + 'DevolverPerfilProdep/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localStorage.getItem('sdp_userId'))
            });

            const datos = await response.json();

            if (datos.data === false) {
                setPerfilProdepFormData({
                    pertenece_prodep: false,
                    vigencia_prodep: '',
                    id_usuario: ''
                })
            } else {
                setPerfilProdepFormData(datos.data)
                setPerteneceProdep(datos.data.pertenece_prodep)
            }

        } catch (error) {
            setAlert({ severity: 'error', message: 'Error en la petición' });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        perfilProdepFormData.id_usuario = localStorage.getItem('sdp_userId') ?? ''

        if (perteneceProdep === false) {
            perfilProdepFormData.pertenece_prodep = false
            perfilProdepFormData.vigencia_prodep = ''
        } else {
            perfilProdepFormData.pertenece_prodep = true
        }

        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PERFIL_PRODEP_URL + 'ActualizarPerfilProdep/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(perfilProdepFormData)
            });

            const datos = await response.json()

            setAlert({ severity: 'success', message: datos.message })

        } catch (error) {
            setAlert({ severity: 'error', message: 'Error en la petición' });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container direction={"column"}>
                    <Paper elevation={3} sx={{ mx: (width / 100) * 2, my: 1 }}>

                        <Typography variant="h4" align="center"
                            sx={{ mx: 5, my: 5, fontWeight: "bold", color: "#1976d2" }}>
                            Perfil PRODEP
                        </Typography>


                        {alert && (
                            <Alert severity={alert?.severity}>
                                {
                                    alert.message
                                }
                            </Alert>)}


                        <Grid container direction={"column"} spacing={2}
                            sx={{ mx: (width / 100) * 1, my: 2 }}>

                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={perteneceProdep}
                                        onChange={handleCheckboxChange}
                                    />}
                                    label="¿Cuenta con perfil PRODEP?"
                                />
                            </FormGroup>
                            {perteneceProdep && (

                                <TextField
                                    label="Vigencia del Perfil PRODEP"
                                    fullWidth
                                    required
                                    value={perfilProdepFormData.vigencia_prodep}
                                    onChange={(e) => handleChange('vigencia_prodep')(e.target.value)}
                                    error={!!perfilProdepFormData.vigencia_prodep && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(perfilProdepFormData.vigencia_prodep)}
                                    helperText={
                                        !!perfilProdepFormData.vigencia_prodep && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(perfilProdepFormData.vigencia_prodep)
                                            ? "Solo se permiten letras y espacios"
                                            : ""
                                    }
                                    inputProps={{
                                        pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                                        title: "Solo se permiten letras y espacios"
                                    }}
                                />

                            )}

                            <Button
                                type="submit"
                                variant="outlined"
                                sx={{ color: "#03c03c" }}
                            >
                                Guardar
                            </Button>
                        </Grid>

                    </Paper>
                </Grid>
            </form>
        </>
    );
};