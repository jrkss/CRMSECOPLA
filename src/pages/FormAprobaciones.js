import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import layout from '../images/LayoutExample.jpg'
import Cookies from 'universal-cookie';
import logosecopla from '../images/logosecopla.png'
import axios, { Axios } from 'axios';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Card, responsiveFontSizes } from "@mui/material";
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import '../css/FormAprobaciones.css';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Formik } from "formik";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function FormAprobaciones(props) {
    const { match } = props;
    const [data, setData] = useState([]);

    const MySwal = withReactContent(Swal);
    const [dataProEco, setDataProEco] = useState([]);
    const [datas, setDatas] = useState([]);

    const cookies = new Cookies();

    const PeticionGetAll = () => {

        const baseUrlProEco = 'http://192.168.1.47:5000/api/kds_propuestaeconomica';

        const getProEco = axios.get(baseUrlProEco)

        axios.all([getProEco]).then(
            axios.spread((...allData) => {
                const dataproeco = allData[0].data
                setDataProEco(dataproeco)
            })
        )
    }
    const baseUrlG = `http://192.168.1.47:5000/api/kds_aprobaciones/${match.params.partida}`;

    const getApiDataFormLev = async () => {
        const response = await fetch(baseUrlG).then(response => {
            return response.json()
        })
            .then(res => {
                setData(res);
                console.log(res.planta)

                const basformlev = `http://192.168.1.47:5000/api/formlevantamiento/${res.planta}`;

                const response = fetch(basformlev).then(response => {
                    return response.json()
                })
                    .then(res => {
                        setDatas(res);
                    })

                // update the state

            })
        // update the state


    };




    useEffect(() => {
        PeticionGetAll();
        getApiDataFormLev();
        if (!cookies.get('id')) {
            props.history.push('./');
        }
    }, []);

    const Grid = styled(MuiGrid)(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& [role="separator"]': {
            margin: theme.spacing(0, 2),
        },
    }));
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
    const [aprobacion, setAprobacion] = React.useState('');

    const handleChange = (event) => {
        setAprobacion(event.target.value);

    };

    const mvgridapro = () => {
        props.history.push('/Aprobaciones');
    }
    /**
     * Modal
     * 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
     * 
     * Modal
     */
    return (
        <>
            <Formik
                initialValues={
                    {
                        partida: 0,
                        c2: '',
                    }
                }
                onSubmit={(valores) => {

                    var today = new Date();
                    var day = today.getDate();
                    var month = today.getMonth() + 1;
                    var year = today.getFullYear();

                    const urlAprobaciones = `http://192.168.1.47:5000/api/kds_aprobaciones/${data.partida}`
                    const urlProEco = 'http://192.168.1.47:5000/api/kds_propuestaeconomica';
                    var fechahoy = (`${year}-${month}-${day}`);
                    const dataApro = {
                        partida: data.partida,
                        planta: data.planta,
                        id_prospecto: datas.id_prospecto,
                        apro_nombre: data.apro_nombre,
                        apro_asesor: data.apro_asesor,
                        apro_fecha: fechahoy,
                        apro_precio: valores.apro_precio,
                        apro_comentarios: valores.apro_comentarios,
                        apro_estatus: valores.apro_estatus
                    }
                    const dataproecoi = {
                        planta: data.planta,
                        id_prospecto: datas.id_prospecto,
                        proeco_nombre: data.apro_nombre,
                        proeco_asesor: data.apro_asesor,
                        proeco_estatus: 'Abierto'
                    }
                    if (valores.apro_estatus === 'Aprobado') {
                        console.log("Hola Mundo")
                        /*const insertaApro = axios.put(urlAprobaciones, dataApro).then(res => {
                            console.log(res.status);
                            MySwal.fire({
                                icon: 'success',
                                title: '¡Registros Enviados de manera correcta!',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        })*/
                        var datos = data.planta
                        var index = dataProEco.findIndex(item => item.planta === datos);
                        console.log(index)
                        if (index === -1) {
                            console.log("index of")
                            /* const insercionapro = axios.post(urlProEco, dataproecoi).then(res => {
                                 console.log(res.status + "Data")
                             });*/
                        } else {
                            console.log("Si hay datos")
                            /*var validate = dataProEco[index].planta
                            console.log(validate)*/
                        }
                        //mvgridapro();
                    } else {
                        /* const insertaApro = axios.put(urlAprobaciones, dataApro).then(res => {
                             console.log(res.status);
                         })
                         mvgridapro();*/
                    }
                    /*
                    
                   */
                }}
            >
                {({ handleChange, values, handleSubmit, handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                        <Card sx={{ width: '100%', position: 'relative', height: 'auto', marginTop: '20px', borderColor: 'black' }}>

                            <TextField sx={{ position: 'absolute', width: '300px', margin: '30px', marginLeft: '200px' }}
                                label="Monto"
                                id="input-with-icon-textfield"
                                name="apro_precio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.apro_precio}
                                InputProps={
                                    {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        ),
                                    }
                                }

                                variant="outlined" />
                            <InputLabel sx={{ position: 'absolute', width: '300px', marginTop: '10px', marginLeft: '550px' }}>Aprobacion</InputLabel>
                            <Select sx={{ position: 'absolute', width: '300px', margin: '30px', marginLeft: '550px' }}
                                value={values.aprobacion}
                                name="apro_estatus"
                                onChange={handleChange}
                                onBlur={handleBlur}

                            >
                                <MenuItem value={"Aprobado"}>Aprobado</MenuItem>
                                <MenuItem value={"Rechazado"}>Rechazado</MenuItem>
                            </Select>
                            <TextField sx={{ position: 'absolute', width: '300px', margin: '30px', marginLeft: '900px' }}
                                type="text"
                                name="apro_comentarios"
                                label="Comentarios"
                                value={values.apro_comentarios}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                            <Button endIcon={<SendIcon />} type='submit' sx={{ position: 'absolute', width: '150px', margin: '10px', marginLeft: '1300px' }} variant="contained" color="success">Guardar</Button>
                            <Button endIcon={<MeetingRoomIcon />} onClick={() => mvgridapro()} sx={{ position: 'absolute', width: '150px', margin: '10px', marginLeft: '1300px', marginTop: '55px' }} variant="contained" color="error">Cerrar</Button>
                            <br />
                            <Divider sx={{ position: 'relative', marginTop: '95px' }} />

                        </Card>
                    </form>

                )}

            </Formik>
            <Card sx={{ width: '100%', height: 'auto', marginTop: '50px', background: 'white', borderColor: 'black' }}>
                <Link sx={{ position: 'absolute', fontSize: '30px', marginLeft: '45%' }}
                    component="button"
                    variant="body2"

                    onClick={() => window.open(datas.urlimagen, "_blank")}
                >
                    Lay Out
                </Link>

            </Card>

            <Card sx={{ width: '80%', height: 'auto', marginLeft: '10%', marginTop: '40px', borderColor: 'black' }}>

                <img style={{ position: 'relative', width: '300px', padding: "20px" }} src={logosecopla}></img>
                <label style={{ position: 'absolute', marginLeft: '5%', paddingTop: '40px', fontSize: '30px' }}>Levantamiento de Servicios</label>
                <label style={{ position: 'absolute', marginLeft: '40%', paddingTop: '20px', fontSize: '18px' }}>Código: ISO-CO-001</label>
                <label style={{ position: 'absolute', marginLeft: '40%', paddingTop: '40px', fontSize: '18px' }}>Número de versión: 9 </label>
                <label style={{ position: 'absolute', marginLeft: '40%', paddingTop: '60px', fontSize: '18px' }}>Fecha de creación: 01/08/2020 </label>
                <label style={{ position: 'absolute', marginLeft: '40%', paddingTop: '80px', fontSize: '18px' }}>Fecha de revisión:22/02/2023</label>
                <Divider />


            </Card>
            <Grid container sx={{ width: '80%', height: 'auto', marginLeft: '10%', borderColor: 'black' }}>
                <Grid item xs sx={{ background: 'white', width: '50%', borderColor: 'black' }}>
                    <label style={{ position: 'relative', paddingLeft: '17px', fontSize: '20px' }}>Datos Generales</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Fecha del Levantamiento:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Nombre del Contacto:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Nombre de la Empresa:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Dirección de la Empresa:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Ubicación:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Contacto Comercial:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Mail Comercial:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Teléfono Comercial:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Contacto Calida:.</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Mail Calida:.</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Teléfono Calidad:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Giro de la Empresa:</label>
                    <br /><Divider variant="inset" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '70px', fontSize: '20px' }}>Actividad de la empresa:</label>
                    <br /><Divider variant="inset" />
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ background: 'white' }}>

                </Divider>
                <Grid item xs sx={{ background: 'white', width: '50%', borderColor: 'gray', borderRadius: '5px', border: '2px' }}>
                    <label style={{ position: 'relative', paddingLeft: '17px', fontSize: '20px' }}></label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }} >{datas.fecha_levantamiento || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.nombre_contacto || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.nombre_empresa || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.direccion_empresa || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.ubicacion || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.contacto_comercial || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.mail_comercial || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.telefono_comercial || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.contacto_calidad || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.mail_calidad || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.telefono_calidad || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.giro_empresa || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                    <label style={{ position: 'relative', padding: '17px', paddingLeft: '40%', fontSize: '20px' }}>{datas.actividad_empresa || 'No se ingresadon datos'}</label>
                    <br /><Divider variant="middle" />
                </Grid>
            </Grid>
            <Card sx={{ width: '80%', height: 'auto', marginLeft: '10%', marginTop: '10px', background: 'GRAY', color: 'white', borderColor: 'black' }}>
                <label style={{ position: 'relative', marginLeft: '41%', paddingTop: '40px', fontSize: '20px' }}>REQUERIMIENTOS GENERALES</label>
            </Card>
            <Card container sx={{ width: '80%', height: 'auto', marginLeft: '10%', marginTop: '10px', background: 'white', borderColor: 'black' }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">CONCEPTO</StyledTableCell>
                                <StyledTableCell align="center">COMENTARIOS</StyledTableCell>
                                <StyledTableCell align="center">VERIFICACION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">
                                    ¿Existen requerimientos en su programa de seguridad e higiene que deberíamos observar?
                                </StyledTableCell>
                                <StyledTableCell align="center">{datas.comentario_programa || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.programa_seguridad || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">
                                    ¿Existe algún requerimiento de la secretaría de salubridad de la localidad que deberíamos observar?
                                </StyledTableCell>
                                <StyledTableCell align="center">{datas.comentario_salubridad || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.requerimiento_salubridad || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >NORMAS SANITARIAS APLICABLES A LA EMPRESA</StyledTableCell>
                                <StyledTableCell align="center">COMENTARIOS</StyledTableCell>
                                <StyledTableCell align="center">VERIFICACION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">
                                    ¿Qué Normas sanitarias tienen que cumplir?
                                </StyledTableCell>
                                <StyledTableCell align="center">{datas.comentario_nsanitarias || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.normas_sanitarias || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Card sx={{ width: '80%', height: 'auto', marginLeft: '10%', marginTop: '10px', background: 'gray', color: 'white', borderColor: 'black', position: 'absolute' }}>
                <label style={{ position: 'relative', marginLeft: '37%', paddingTop: '40px', fontSize: '20px' }}>REQUERIMIENTOS ESPECIFICOS DEL CLIENTE</label>
                <Card sx={{ width: '100%', height: 'auto', marginTop: '10px', background: 'white', color: 'black', borderColor: 'black' }}>
                    <label style={{ position: 'relative', paddingTop: '40px', fontSize: '17px' }}>¿Tiene identificadas las áreas conflictivas de la empresa en relación al control de plagas?</label>
                    <label style={{ position: 'relative', marginLeft: '41%', paddingTop: '40px', fontSize: '17px' }}>{datas.identifica_plaga}</label>
                </Card>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Especificar el tipo de Plaga</StyledTableCell>
                                <StyledTableCell align="center">TIPO</StyledTableCell>
                                <StyledTableCell align="center">VERIFICACION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Fauna Doméstica</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_domestica || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.fauna_domestica || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Fauna Silvestre</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_silvestre || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.fauna_silvestre || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Insectos Voladores</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_voladores || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.insectos_voladores || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Insectos Rastreros</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_rastreros || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.insectos_rastreros || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Fauna Aviar</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_aviar || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.fauna_aviar || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿El problema de aves lo soucionamos con la desornitación o se requiere un plan especifico?.</StyledTableCell>
                                <StyledTableCell align="center">{datas.comentario_desornitacion || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.desornitacion || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Gorgojo</StyledTableCell>
                                <StyledTableCell align="center">{datas.comentario_gorgojo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.gorgojo || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Roedores / Rata</StyledTableCell>
                                <StyledTableCell align="center">{datas.comentario_roedor || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.roedores || "No se registro"}</StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <label style={{ position: 'relative', paddingTop: '40px', fontSize: '17px' }}>¿Tiene identificadas las áreas conflictivas de la empresa en relación al control de plagas?</label>
                <label style={{ position: 'absolute', marginLeft: '30%', fontSize: '17px' }}>{datas.areas_conflictivas || "Sin registros"}</label>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >¿Alguna de las siguientes zonas, tiene conflicto de Plaga?</StyledTableCell>
                                <StyledTableCell align="center">COMENTARIOS</StyledTableCell>
                                <StyledTableCell align="center">VERIFICACION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Escaleras</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_escalera || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.escaleras || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Azoteas</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_azoteas || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.azoteas || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Techos / Estructuras</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Pasillos / Recepcion</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Baños / Vestidores</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_banio || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.banios || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Lockers</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_locker || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.lockers || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Andenes</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_anden || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.andenes || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Rampas</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_rampa || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.rampas || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Areas de Produccion</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_produccion || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.areas_produccion || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Áreas Verdes / Estacionamiento / Vigilancia</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_verdes || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.areas_verdes || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Comedores / Cocina</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_comedores || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.comedores || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Oficinas / Salas de Juntas</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_oficina || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.oficinas || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Almácen, Materías primas</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_almacenmp || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.almacen_mp || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Almácen, Producto Terminado</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_almacenpt || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.almacen_pt || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Almácen, Material de Empaque</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_empaque || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.almacen_empaque || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Planta Tratadora de Agua</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_tratadora || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratadora_agua || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Contenedores de Basura</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_contenedor || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.contenedor_basura || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Silos</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_silos || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.silos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Túneles Transportadores</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_tuneles || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tuneles || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Bandas Transportadoras</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_trasportadora || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.bandas_transportadora || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Unidades de Reparto</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_unidades || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.unidades_reparto || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Tarimas</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_tarimas || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tarimas || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Talleres</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_talleres || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.talleres || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Camáras de Refrigeración</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_camaras || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.camaras_refrigeracion || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Producto no Conforme / Devoluciones</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_noconforme || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.producto_noconforme || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Otros, Especificar…</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_otros || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.otros_especificar || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Bajo qué lineamientos son auditados?</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_auditados || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.lineamientos_auditados || "No se registro"}</StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

                <label style={{ position: 'relative', paddingTop: '40px', marginLeft: '30%', fontSize: '17px' }}>RIESGOS Y PELIGROS EN PLANTA</label>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >CONCEPTO</StyledTableCell>
                                <StyledTableCell align="center">COMENTARIOS</StyledTableCell>
                                <StyledTableCell align="center">VERIFICACION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿El Personal  que labora en Planta cuenta con programas de formación y desarrollo para el Manejo Integrado de Plagas?.</StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_comentario || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_formacion || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Se cuenta con programas de Mantenimiento o Limpieza? (PLAN MAESTRO)</StyledTableCell>
                                <StyledTableCell align="center">{datas.area_oportunidad || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_mantto || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Se cuenta con programas de pre-requisitos de almacenamiento de producto?</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Las condiciones de INFRAESTRUCTURA, están diseñadas para el buen Manejo Integrado de Plagas?</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <label style={{ position: 'relative', paddingTop: '40px', marginLeft: '30%', fontSize: '17px' }}>TECNICOS/INSTALADORES</label>

                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >¿Los técnicos / instaladores deben de cumplir con requisitos específicos para su ingreso? Como los siguientes:</StyledTableCell>
                                <StyledTableCell align="center">COMENTARIOS</StyledTableCell>
                                <StyledTableCell align="center">VERIFICACION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Equipo de comunicación específico</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_equipo || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_comunicacion || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Equipo de protección personal</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_epp || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_epp || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Procedimiento de acceso interno</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Horarios específicos</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Exámenes médicos (¿Cuáles?)</StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_comentario || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_formacion || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Frecuencia de exámenes</StyledTableCell>
                                <StyledTableCell align="center">{datas.area_oportunidad || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_mantto || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Carta de antecedentes no penales</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Afiliación al IMSS</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Credenciales de identificación</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Existen días especificos para capacitación?</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Capacitación por parte de la empresa</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Planeación de visitas (días específicos)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">DC-3 (Cuál)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Hay alguna zona asignada a plagas para el resguardo de equipos?</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <label style={{ position: 'relative', paddingTop: '40px', marginLeft: '30%', fontSize: '17px' }}>REQUERIMIENTOS COMERCIALES Y LEGALES</label>

                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >CONCEPTO</StyledTableCell>
                                <StyledTableCell align="center">COMENTARIOS</StyledTableCell>
                                <StyledTableCell align="center">VERIFICACION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Orden de compra</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_equipo || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_comunicacion || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Contrato / Propuesta Firmada</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_epp || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_epp || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Periodo del Servicio contratado(Indicar la cantidad de meses del contrato)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Entrega de Carpeta física</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Entrega de carpeta digital</StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_comentario || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_formacion || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Se requiere el pago por uso de portal para factura?</StyledTableCell>
                                <StyledTableCell align="center">{datas.area_oportunidad || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.programas_mantto || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Se requiere alguna fianza?</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_techo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.techos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Se requiere pago Sindical? Indicar monto y frecuencia de pago</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_pasillo || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.pasillos || "No se registro"}</StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

                <label style={{ position: 'relative', paddingTop: '40px', marginLeft: '30%', fontSize: '17px' }}>MEDIO AMBIENTE</label>

                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >CONCEPTO</StyledTableCell>
                                <StyledTableCell align="center">COMENTARIOS</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Cuál es la estacionalidad de plagas de la región?</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_equipo || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Colindancia (Frente, Posterior, Izquierda, Derecha, Arriba de, Debajo de)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_epp || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <label style={{ position: 'relative', paddingTop: '40px', marginLeft: '30%', fontSize: '17px' }}>LAY OUT / MEDIDAS</label>

                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >CONCEPTO</StyledTableCell>
                                <StyledTableCell align="center">VERIFICACION/COMENTARIOS</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Lay Out proporcionado por el cliente?</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_equipo || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Indicar m2 del terreno</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_epp || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Indicar m2 de la construcción</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_equipo || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Indicar m3</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_epp || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <label style={{ position: 'relative', paddingTop: '40px', marginLeft: '30%', fontSize: '17px' }}>INFORMACIÓN PARA ELABORAR PROPUESTA</label>

                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >CONCEPTO</StyledTableCell>
                                <StyledTableCell align="center">ACTUAL</StyledTableCell>
                                <StyledTableCell align="center">REQUERIDO</StyledTableCell>
                                <StyledTableCell align="center">COMENTARIOS</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Cebaderos A</StyledTableCell>
                                <StyledTableCell align="center">{datas.cebadero_a_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.cebadero_a_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.cebadero_a_comentarios || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Cebaderos B</StyledTableCell>
                                <StyledTableCell align="center">{datas.cebadero_b_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.cebadero_b_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.cebadero_b_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Mecánicas C</StyledTableCell>
                                <StyledTableCell align="center">{datas.mecainicas_c_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.mecacinas_c_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">Trapper {datas.trapper || "No Aplica"}: Metalicas {datas.trapper || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">T-REX</StyledTableCell>
                                <StyledTableCell align="center">{datas.trex_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.trex_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.trex_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Gomas para roedor</StyledTableCell>
                                <StyledTableCell align="center">{datas.gomasroedor_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.gomasroedor_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.gomasroedor_comentarios || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Gomas para insecto rastrero</StyledTableCell>
                                <StyledTableCell align="center">{datas.gomasinsecto_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.gomasinsecto_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.gomasinsecto_requerido || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">LLN</StyledTableCell>
                                <StyledTableCell align="center">{datas.lln_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.lln_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.lln_comentarios || "No Aplica"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Electrocutadores</StyledTableCell>
                                <StyledTableCell align="center">{datas.electrocutadores_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.electrocutadores_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.electrocutadores_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Dispensadores</StyledTableCell>
                                <StyledTableCell align="center">{datas.dispensadores_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.dispensadores_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.dispensadores_comentarios || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Jaulas (indicar especie)</StyledTableCell>
                                <StyledTableCell align="center">{datas.jaulas_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.jaulas_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.jaulas_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Bebederos (indicar especie)</StyledTableCell>
                                <StyledTableCell align="center">{datas.bebederos_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.bebederos_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.bebederos_comentarios || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Feromonas (Indicar tipo y si incluye Domo)</StyledTableCell>
                                <StyledTableCell align="center">{datas.feromonas_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.feromonas_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.feromonas_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Tratamiento para Mosca.(Cubeta / Bolsa)(indicar periodo de cambio de atrayente)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_mosca_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_mosca_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_mosca_comentarios || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Otros. (indicar producto)</StyledTableCell>
                                <StyledTableCell align="center">{datas.otros_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.otros_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.otros_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">¿Se requiere técnico Fijo? (Indicar horario y jornada)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_fijo_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_fijo_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_fijo_comentarios || "No Aplica"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Salario del técnico de zona. (Revisar con RH)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_zona_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_zona_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_zona_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Frecuencia de visita Técnico de Ruta.</StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_ruta_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_ruta_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tecnico_ruta_comentariosx || "No Aplica"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Distancia (en km) entre el técnico más cercano y las instalaciones del cliente (Revisar con Operaciones)</StyledTableCell>
                                <StyledTableCell align="center">{datas.distancia_tecnico_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.distancia_tecnico_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.distancia_tecnico_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Frecuencia de Aspersiones. (Indicar m2 de las zonas a aplicar)</StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_aspercion_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_aspercion_requerida || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_aspercion_comentarios || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Frecuencia de Nebulizaciones. (Indicar m3 de las zonas a aplicar)</StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_nebulizacion_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_nebulizacion_requerida || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_nebulizacion_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Frecuencia de Termonebulizaciones. (Indicar m3 de las zonas a aplicar)</StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_termo_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_termo_requerida || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.frecuencia_termo_comentarios || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Tratamiento a Unidades. (Especificar total, tipo de Unidades, frecuencia y tipo aplicación a realizar).</StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_unidades_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_unidades_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_unidades_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Tratamiento a Tarimas. (Especificar total de tarimas, frecuencia y tipo aplicación)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_tarimas_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_tarimas_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_tarimas_comentarios || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Equipos a comodato.</StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_comodato_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_comodato_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_comodato_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Equipos propiedad del cliente. </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_propio_actual || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_propio_requerido || "No Aplica"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.equipo_propio_comentarios || "No Aplica"}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Tratamiento a drenajes. (indicar frecuencia)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_drenaje_actual || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_drenaje_requerido || "No se registraron comentarios"} </StyledTableCell>
                                <StyledTableCell align="center">{datas.tratamiento_drenaje_comentarios || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>

                        </TableBody>

                    </Table>
                </TableContainer>

                <label style={{ position: 'relative', paddingTop: '40px', marginLeft: '30%', fontSize: '17px' }}>REQUERIMIENTOS PARA INSTALACIONES</label><br />

                <TableContainer component={Paper} sx={{ width: '33.33%', position: 'absolute', display: 'flex' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Datos Proveedor Actual</StyledTableCell>
                                <StyledTableCell align="center">Datos</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Proveedor Actual</StyledTableCell>
                                <StyledTableCell align="center">{datas.proveedor_actual || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ marginLeft: '33.33%', width: '33.33%', position: 'absolute', display: 'flex' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Especificaciones para Instalar.</StyledTableCell>
                                <StyledTableCell align="center">Datos</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Tipo de Superficie.(Indicar si es, tierra, concreto, etc)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_superficie || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Tipo de Instalación.(Indicar la forma de ancar los equipos)</StyledTableCell>
                                <StyledTableCell align="center">{datas.tipo_instalacion || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ marginLeft: '66.66%', width: '33.33%', position: 'relative', display: 'flex' }}>

                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Cantidad de Localizadores</StyledTableCell>
                                <StyledTableCell align="center">Datos</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">En malla</StyledTableCell>
                                <StyledTableCell align="center">{datas.malla || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">En pared </StyledTableCell>
                                <StyledTableCell align="center">{datas.pared || "No se registraron comentarios"} </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">Varillas para anclar.</StyledTableCell>
                                <StyledTableCell align="center">{datas.varillas_anclar || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <label style={{ position: 'relative', paddingTop: '40px', marginLeft: '30%', fontSize: '17px' }}>COMENTARIOS</label><br />
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Indicar información de reelevancia a considerar para complementar el levantamiento (pertenece a un grupo, tiene plantas o unidades de servicio adicionales, es un cliente al que ya le damos servicio, es recomendación de un cliente actual, etc)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell align="center">{datas.comentarios_generales || "No Aplica"} </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>

                    </Table>
                </TableContainer>

            </Card>

        </>
    )
}

export default FormAprobaciones;