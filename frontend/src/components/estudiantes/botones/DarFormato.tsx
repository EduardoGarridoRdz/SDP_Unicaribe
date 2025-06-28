import React, { useRef } from "react";
import { Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { styled } from "@mui/material/styles";

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


const DarFormato: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    // Función para mandar el archivo al backend //
    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const archivo = event.target.files?.[0];
        // Se comprueba si se ha seleccionado un archivo //
        if (!archivo) {
            alert("Por favor, selecciona un archivo.");
            return;
        }

        try {
            // Se crea un objeto FormData //
            const formData = new FormData();
            // Se agrega el archivo al FormData //
            formData.append("archivo", archivo);

            // Se envía el archivo al backend //
            const respuesta = await fetch(
                "http://127.0.0.1:8000/api/FormatoArchivo/",
                {
                    method: "POST",
                    // Enviar el FormData como cuerpo de la solicitud //
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (!respuesta.ok) throw new Error("Error al descargar el archivo");

            // Se recibe la respuesta del procesamiento del backend //
            const archivoFormateado = await respuesta.blob();
            const url = window.URL.createObjectURL(archivoFormateado);
            const a = document.createElement("a");
            a.href = url;
            a.download = "tabla.xlsx";
            a.click();
        } catch (error) {
            alert(`Hubo un error al procesar el archivo. ${error}`);
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <Button
            sx={{ backgroundColor: "#dd6d10" }}
            component="label"
            variant="contained"
            startIcon={<ArticleIcon />}
            tabIndex={-1}
        >
            Dar formato
            <VisuallyHiddenInput
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                ref={fileInputRef}
            />
        </Button>
    );
};

export default DarFormato;
