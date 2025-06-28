import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';

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

    // Función para mandar el archivo al backend //
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = event.target.files?.[0];

        // Se comprueba si se ha seleccionado un archivo //
        if (!archivo) {
            alert("Por favor, selecciona un archivo.");
            return;
        }

        setLoading(true)

        try {
            // Se crea un objeto FormData //
            const formData = new FormData();
            // Se agrega el archivo al FormData //
            formData.append("archivo", archivo);

            // Se envía el archivo al backend //
            const respuesta = await fetch(
                "http://127.0.0.1:8000/api/ProcesarExcel/",
                {
                    method: "POST",
                    // Enviar el FormData como cuerpo de la solicitud //
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            // Se recibe la respuesta del procesamiento del backend //
            const respuestaJSON = await respuesta.json();

            if (respuesta.ok) {
                alert(respuestaJSON.message);
            } else {
                alert(respuestaJSON.message);
            }
        } catch (error) {
            alert(`Hubo un error al procesar el archivo. ${error}`);
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
        </>
    );
};

export default SubirExcel;
