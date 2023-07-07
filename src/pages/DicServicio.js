import React, { useRef, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import '../css/DicServicio.css';
import logosecopla from '../images/logosecopla.png'
import axios from 'axios';
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
import { CardMedia } from "@mui/material";
import LineAxisIcon from '@mui/icons-material/LineAxis';
import { styled } from '@mui/material/styles';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BackupTableIcon from '@mui/icons-material/BackupTable';

function DicServicio(props) {
    const [data, setData] = useState([]);

    const PeticionGetAll = () => {
        const baseUrlG = "http://192.168.1.47:5000/api/kds_propuestaeconomica";

        const getgridlev = axios.get(baseUrlG)

        axios.all([getgridlev]).then(
            axios.spread((...allData) => {
                const datagridlev = allData[0].data
                setData(datagridlev)
                

            })
        )
    }


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

    const moveMenu = () => {
        props.history.push('/Menu');
    }
    const mvDicSer =()=>{
        props.history.push('/dicservicio');
    }
    const mvGridLev = () => {
        props.history.push('/GridLevantamiento');
    }
    const mvAprobaciones = () => {
        props.history.push('/Aprobaciones');
    }

    const mvformdicserv = (planta) => {
        props.history.push('/FormDicServ/' + planta);
    }

    useEffect(() => {
        PeticionGetAll();
        if (!cookies.get('id')) {
            props.history.push('./');
        }
    }, []);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.info.dark,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <>
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

                        <CardMedia onClick={() => moveMenu()} sx={{ width: '150px' }}
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
                            <Button variant="text" onClick={() => mvGridLev()} startIcon={<AddIcCallIcon />} sx={{ margin: '5px', color: "#394867", marginRigth: '10px', borderColor: '#fff' }}>
                                LEVANTAMIENTOS
                            </Button>
                            <Button variant="text" onClick={() => mvAprobaciones()} startIcon={<AssignmentIndIcon />} sx={{ margin: '5px', color: "#394867", borderColor: '#fff' }}>
                                APROBACIONES
                            </Button>
                            <Button variant="text" onClick={() => mvDicSer()} startIcon={<AdsClickIcon />} sx={{ margin: '5px', color: "#394867", marginRigth: '10px', borderColor: '#fff' }}>
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
                <Box component="main" sx={{ p: 3, width: '100%', marginTop: '50px' }}>
                    <TableContainer component={Paper} sx={{ width: '100%' }}>
                        <Table sx={{ minWidth: 200 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Folio</StyledTableCell>
                                    <StyledTableCell align="center">Nombre</StyledTableCell>
                                    <StyledTableCell align="center">Asesor</StyledTableCell>
                                    <StyledTableCell align="center">Estatus</StyledTableCell>
                                    <StyledTableCell align="center">Fecha Diseño</StyledTableCell>
                                    <StyledTableCell align="center">Diseño</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((proeco) => (
                                    <StyledTableRow key={proeco.planta}>
                                        <StyledTableCell component="th" scope="row">
                                            {proeco.planta}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{proeco.proeco_nombre}</StyledTableCell>
                                        <StyledTableCell align="center">{proeco.proeco_asesor}</StyledTableCell>
                                        <StyledTableCell align="center">{proeco.proeco_estatus || "Abierto"}</StyledTableCell>
                                        <StyledTableCell align="center">{proeco.proeco_fecha || "Pendiente"}</StyledTableCell>
                                        <StyledTableCell align="center">

                                            <Button
                                                variant="outlined"
                                                color="success"
                                                endIcon={<BackupTableIcon />}
                                                onClick={() => mvformdicserv(proeco.planta)}
                                            ></Button>
                                        </StyledTableCell>
                                        
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>


    );
}
DicServicio.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};
export default DicServicio;