import * as React from 'react';
import { Box, Grid } from '@mui/material';
import CrearEstudiante from './CrearEstudiante'

export default function Estudiantes() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <CrearEstudiante />
                </Grid>
                <Grid item xs={12} md={8}>
                
                </Grid>
            </Grid>
        </Box>
    );
}
