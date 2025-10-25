import { useEffect, useState } from "react";
import {
    Grid, Paper, Typography, TextField, Radio, RadioGroup,
    FormControlLabel, FormControl, FormLabel, Button
} from "@mui/material";

import { API_CONFIG } from "../../../API/config";
import { DynamicSelect } from "../../../API/ApiItems";
import useWindowSize from "../../../API/WindowSize";
import Alert from "@mui/material/Alert";


type ProfesorFormData = {
    nombre: string;
    apellido_pat: string;
    apellido_mat: string;
    sexo: boolean;
    grado_academico: string;
    programa_educativo: string;
    departamento: string;
    correo: string;
    tipo_profesor: string;
    jefe_departamento: boolean
    activo: boolean
}

export default function FormularioPersonal() {
    const { width } = useWindowSize();
    const [profesorFormData, setProfesorFormData] = useState<ProfesorFormData>({
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        sexo: true,
        grado_academico: '',
        programa_educativo: '',
        departamento: '',
        correo: '',
        tipo_profesor: '',
        jefe_departamento: false,
        activo: true
    })

    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);


    useEffect(() => {
        handleLoad();
    }, []);

    const handleChange = (field: keyof ProfesorFormData) => (value: string) => {
        setProfesorFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ACTUALIZAR_PROFESOR_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profesorFormData)
            });
            const datos = await response.json()

            setAlert({ severity: 'success', message: datos.message })

        } catch (error) {
            setAlert({ severity: 'error', message: error instanceof Error ? error.message : 'Error desconocido' });
        }

    }

    const handleLoad = async () => {
        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PROFESOR_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localStorage.getItem('sdp_userId'))
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error cargando datos');
            }

            const datos = await response.json()
            setProfesorFormData(datos.data)
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
                            Datos Personales
                        </Typography>

                        {alert && (
                            <Alert severity={alert?.severity}>
                                {
                                    alert.message
                                }
                            </Alert>)}

                        {profesorFormData && (
                            <Grid container spacing={2} direction="column"
                                sx={{ mx: (width / 100) * 1, my: 2 }}>

                                <TextField
                                    id="nombre"
                                    label="Nombre(s)"
                                    fullWidth
                                    required
                                    value={profesorFormData.nombre}
                                    onChange={(e) => handleChange('nombre')(e.target.value)}
                                    error={!!profesorFormData.nombre && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(profesorFormData.nombre)}
                                    helperText={
                                        !!profesorFormData.nombre && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(profesorFormData.nombre)
                                            ? "Solo se permiten letras y espacios"
                                            : ""
                                    }
                                    inputProps={{
                                        pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                                        title: "Solo se permiten letras y espacios"
                                    }}
                                />

                                <TextField
                                    id="apellido_pat"
                                    label="Apellido Paterno"
                                    fullWidth
                                    required
                                    value={profesorFormData.apellido_pat}
                                    onChange={(e) => handleChange('apellido_pat')(e.target.value)}
                                    error={!!profesorFormData.apellido_pat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(profesorFormData.apellido_pat)}
                                    helperText={
                                        !!profesorFormData.apellido_pat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(profesorFormData.apellido_pat)
                                            ? "Solo se permiten letras y espacios"
                                            : ""
                                    }
                                    inputProps={{
                                        pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                                        title: "Solo se permiten letras y espacios"
                                    }}
                                />

                                <TextField
                                    id="apellido_mat"
                                    label="Apellido Materno"
                                    fullWidth
                                    required
                                    value={profesorFormData.apellido_mat}
                                    onChange={(e) => handleChange('apellido_mat')(e.target.value)}
                                    error={!!profesorFormData.apellido_mat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(profesorFormData.apellido_mat)}
                                    helperText={
                                        !!profesorFormData.apellido_mat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(profesorFormData.apellido_mat)
                                            ? "Solo se permiten letras y espacios"
                                            : ""
                                    }
                                    inputProps={{
                                        pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                                        title: "Solo se permiten letras y espacios"
                                    }}
                                />

                                <TextField
                                    label="Correo"
                                    variant="outlined"
                                    type="email"
                                    fullWidth
                                    disabled
                                    value={profesorFormData.correo}
                                />

                                <FormControl >
                                    <FormLabel id="sexo-label">Sexo</FormLabel>
                                    <RadioGroup
                                        value={profesorFormData.sexo} // Ahora sería "mujer" o "hombre"
                                        onChange={(e) => handleChange('sexo')(e.target.value)}
                                    >
                                        <FormControlLabel value={true} control={<Radio />} label="Mujer" />
                                        <FormControlLabel value={false} control={<Radio />} label="Hombre" />
                                    </RadioGroup>
                                </FormControl>

                                <DynamicSelect
                                    endpoint={API_CONFIG.GRADO_ACADEMICO_URL}
                                    label="Grado Académico"
                                    value={profesorFormData.grado_academico}
                                    valueKey="grado_academico"
                                    labelKey="grado_academico"
                                    onChange={handleChange('grado_academico')}
                                    fullWidth
                                />

                                <DynamicSelect
                                    endpoint={API_CONFIG.TIPO_PROFESOR_URL}
                                    label="Tipo de Profesor"
                                    value={profesorFormData.tipo_profesor}
                                    valueKey="tipo_profesor"
                                    labelKey="tipo_profesor"
                                    onChange={handleChange('tipo_profesor')}
                                    fullWidth
                                />

                                <DynamicSelect
                                    endpoint={API_CONFIG.DEPARTAMENTO_URL}
                                    label="Departamento"
                                    value={profesorFormData.departamento}
                                    valueKey="nombre_departamento"
                                    labelKey="nombre_departamento"
                                    onChange={handleChange('departamento')}
                                    fullWidth
                                />

                                <DynamicSelect
                                    endpoint={API_CONFIG.PROGRAMA_EDUCATIVO}
                                    label="Programa Educativo"
                                    value={profesorFormData.programa_educativo}
                                    valueKey="programa_educativo"
                                    labelKey="programa_educativo"
                                    onChange={handleChange('programa_educativo')}
                                    fullWidth
                                />


                                {/*<FormGroup>
                                    <FormControlLabel disabled control={<Checkbox />}
                                        label="Jefe de Departamento" value={false} />
                                </FormGroup>*/}
                                <Button
                                    type="submit"
                                    variant="outlined">
                                    Enviar
                                </Button>

                            </Grid>
                        )}
                    </Paper>
                </Grid>
            </form>

        </>
    );
};