import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import {
    Typography, Button, TextField, Paper, Checkbox,
    FormControlLabel
} from "@mui/material";
import { API_CONFIG } from '../../../../API/config';
import { DynamicSelect } from '../../../../API/ApiItems';
import useWindowSize from '../../../../API/WindowSize';
import Alert from "@mui/material/Alert";

interface ApiResponse {
    status: string;
    data: UserData;
}

interface UserData {
    correo: string;
    nombre?: string;
    apellido_pat?: string;
    apellido_mat?: string;
    contrasena?: string;
    tipo_usuario?: string;
    departamento?: string;
    activo?: boolean
}

const GestionarUsuario: React.FC = () => {
    const [correo, setEmail] = useState('');
    const { width } = useWindowSize();
    const [userData, setUserData] = useState<ApiResponse | null>(null);

    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.OBTENER_USUARIO, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo }),
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al buscar usuario');
            }

            const responseData: ApiResponse = await response.json();
            setUserData(responseData);
            setAlert({ severity: 'success', message: 'Usuario encontrado' })

        } catch (error) {
            setAlert({ severity: 'error', message: error instanceof Error ? error.message : 'Error desconocido' });
            setUserData(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setUserData(prev => prev ? {
            ...prev,
            data: {
                ...prev.data,
                [id]: type === 'checkbox' ? checked : value
            }
        } : null);
    };

    const handleSelectChange = (field: keyof UserData) => (value: string) => {
        setUserData(prev => prev ? {
            ...prev,
            data: {
                ...prev.data,
                [field]: value
            }
        } : null);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Datos a enviar:" + JSON.stringify(userData?.data))

        try {
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.EDITAR_USUARIO, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData?.data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear usuario');
            }

            setAlert({ severity: 'success', message: 'Usuario actualizado correctamente' })
            setUserData(null)
        } catch (error) {
            setAlert({ severity: 'error', message: error instanceof Error ? error.message : 'Error desconocido' });
            setUserData(null);
        }
    };

    return (
        <Grid container spacing={1} direction="column">
            <Paper elevation={3}
                sx={{ mx: (width / 100) * 2, my: 1 }}>

                <form onSubmit={handleSubmit}>

                    <Typography variant="h4" align="center"
                        sx={{ mx: 2, my: 3, fontWeight: 'bold', color: '#1976d2' }}>
                        Editar Usuario
                    </Typography>

                    <Typography align="center"
                        sx={{ my: 1, fontWeight: 'bold' }}>
                        Introduzca un correo para buscar el usuario a editar.
                    </Typography>

                    <Grid container direction="column" alignItems="center"
                        sx={{ mx: width * 0.01, my: 3 }}>
                        <TextField
                            sx={{ mb: 2 }}
                            type="correo"
                            label="Correo"
                            value={correo}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                            required
                        />

                        <Button type="submit" variant="contained" sx={{ width: width * 0.15 }}>Buscar</Button>

                    </Grid>
                </form>

                {alert && (
                    <Alert severity={alert?.severity}>
                        {
                            alert.message
                        }
                    </Alert>
                )}

                {userData?.data && (
                    <form onSubmit={handleUpdate}>
                        <Typography align="center" variant="body1"
                            sx={{ my: 2, fontWeight: 'bold' }}>
                            Actualizar usuario:
                        </Typography>

                        <Grid container spacing={2} direction={"column"} sx={{ mx: width * 0.01, my: 3 }}>

                            <TextField
                                id='nombre'
                                label="Nombre(s)"
                                name='nombre'
                                onChange={handleChange}
                                value={userData.data.nombre}
                            />

                            <TextField
                                id='apellido_pat'
                                label='Apellido Paterno'
                                name='apellido_pat'
                                onChange={handleChange}
                                value={userData.data.apellido_pat} />

                            <TextField
                                id='apellido_mat'
                                label='Apellido Materno'
                                name='apellido_mat'
                                onChange={handleChange}
                                value={userData.data.apellido_mat} />

                            <TextField
                                id='correo'
                                label='Correo'
                                name='correo'
                                onChange={handleChange}
                                value={userData.data.correo}
                                disabled={true} />

                            <TextField
                                id='contrasena'
                                label='Contraseña'
                                name='contrasena'
                                onChange={handleChange}
                                value={userData.data.contrasena} />

                            <DynamicSelect
                                endpoint={API_CONFIG.TIPO_USUARIO_URL}
                                label="Tipo de Usuario"
                                value={userData.data.tipo_usuario}
                                valueKey='tipo'
                                labelKey='tipo'
                                onChange={handleSelectChange('tipo_usuario')}
                            />

                            <DynamicSelect
                                endpoint={API_CONFIG.DEPARTAMENTO_URL}
                                label="Departamento"
                                value={userData.data.departamento}
                                valueKey='nombre_departamento'
                                labelKey='nombre_departamento'
                                onChange={handleSelectChange('departamento')}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userData?.data.activo || false}
                                        onChange={handleChange}
                                        id='activo'
                                        name='activo'
                                    />}
                                label="Usuario Activo" />

                            <Button
                                type="submit"
                                variant="outlined"
                            >
                                Actualizar
                            </Button>


                        </Grid>
                    </form>
                )}
            </Paper>
        </Grid>
    );
};

export default GestionarUsuario;