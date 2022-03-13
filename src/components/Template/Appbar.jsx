import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink} from 'react-router-dom';

// const pages = ['Estudiantes', 'Profesores', 'Nacionales', 'Internacionales', 'Reportes'];
const rutas = [
  {
    label: 'Estudiantes', value: '/estudiantes'
  },
  {
    label: 'Profesores', value: '/profesores'
  },
  {
    label: 'Nacionales', value: '/postgrados-nacionales'
  },
  {
    label: 'Internacionales', value: '/postgrados-internacionales'
  },
  {
    label: 'Reportes', value: '/reportes'
  },
];
const Appbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">        
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to='/'
            className='brand'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            APLICACIÓN POSTGRADOS
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to='/'
            className='brand'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent:'center'}}
          >
            APLICACIÓN POSTGRADOS
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {rutas.map((ruta, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={ruta.value}
                >
                  <Typography textAlign="center">{ruta.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'end'}}>
            {rutas.map((ruta, index) => (
              <Button
                key={index}
                to={ruta.value}
                onClick={handleCloseNavMenu}
                component={RouterLink}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {ruta.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Appbar;