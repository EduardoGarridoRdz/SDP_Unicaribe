import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import { API_CONFIG } from "../../../../API/config";
import Alert from "@mui/material/Alert"

// Estilos del botón //
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});



const SubirExcel: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

    // Función para mandar el archivo al backend //
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = event.target.files?.[0];

        // Se comprueba si se ha seleccionado un archivo //
        if (!archivo) {
            setAlert({ severity: 'error', message: 'Selecciona un archivo' });
            return;
        }

        setLoading(true)

        try {
            // Se crea un objeto FormData //
            const formData = new FormData();
            // Se agrega el archivo al FormData //
            formData.append("archivo", archivo);

            // Se envía el archivo al backend //
            const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.PROCESAR_ARCHIVO,
                {
                    method: "POST",
                    // Enviar el FormData como cuerpo de la solicitud //
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            const datos = await response.json()

            if (!response.ok) {
                setAlert({ severity: 'error', message: datos.message })
            } else {
                setAlert({ severity: 'success', message: datos.message })
            }



        } catch (error) {
            setAlert({ severity: 'error', message: `Hubo un error al procesar el archivo. ${error}` });
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setLoading(false)
        }
    };

    return (
        <>
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                Subir Excel
                <VisuallyHiddenInput
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </Button>
            {
                loading && (
                    <CircularProgress />
                )
            }
            {alert && (
                <Alert severity={alert?.severity}>
                    {
                        alert.message
                    }
                </Alert>)}
        </>
    );
};

export default SubirExcel;
