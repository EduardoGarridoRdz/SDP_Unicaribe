import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import useWindowSize from '../../../API/WindowSize';
import { DynamicSelect } from '../../../API/ApiItems';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from "@mui/material/Alert";

import { API_CONFIG } from '../../../API/config';


type PerfilSeiiFormData = {
    id_usuario: string;
    pertenece_seii: boolean;
    vigencia_seii: string;
    id_nivel: string;
}


export default function FormularioSeii() {

    const { width } = useWindowSize();
    const [perteneceSeii, setPerteneceSeii] = useState(false);
    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

    const [perfilSeiiFormData, setPerfilSeiiFormData] = useState<PerfilSeiiFormData>({
        id_usuario: '',
        pertenece_seii: false,
        vigencia_seii: '',
        id_nivel: ''
    })

    useEffect(() => {
        handleLoad();
    }, []);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setPerteneceSeii(event.target.checked);
    };

    const handleChange = (field: keyof PerfilSeiiFormData) => (value: string) => {
        setPerfilSeiiFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLoad = async () => {
        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PERFIL_SEII_URL + 'DevolverPerfilSeii/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localStorage.getItem('sdp_userId'))
            });

            const datos = await response.json();
            console.log(datos.data)
            if (datos.data === false) {
                setPerfilSeiiFormData({
                    id_usuario: '',
                    pertenece_seii: false,
                    vigencia_seii: '',
                    id_nivel: ''
                })
            } else {
                console.log(datos.data)
                setPerfilSeiiFormData(datos.data)
                setPerteneceSeii(datos.data.pertenece_seii)
            }

        } catch (error) {
            setAlert({ severity: 'error', message: 'Error en la petición' });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        perfilSeiiFormData.id_usuario = localStorage.getItem('sdp_userId') ?? ''

        if (perteneceSeii === false) {
            perfilSeiiFormData.pertenece_seii = false
            perfilSeiiFormData.vigencia_seii = ''
            perfilSeiiFormData.id_nivel = 'Sin nivel'
        } else {
            perfilSeiiFormData.pertenece_seii = true
        }

        console.log(perfilSeiiFormData)
        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PERFIL_SEII_URL + 'ActualizarPerfilSeii/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(perfilSeiiFormData)
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
                            Perfil SEII
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
                                        checked={perteneceSeii}
                                        onChange={handleCheckboxChange}
                                    />}
                                    label="¿Pertenece al Sistema Estatal de Investigadoras e Investigadores?"
                                />
                            </FormGroup>

                            {perteneceSeii && (
                                <>
                                    <TextField
                                        label="Vigencia del Perfil SEII"
                                        fullWidth
                                        required
                                        value={perfilSeiiFormData.vigencia_seii}
                                        onChange={(e) => handleChange('vigencia_seii')(e.target.value)}
                                        error={!!perfilSeiiFormData.vigencia_seii && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(perfilSeiiFormData.vigencia_seii)}
                                        helperText={!!perfilSeiiFormData.vigencia_seii && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(perfilSeiiFormData.vigencia_seii)
                                            ? "Solo se permiten letras y espacios"
                                            : ""}
                                        inputProps={{
                                            pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                                            title: "Solo se permiten letras y espacios"
                                        }} />

                                    <DynamicSelect
                                        endpoint={API_CONFIG.NIVEL_INVESTIGADOR_URL}
                                        label="Nivel de Investigador"
                                        value={perfilSeiiFormData.id_nivel}
                                        valueKey='nivel_investigador'
                                        labelKey='nivel_investigador'
                                        onChange={handleChange('id_nivel')}
                                        fullWidth
                                        required
                                    />
                                </>


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