import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import logo from '../../../assets/logo_unicaribe.png';
import { API_CONFIG } from '../../../../API/config';
import useWindowSize from '../../../../API/WindowSize';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert"


export default function Login() {
    const navigate = useNavigate();
    const [MostrarContrasena, setMostrarContrasena] = useState(false);
    const [correo, setCorreo] = useState('');
    const [contrasena, setcontrasena] = useState('');
    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

    const handleClickMostrarContrasena = () => {
        setMostrarContrasena(!MostrarContrasena);
    }

    const userToken = localStorage.getItem('sdp_userToken')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.VALIDAR_USUARIO_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contrasena, userToken }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la autenticación');
            }

            const data = await response.json();

            localStorage.setItem('sdp_userToken', data.sdp_userToken);
            localStorage.setItem('sdp_userRole', data.sdp_userRole); // Guardar el tipo de usuario
            localStorage.setItem('sdp_userId', data.sdp_userId);

            if (data.sdp_userRole === "Administrador" || data.sdp_userRole === "Profesor") {
                navigate("/inicio"); // Ruta para administradores
            } else {
                navigate("/login"); // En caso de un tipo no reconocido
            }

        } catch (error) {
            setAlert({ severity: 'error', message: 'Correo o Contraseña incorrecta' });
        }
    };

    const { height } = useWindowSize();

    return (
        <Grid sx={{ p: 5 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} alignItems="center" direction="column" sx={{ p: (height / 100) * 0.1 }}>
                    <Paper elevation={3} sx={{ p: 10 }}>

                        <img src={logo} width={300} />

                        <Typography component="h1" variant="h5" align='center' fontStyle='bold' sx={{ p: 1 }}>
                            Iniciar Sesión
                        </Typography>

                        <Grid container spacing={3} alignItems="center" direction="column">
                            {alert && (
                                <Alert severity={alert?.severity}>
                                    {
                                        alert.message
                                    }
                                </Alert>
                            )}
                            <TextField
                                required
                                fullWidth
                                id="correo"
                                label="Correo Electrónico"
                                name="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                error={!!correo && !/^[^\s@]+@ucaribe\.edu\.mx$/i.test(correo)}
                                inputProps={{
                                    pattern: "[^\\s@]+@ucaribe\\.edu\\.mx",
                                    title: "Debe usar un correo institucional @ucaribe.edu.mx"
                                }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="contrasena"
                                label="Contraseña"
                                name="contrasena"
                                type="password"
                                value={contrasena}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setcontrasena(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
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

                            <Button
                                type="submit"
                                variant="outlined"
                            >
                                Iniciar Sesión
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </form>
        </Grid>
    );
};
