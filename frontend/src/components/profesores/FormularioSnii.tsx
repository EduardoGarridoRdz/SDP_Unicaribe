import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import useWindowSize from '../../../API/WindowSize';
import { DynamicSelect } from '../../../API/ApiItems';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from "@mui/material/Alert";

import { API_CONFIG } from '../../../API/config';


type PerfilSniiFormData = {
    id_usuario: string;
    pertenece_snii: boolean;
    vigencia_snii: string;
    id_nivel: string;
}


export default function FormularioSeii() {

    const { width } = useWindowSize();
    const [perteneceSnii, setPerteneceSnii] = useState(false);
    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

    const [perfilSniiFormData, setPerfilSniiFormData] = useState<PerfilSniiFormData>({
        id_usuario: '',
        pertenece_snii: false,
        vigencia_snii: '',
        id_nivel: ''
    })

    useEffect(() => {
        handleLoad();
    }, []);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setPerteneceSnii(event.target.checked);
    };

    const handleChange = (field: keyof PerfilSniiFormData) => (value: string) => {
        setPerfilSniiFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLoad = async () => {
        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PERFIL_SNII_URL + 'DevolverPerfilSnii/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localStorage.getItem('sdp_userId'))
            });

            const datos = await response.json();
            console.log(datos.data)
            if (datos.data === false) {
                setPerfilSniiFormData({
                    id_usuario: '',
                    pertenece_snii: false,
                    vigencia_snii: '',
                    id_nivel: ''
                })
            } else {
                console.log(datos.data)
                setPerfilSniiFormData(datos.data)
                setPerteneceSnii(datos.data.pertenece_snii)
            }

        } catch (error) {
            setAlert({ severity: 'error', message: 'Error en la petición' });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        perfilSniiFormData.id_usuario = localStorage.getItem('sdp_userId') ?? ''

        if (perteneceSnii === false) {
            perfilSniiFormData.pertenece_snii = false
            perfilSniiFormData.vigencia_snii = ''
            perfilSniiFormData.id_nivel = 'Sin nivel'
        } else {
            perfilSniiFormData.pertenece_snii = true
        }

        console.log(perfilSniiFormData)
        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PERFIL_SNII_URL + 'ActualizarPerfilSnii/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(perfilSniiFormData)
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
                            Perfil SNII
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
                                        checked={perteneceSnii}
                                        onChange={handleCheckboxChange}
                                    />}
                                    label="¿Pertenece al Sistema Nacional de Investigadoras e Investigadores?"
                                />
                            </FormGroup>

                            {perteneceSnii && (
                                <>
                                    <TextField
                                        label="Vigencia del Perfil SNII"
                                        fullWidth
                                        required
                                        value={perfilSniiFormData.vigencia_snii}
                                        onChange={(e) => handleChange('vigencia_snii')(e.target.value)}
                                        error={!!perfilSniiFormData.vigencia_snii && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(perfilSniiFormData.vigencia_snii)}
                                        helperText={!!perfilSniiFormData.vigencia_snii && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(perfilSniiFormData.vigencia_snii)
                                            ? "Solo se permiten letras y espacios"
                                            : ""}
                                        inputProps={{
                                            pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                                            title: "Solo se permiten letras y espacios"
                                        }} />

                                    <DynamicSelect
                                        endpoint={API_CONFIG.NIVEL_INVESTIGADOR_URL}
                                        label="Nivel de Investigador"
                                        value={perfilSniiFormData.id_nivel}
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