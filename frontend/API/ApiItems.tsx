import { MenuItem, TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import axios from "axios";
import { API_CONFIG } from "./config";
import { useState, useEffect } from "react";

// Tipos para las props
interface DynamicSelectProps extends Omit<TextFieldProps, "onChange"> {
    endpoint: string;
    onChange: (value: string) => void;
    valueKey?: string; // Clave del valor (ej: "id", "value", "tipo")
    labelKey?: string; // Clave del label (ej: "nombre", "label", "tipo")
}

export const DynamicSelect = ({
    endpoint,
    onChange,
    valueKey = "value",
    labelKey = "label",
    ...textFieldProps
}: DynamicSelectProps) => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_CONFIG.BASE_URL}${endpoint}`)
            .then((response) => {
                const data = response.data;
                const formattedOptions = data.map((item: any) => ({
                    value: item[valueKey] || item.tipo, // Si no hay valueKey, usa "tipo" (para compatibilidad)
                    label: item[labelKey] || item.tipo,  // Si no hay labelKey, usa "tipo"
                }));
                setOptions(formattedOptions);
            })
            .catch((err) => {
                console.error("Error fetching options:", err);
                setError("Error al cargar las opciones");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [endpoint, valueKey, labelKey]);

    if (loading) return <TextField {...textFieldProps} disabled label="Cargando..." />;
    if (error) return <TextField {...textFieldProps} error helperText={error} />;

    return (
        <TextField
            select
            onChange={(e) => onChange(e.target.value)}
            {...textFieldProps}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};