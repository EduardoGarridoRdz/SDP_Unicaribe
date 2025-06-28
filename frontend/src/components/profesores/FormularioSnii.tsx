import { useState } from 'react';
import { Grid, Paper, Typography, TextField } from '@mui/material';
import useWindowSize from '../../../API/WindowSize';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { DynamicSelect } from '../../../API/ApiItems';
import { API_CONFIG } from '../../../API/config';


type CapacitacionFormData = {
    tipo_capacitacion: string,
    nombre_evento: string,
    organizador: string,
    sede: string,
    fecha_inicio: Date | null,
    fecha_finalizacion: Date | null,
}


export default function FormularioSnii() {

    const { width } = useWindowSize()

    const [capacitacionFormData, setCapacitacionFormData] = useState<CapacitacionFormData>({
        tipo_capacitacion: 'string',
        nombre_evento: 'string',
        organizador: 'string',
        sede: 'string',
        fecha_inicio: null,
        fecha_finalizacion: null,
    })

    const [perteneceProdep, setPerteneceProdep] = useState(false);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setPerteneceProdep(event.target.checked);
    };

    const handleChange = (field: keyof CapacitacionFormData) => (value: string) => {
        setCapacitacionFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    return (
        <>
            <form>
                <Grid container direction={"column"}>
                    <Paper elevation={3} sx={{ mx: (width / 100) * 2, my: 1 }}>

                        <Typography variant="h4" align="center"
                            sx={{ mx: 5, my: 5, fontWeight: "bold", color: "#1976d2" }}>
                            Perfil PRODEP
                        </Typography>

                        <Grid container direction={"column"} spacing={2}
                            sx={{ mx: (width / 100) * 1, my: 2 }}>

                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={perteneceProdep}
                                        onChange={handleCheckboxChange}
                                    />}
                                    label="¿Pertenece al Sistema Nacional de Investigadoras e Investigadores? (SNII)"
                                    value={true} />
                            </FormGroup>

                            {perteneceProdep && (
                                <TextField
                                    label="Vigencia"
                                />
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </form>
        </>
    );
};