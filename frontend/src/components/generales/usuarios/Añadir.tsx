import { useState } from "react";
import { DynamicSelect } from "../../../../API/ApiItems";
import useWindowSize from "../../../../API/WindowSize";
import { API_CONFIG } from "../../../../API/config";
import {
    Grid, Paper, Typography, TextField, InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Alert from "@mui/material/Alert";

type UsuarioFormData = {
    nombre: string;
    apellido_pat: string;
    apellido_mat: string;
    correo: string;
    contrasena: string;
    tipo_usuario: string;
    departamento: string;
};

export default function AñadirUsuario() {
    const [formData, setFormData] = useState<UsuarioFormData>({
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        correo: '',
        contrasena: '',
        tipo_usuario: '',
        departamento: ''
    });

    const [MostrarContrasena, setMostrarContrasena] = useState(false);
    const handleClickMostrarContrasena = () => {
        setMostrarContrasena(!MostrarContrasena);
    }

    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

    // Maneja cambios en todos los campos (incluidos los selects)
    const handleChange = (field: keyof UsuarioFormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.REGISTRAR_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear usuario');
            }

            const data = await response.json();
            setAlert({ severity: 'success', message: data.message })

            setFormData({
                nombre: '',
                apellido_pat: '',
                apellido_mat: '',
                correo: '',
                contrasena: '',
                tipo_usuario: '',
                departamento: ''
            })

        } catch (error) {
            setAlert({ severity: 'error', message: error instanceof Error ? error.message : 'Error desconocido' });
        }
    };

    const { width } = useWindowSize();

    return (
        <>
            <Grid>
                {alert && (
                    <Alert severity={alert?.severity}>
                        {
                            alert.message
                        }
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} direction="column">
                        <Paper elevation={3}
                            sx={{ mx: (width / 100) * 2, my: 1 }}>

                            <Typography variant="h4" align="center"
                                sx={{ mx: 5, my: 5, fontWeight: 'bold', color: '#1976d2' }}>
                                Crear Usuario
                            </Typography>

                            <Grid container spacing={2} sx={{ textAlign: "center", mx: width * 0.01, my: 3 }}>

                                <TextField
                                    id="nombre"
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth={true}
                                    required
                                    value={formData.nombre}
                                    onChange={(e) => handleChange('nombre')(e.target.value)}
                                    error={!!formData.nombre && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.nombre)}
                                    helperText={
                                        !!formData.nombre && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.nombre)
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
                                    variant="outlined"
                                    fullWidth={true}
                                    required
                                    value={formData.apellido_pat}
                                    onChange={(e) => handleChange('apellido_pat')(e.target.value)}
                                    error={!!formData.apellido_pat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.apellido_pat)}
                                    helperText={
                                        !!formData.apellido_pat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.apellido_pat)
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
                                    variant="outlined"
                                    fullWidth={true}
                                    required
                                    value={formData.apellido_mat}
                                    onChange={(e) => handleChange('apellido_mat')(e.target.value)}
                                    error={!!formData.apellido_mat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.apellido_mat)}
                                    helperText={
                                        !!formData.apellido_mat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.apellido_mat)
                                            ? "Solo se permiten letras y espacios"
                                            : ""
                                    }
                                    inputProps={{
                                        pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                                        title: "Solo se permiten letras y espacios"
                                    }}
                                />

                                <TextField
                                    id="correo"
                                    label="Correo"
                                    variant="outlined"
                                    type="email"
                                    fullWidth={true}
                                    required
                                    value={formData.correo}
                                    onChange={(e) => handleChange('correo')(e.target.value)}
                                    error={!!formData.correo && !/^[^\s@]+@ucaribe\.edu\.mx$/i.test(formData.correo)}
                                    helperText={
                                        !!formData.correo && !/^[^\s@]+@ucaribe\.edu\.mx$/i.test(formData.correo)
                                            ? "Debe usar un correo @ucaribe.edu.mx"
                                            : "Ejemplo: nombreapellido@ucaribe.edu.mx"
                                    }
                                    inputProps={{
                                        pattern: "[^\\s@]+@ucaribe\\.edu\\.mx",
                                        title: "Debe usar un correo institucional @ucaribe.edu.mx"
                                    }}
                                />

                                <TextField
                                    id="contrasena"
                                    label="Contraseña"
                                    variant="outlined"
                                    type="password"
                                    fullWidth={true}
                                    required
                                    value={formData.contrasena}
                                    onChange={(e) => handleChange('contrasena')(e.target.value)}
                                    error={!!formData.contrasena && !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.contrasena)}
                                    helperText={
                                        !!formData.contrasena && !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.contrasena)
                                            ? "La contraseña debe tener: 8+ caracteres, 1 mayúscula y 1 número"
                                            : "Requisitos: 8+ caracteres, 1 mayúscula y 1 número"
                                    }
                                    inputProps={{
                                        pattern: "^(?=.*[A-Z])(?=.*\\d).{8,}$",
                                        title: "Debe contener: 8+ caracteres, 1 mayúscula y 1 número"
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickMostrarContrasena}
                                                    edge="end"
                                                >
                                                    {MostrarContrasena ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        type: MostrarContrasena ? 'text' : 'password'
                                    }}
                                />

                                <DynamicSelect
                                    endpoint={API_CONFIG.TIPO_USUARIO_URL}
                                    label="Tipo de Usuario"
                                    value={formData.tipo_usuario}
                                    onChange={handleChange('tipo_usuario')}  // <<< Cambio clave
                                    fullWidth
                                />

                                <DynamicSelect
                                    endpoint={API_CONFIG.DEPARTAMENTO_URL}
                                    label="Departamento"
                                    value={formData.departamento}
                                    valueKey="nombre_departamento"
                                    labelKey="nombre_departamento"
                                    onChange={handleChange('departamento')}  // <<< Cambio clave
                                    fullWidth
                                />

                            </Grid>

                            <Grid sx={{ textAlign: "center" }}>
                                <Button
                                    sx={{ mx: width * 0.01, my: 3, }}
                                    type="submit"
                                    variant="outlined"
                                    startIcon={<PersonAddAltIcon />}
                                >
                                    Crear Usuario
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </form>
            </Grid>
        </>
    );
}