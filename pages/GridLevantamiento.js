import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import '../css/GridLevantamiento.css';
import moment from 'moment';
import logosecopla from '../images/logosecopla.png'
import { Button } from "@mui/material";
import LineAxisIcon from '@mui/icons-material/LineAxis';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
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
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { CardMedia } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function GridLevantamiento(props, { gridLevantamiento }) {


    //"https://localhost:7239/api/gridlevantamiento";
    //

    const drawerWidth = 240;
    const [data, setData] = useState([]);
    const [datafl, setDatafl] = useState([]);

    const PeticionGetAll = () => {
        const baseUrlG = "http://192.168.1.47:5000/api/formlevantamiento";
        const baseUrlGfl = "http://192.168.1.47:5000/api/formlevantamiento";

        const getgridlev = axios.get(baseUrlG)
        const getformlev = axios.get(baseUrlGfl)

        axios.all([getgridlev, getformlev]).then(
            axios.spread((...allData) => {
                const datagridlev = allData[0].data
                const dataformlev = allData[1].data
                setData(datagridlev)
                setDatafl(dataformlev)

            })
        )
    }

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
    /*p
    
    
    as
    */
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



    /*const peticionGet = async () => {
        await axios.all([
            axios.get(`${baseUrlG}gridlevantamiento`),
            axios.get(`${baseUrlG}formlevantamiento`)
        ]).then(axios.spread((firstResponse, secondResponse) => {
            console.log(firstResponse.data, secondResponse.data)
        }))
            .catch(error => {
                console.log(error);
            })
    }*/

    const cookies = new Cookies();

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

    const mvformlv = (planta) => {
        props.history.push('/FormLevantamiento/' + planta);
    }
    const mvgridlev = () => {
        props.history.push('/GridLevantamiento');
    }
    const moveMenu = () => {
        props.history.push('/Menu');
    }

    const mvAprobaciones = () => {
        props.history.push('/Aprobaciones');
    }
    const mvDicServ = () => {
        props.history.push('/DicServicio');
    }
    const mvDescargas = () => {
        props.history.push('/ExampleDoc');
    }
    useEffect(() => {
        /*peticionGet();
        peticionGetFl();*/
        PeticionGetAll();
        if (!cookies.get('id')) {
            props.history.push('./');
        }
    }, []);

    const columns = [
        {
            field: 'planta',
            maxWidth: 90,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerName: 'Planta',
        },
        {
            field: 'id_prospecto',
            flex: 1,
            maxWidth: 150,
            headerName: 'Folio Prospecto',
            headerClassName: 'super-app-theme--header',
            editable: false,
        },
        {
            field: 'nombre_empresa',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerName: 'Nombre',
            editable: false,
        },{
            field: 'asesor_asignado',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerName: 'Asesor',
            editable: false,
        },
        {
            field: 'estatus',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerName: 'Estatus',
            editable: false,
        },
        {
            field: 'fecha_levantamiento',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerName: 'Fecha Levantamiento',
            valueFormatter: params =>
                moment(params?.value).format("DD/MM/YYYY"),
        },
        {
            marginLeft: '5%',
            marginRight: 'auto',
            field: 'Levantamiento',
            maxWidth: 130,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerName: 'Levantamiento',
            renderCell: (params) => {
                return <Button
                    variant="outlined"
                    color="success"
                    endIcon={<LineAxisIcon />}
                    onClick={(data) => mvformlv(params.id)}></Button>;
            }
        }
    ];
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar component="nav">
                    <Toolbar sx={{ background: "white" }} >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <CardMedia sx={{ width: '150px' }}
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
                            <Button variant="text" startIcon={<AddIcCallIcon />} onClick={() => mvgridlev()} sx={{ margin: '5px', color: "gray", marginRigth: '10px', borderColor: 'black' }}>
                                LEVANTAMIENTOS
                            </Button>
                            <Button variant="text" startIcon={<AssignmentIndIcon />} onClick={() => mvAprobaciones()} sx={{ margin: '5px', color: "gray", borderColor: 'black' }}>
                                APROBACIONES
                            </Button>
                            <Button variant="text" startIcon={<AdsClickIcon />} onClick={() => mvDicServ()} sx={{ margin: '5px', color: "gray", borderColor: 'black' }}>
                                DISEÑO
                            </Button>
                            <Button variant="text" startIcon={<AdsClickIcon />} onClick={() => mvDescargas()} sx={{ margin: '5px', color: "gray", borderColor: 'black' }}>
                                DESCARGAS
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
                <Box sx={{
                    marginLeft: '5%',
                    marginRight: 'auto',
                    marginTop: '70px',
                    background: 'white',
                    height: 600,
                    width: '90%',
                    '& .super-app-theme--header': {
                        backgroundColor: 'rgba(0, 86, 140)',
                        color: "common.white"
                    },
                }}>
                    <DataGrid
                        slots={{ toolbar: GridToolbar }}
                        getRowId={(data) => data.planta}
                        rows={data}
                        columns={columns}
                        //onRowClick={(data) => mvformlv(data.row.c2)}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 8,
                                },
                            },
                        }}
                        disableRowSelectionOnClick
                        pageSizeOptions={[8]}
                    />
                </Box>

            </Box>
        </div>
    );
}
GridLevantamiento.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};

export default GridLevantamiento;