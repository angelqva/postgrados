import * as React from 'react';
import { Box, TextField, Paper, Grid, Typography, Switch } from '@mui/material';
import { FormControl, FormHelperText, Button, FormControlLabel } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const profesores = [
	
]
const estudiantes = [
	{ id: 1, nombre: 'Estudiante-1', apellidos:'Apellido Estudiante-1'},
	{ id: 2, nombre: 'Estudiante-2', apellidos:'Apellido Estudiante-2'},
	{ id: 3, nombre: 'Estudiante-3', apellidos:'Apellido Estudiante-3'},
	{ id: 4, nombre: 'Estudiante-4', apellidos:'Apellido Estudiante-4'},
	{ id: 5, nombre: 'Estudiante-5', apellidos:'Apellido Estudiante-5'},
	{ id: 6, nombre: 'Estudiante-6', apellidos:'Apellido Estudiante-6'},
]
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Crear() {
	const [checked, setChecked] = React.useState(true);
	const [rango, setRango] = React.useState([null, null]);
	const [inputProfesorValue, setInputProfesorValue] = React.useState('');
	const [inputEstudianteValue, setInputEstudianteValue] = React.useState('');
	const [profesor, setProfesor] = React.useState(profesores[0]);
	const [estudiante, setEstudiante] = React.useState([]);
		const handleChecked = (event) => {
				setChecked(event.target.checked);
		};
		return (
			<Box
				sx={{
					alignItems: 'center',
					'& > :not(style)': { m:'48px 8px 8px 8px' },
					width:'100%'
				}}
				component='form'
				>
				<Paper elevation={3} sx={{ p:2}}>
					<Grid container>
						<Grid item xs={12}>
								<Typography gutterBottom={false} variant='h6' className='card-title' sx={{
										fontSize:{ xs:'1.2em', md:'1.5em'},
										}}>
										Postgrado Internacional
								</Typography>
								<Typography gutterBottom={false} variant='p' className='card-subTitle' component={'p'} sx={{
										fontSize: { xs:'1em', md:'1.25em'},
										}}>
										Complete los siguientes campos
								</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl className='form-control'>
								<TextField
									name='tema'
									label='Tema'
								/>
								<FormHelperText>Tema del Postgrado</FormHelperText>
							</FormControl>
						</Grid> 
						<Grid item xs={12} md={6}>
							<FormControl className='form-control'>
								<TextField
									name='codigo'
									label='Código'
								/>
								<FormHelperText>Código del Postgrado</FormHelperText>
							</FormControl>
						</Grid>
						<Grid container>                        
							<Grid item xs={12} md={6}>
								<FormControl className='form-control'>
									<TextField
										name='cantidad_horas'
										label='Horas Clases'
										type='number'
									/>
									<FormHelperText>Cantidad de Horas</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControl className='form-control'>
									<FormControlLabel
										control={
											<Switch
											checked={checked}
											onChange={handleChecked}
											inputProps={{ 'aria-label': 'controlled' }}
											/>
										}
										label="Impartido en la Universidad"
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container>                        
							<Grid item xs={12} md={6}>
								<FormControl className='form-control'>
									<TextField
										name='pais_impartido'
										label='País Impartido'
									/>
									<FormHelperText>País Impartido</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControl className='form-control'>
									<FormControlLabel
										control={
											<Switch
											checked={checked}
											onChange={handleChecked}
											inputProps={{ 'aria-label': 'controlled' }}
											/>
										}
										label="Primera Vez Impartido"
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<FormControl className='form-control'>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateRangePicker
										startText="Inicio"
										endText="Fin"
										value={rango}
										onChange={(newValue) => {
											setRango(newValue);
										}}
										renderInput={(startProps, endProps) => (
										<React.Fragment>
											<TextField {...startProps} />
												<Box sx={{ mx: 2 }}> {'-'} </Box>
											<TextField {...endProps} />
										</React.Fragment>
										)}
									/>
									</LocalizationProvider>
									<FormHelperText sx={{textAlign:'center'}}>Selecciones las fechas</FormHelperText>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<FormControl className='form-control'>
									<Autocomplete
										sx={{ width: '100%' }}
										options={profesores}
										value={profesor}
										onChange={(event, newValue) => {
											setProfesor(newValue);
										}}
										inputValue={inputProfesorValue}
										onInputChange={(event, newInputValue) => {
											setInputProfesorValue(newInputValue);
										}}
										autoHighlight
										getOptionLabel={(option) => option.nombre}
										renderOption={(props, option) => (
											<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
												{option.nombre} {option.apellidos}
											</Box>
										)}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Selecciona un Profesor"
												inputProps={{
													...params.inputProps,
													autoComplete: 'new-password', // disable autocomplete and autofill
												}}
											/>
										)}
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<FormControl className='form-control'>
									<Autocomplete
										sx={{ width: '100%' }}
										options={estudiantes}
										value={estudiante===[]?null:estudiante}
										onChange={(event, newValue) => {
											setEstudiante(newValue);
											console.log(estudiante);
										}}
										
										inputValue={inputEstudianteValue}
										onInputChange={(event, newInputValue) => {
											setInputEstudianteValue(newInputValue);
											console.log(estudiante);
										}}
										disableCloseOnSelect
										multiple
										getOptionLabel={(option) => option.nombre}
										renderOption={(props, option, { selected }) => (
											<li {...props}>
											<Checkbox
												icon={icon}
												checkedIcon={checkedIcon}
												style={{ marginRight: 8 }}
												checked={selected}
											/>
											{option.nombre} {option.apellidos}
											</li>
										)}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Selecciona un Profesor"
												inputProps={{
													...params.inputProps,
													autoComplete: 'new-password', // disable autocomplete and autofill
												}}
											/>
										)}
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<FormControl className='form-control'>
									<Button fullWidth variant="contained" size="large">
										Crear Postgrado Internacional
									</Button>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		)
}

export default Crear

