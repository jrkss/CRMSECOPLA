import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import logosecopla from '../images/logosecopla.png'
import {CardMedia} from "@mui/material";
import '../css/Menu.css';

function Menu(props) {

    const drawerWidth = 240;
    const cookies = new Cookies();

    /**
     * 
     * 
     */
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                SECOPLA
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText onClick={(data) => { console.log('Hola Mundo') }}>LEVANTAMIENTOS</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    /**
     * 
     * 
     * 
     */
    const movpag = () => {
        props.history.push('/UserCreate');
    }
    const moveMenu = () => {
        props.history.push('/Menu');
    }
    const mvgridlev = () => {
        props.history.push('/GridLevantamiento');
    }
    const movedicservicio = () => {
        props.history.push('/dicservicio');
    }
    const mvAprobaciones = () => {
        props.history.push('/Aprobaciones');
    }

    const cerrarSesion = () => {
        cookies.remove('id', { path: '/' });
        cookies.remove('name', { path: '/' });
        cookies.remove('lastname', { path: '/' });
        cookies.remove('direccion', { path: '/' });
        cookies.remove('region', { path: '/' });
        cookies.remove('zona', { path: '/' });
        cookies.remove('username', { path: '/' });
        cookies.remove('password', { path: '/' });
        props.history.push('./');
    }

    useEffect(() => {
        if (!cookies.get('id')) {
            props.history.push('./');
        }
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar sx={{ background: "#F1F6F9" }} >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <CardMedia onClick={()=> moveMenu()} sx={{width:'150px'}}
                        component="img"
                        src={logosecopla}
                        alt="alt_text"
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                    >
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Button variant="text" startIcon={<AddIcCallIcon />} onClick={() => mvgridlev()} sx={{margin:'5px', color: "#394867",  marginRigth: '10px', borderColor: '#fff' }}>
                            LEVANTAMIENTOS
                        </Button>
                        <Button variant="text" startIcon={<AssignmentIndIcon />} onClick={() => mvAprobaciones()} sx={{ margin:'5px',color: "#394867", borderColor: '#fff' }}>
                            APROBACIONES
                        </Button>
                        <Button variant="text" startIcon={<AdsClickIcon />} sx={{ margin:'5px',color: "#394867",marginRigth: '10px', borderColor: '#fff' }}>
                            DISEÑO
                        </Button>
                        
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>

            </Box>
        </Box>

    );
}

Menu.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};

export default Menu;