import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import '../css/FormDicServ.css';
import { Formik } from 'formik';
import { Tabs, Tab, AppBar, Container, TextField } from '@material-ui/core';
import axios, { Axios } from 'axios';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import svg from '../images/deletesvg.svg'
import ConstructionIcon from '@mui/icons-material/Construction';
import CallSplitIcon from '@mui/icons-material/CallSplit';


function FormDicServ(props) {


    const { match } = props;
    const [open, setOpen] = React.useState(false);
    const [opena, setOpena] = React.useState(false);
    const [openb, setOpenb] = React.useState(false);
    const [data, setData] = useState([]);
    const [areasprospecto, setAreasProspecto] = useState([]);
    const [cinturon, setCinturon] = useState([]);
    const [servicio, setServicio] = useState([]);
    const [productrnp, setProductRNP] = useState([]);
    const [servtrampdisp, setServTrampDisp] = useState([]);
    const [frecuencia, setFrecuencia] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    
const handleApliacionesChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;

    setSelectedOptions(list);
}


    const ApiGetData = () => {

        const baseUrlG = `http://192.168.1.47:5000/api/formlevantamiento/${match.params.planta}`;


        const response = fetch(baseUrlG).then(response => {
            console.log(response)
            return response.json()
        })
            .then(data => {
                setData(data);
                console.log(data)
            })
    }
    const ApiGetAreasProspectos = () => {
        const baseAreasPG = 'https://localhost:7239/api/areasprospecto';

        const areasResponse = fetch(baseAreasPG).then(areasResponse => {

            return areasResponse.json()
        })
            .then(res => {
                setAreasProspecto(res);
                console.log(res)
            })
    }
    const ApiGetCinturones = () => {
        const baseCinturonG = 'https://localhost:7239/api/cinturones';

        const cinturonResponse = fetch(baseCinturonG).then(cinturonResponse => {

            return cinturonResponse.json()
        })
            .then(res => {
                setCinturon(res);
                console.log(res)
            })
    }
    const ApiGetServicios = () => {
        const baseServiciosG = 'https://localhost:7239/api/serviciosproductos';

        const serviciosResponse = fetch(baseServiciosG).then(servicioResponse => {

            return servicioResponse.json()
        })
            .then(res => {
                setServicio(res);
                console.log(res)
            })
    }

    const ApiGetProductRNP = () => {
        const baseproductrnpG = 'https://localhost:7239/api/productosrnp';

        const productrnpResponse = fetch(baseproductrnpG).then(productrnpResponse => {

            return productrnpResponse.json()
        })
            .then(res => {
                setProductRNP(res);
                console.log(res)
            })
    }
    const ApiGetServiciosTrampasDispositivos = () => {
        const baseservtramdispG = 'https://localhost:7239/api/serviciostrampasdispositivos';

        const servtramdispResponse = fetch(baseservtramdispG).then(servtramdispResponse => {

            return servtramdispResponse.json()
        })
            .then(res => {
                setServTrampDisp(res);
                console.log(res)
            })
    }

    const ApiGetFrecuencia = () => {
        const basefrecuenciaG = 'https://localhost:7239/api/frecuencias';

        const frecuenciaResponse = fetch(basefrecuenciaG).then(frecuenciaResponse => {

            return frecuenciaResponse.json()
        })
            .then(res => {
                setFrecuencia(res);
                console.log(res)
            })
    }
    const [inputValue, setInputValue] = React.useState('');


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpena = () => setOpena(true);
    const handleClosea = () => setOpena(false);

    const handleOpenb = () => setOpenb(true);
    const handleCloseb = () => setOpenb(false);
    {/**

Inputs Dinamics
 */}
    const [serviceList, setServiceList] = useState([{ service: "" }]);

    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);

    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };


    {/**
Dinamics Inputs
*/}

    {/**

Inputs Dinamics
 */}
    const [equipoList, setEquipoList] = useState([{ equipo: " " }]);

    const handleEquipoChange = (e, indexe) => {
        const { name, value } = e.target;
        const list = [...equipoList];
        list[indexe][name] = value;
        setEquipoList(list);



    };

    const handleEquipoRemove = (indexe) => {
        const list = [...equipoList];
        list.splice(indexe, 1);
        setEquipoList(list);
    };

    const handleEquipoAdd = () => {
        setEquipoList([...equipoList, { equipo: "" }]);
    };
    const mvDicSer = () => {
        props.history.push('/dicservicio');
    }

    {/**
Dinamics Inputs
*/}
    /**
     * Inputs Servicios Adicionales
     */
    const [servadicList, setServAdicList] = useState([{ ServAdic: " " }]);

    const handleServAdicChange = (e, indexa) => {
        const { name, value } = e.target;
        const list = [...servadicList];
        list[indexa][name] = value;
        setServAdicList(list);


    };

    const handleServAdicRemove = (indexa) => {
        const list = [...servadicList];
        list.splice(indexa, 1);
        setServAdicList(list);
    };

    const handleServAdicAdd = () => {
        setServAdicList([...servadicList, { ServAdic: "" }]);
    };

    /**
     * Inputs Servicios Adicionales
     */
    /**
     * Tabla de Areas
     */
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    /**
     * Tbala de Areas
     */


    /**
     * Req Adicionales
     */
    const [reqadicList, setReqAdicList] = useState([{ ReqAdic: " " }]);

    const handleReqAdicChange = (e, indexR) => {
        const { name, value } = e.target;
        const list = [...reqadicList];
        list[indexR][name] = value;
        setReqAdicList(list);



    };

    const handleReqAdicRemove = (indexR) => {
        const list = [...reqadicList];
        list.splice(indexR, 1);
        setReqAdicList(list);
    };

    const handleReqAdicAdd = () => {
        setReqAdicList([...reqadicList, { ReqAdic: "" }]);
    };
    /**
     * Req Adicionales Close
     */

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '85vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
    };
    const moveMenu = () => {
        props.history.push('/Menu');
    }
    const cookies = new Cookies();

    useEffect(() => {
        ApiGetAreasProspectos();
        ApiGetData();
        ApiGetCinturones();
        ApiGetServicios();
        ApiGetProductRNP();
        ApiGetFrecuencia();
        ApiGetServiciosTrampasDispositivos();
        if (!cookies.get('id')) {
            props.history.push('./');
        }
    }, []);
    const [value, setValue] = React.useState(0);
    const handleTabs = (e, val) => {
        console.warn(val)
        setValue(val)
    }
    const areasProspectoArray = (areasprospecto.map((dat) => (dat.c3)));

    const cinturonesArray = (cinturon.map((dat) => (dat.c2)));
    const servicioArray = (servicio.map((dat) => (dat.c2)));
    const productrnpArray = (productrnp.map((dat) => (dat.c2)));
    const frecuenciaArray = (frecuencia.map((dat) => (dat.c2)));
    const servtrampdispArray = (servtrampdisp.map((dat) => (dat.c2)));



    return (
        <div>
            <div>{data.planta}</div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"></link>
            <Formik
                enableReinitialize={true}
                validateOnChange={false}
                initialStatus={true}
                initialValues={
                    {
                        partida: 0,
                        planta: `${data.planta}`,
                        id_prospecto: `${data.id_prospecto}`,
                        pe_ae_acomodato: `${data.equipo_comodato_requerido}`,
                        pe_ae_procliente: `${data.equipo_propio_requerido}`,
                        pe_ec_fisica: `${data.carpeta_fisica}`,
                        pe_ec_digital: `${data.carpeta_digital}`,
                        pe_tec_fulltime: `${data.tecnico_fijo_actual}`,
                        pe_tec_partime: `${data.tecnico_zona_requerido}`,
                        pe_tec_asigruta: `${data.tecnico_ruta_requerido}`,

                        pe_taba_apli: '',
                        pe_taba_prod: '',
                        pe_taba_cant: '',
                        pe_taba_area: '',
                        pe_taba_tipofrec: '',
                        pe_taba_cantfrec: '',
                        pe_taba_comentfrec: '',

                        pe_tabb_equip: '',
                        pe_tabb_cant: '',
                        pe_tabb_dist: '',
                        pe_tabb_prod: '',
                        pe_tabb_rev: ''
                    }
                }
                onSubmit={(valores) => {

                    console.log(serviceList)
                    /*
                                        const urltabone = 'http://192.168.1.47:5000/api/proecotabone';
                                        const urltabtwo = 'http://192.168.1.47:5000/api/proecotabtwo';
                                        const urltabthree = 'http://192.168.1.47:5000/api/proecotabthree';
                                        const baseUrlG = "http://192.168.1.47:5000/api/kds_propuestaeconomica";
                    
                                        var today = new Date();
                                        var day = today.getDate();
                                        var month = today.getMonth() + 1;
                                        var year = today.getFullYear();
                                        var fechahoy = (`${year}-${month}-${day}`);

                    
                                        try {
                    
                                            const datapropuestaeconomica = {
                                                planta: '',
                                                id_prospecto: '',
                                                proeco_nombre: '',
                                                proeco_asesor: '',
                                                proeco_fecha: '',
                                                proeco_estatus: ''
                                            }
                                            const datatabone = {
                    
                                                planta: data.planta,
                                                id_prospecto: data.id_prospecto,
                                                pe_ae_acomodato: valores.pe_ae_acomodato,
                                                pe_ae_procliente: valores.pe_ae_procliente,
                                                pe_ec_fisica: valores.pe_ec_fisica,
                                                pe_ec_digital: valores.pe_ec_digital,
                                                pe_tec_fulltime: valores.pe_tec_fulltime,
                                                pe_tec_partime: valores.pe_tec_partime,
                                                pe_tec_asigruta: valores.pe_tec_asigruta
                                            }
                                            for (let i = 0; i < serviceList.length; i++) {
                                                const datatabtwo = {
                                                    planta: data.planta,
                                                    id_prospecto: data.id_prospecto,
                                                    pe_taba_apli: serviceList[i].pe_taba_apli,
                                                    pe_taba_prod: serviceList[i].pe_taba_prod,
                                                    pe_taba_cant: serviceList[i].pe_taba_cant,
                                                    pe_taba_area: serviceList[i].pe_taba_area,
                                                    pe_taba_tipofrec: serviceList[i].pe_taba_tipofrec,
                                                    pe_taba_cantfrec: serviceList[i].pe_taba_cantfrec,
                                                    pe_taba_comentfrec: serviceList[i].pe_taba_comentfrec
                                                }
                                                if (valores.pe_taba_apli != '' && valores.pe_taba_prod != '' && valores.pe_taba_cant != '') {
                                                    const insertabtwo = axios.post(urltabtwo, datatabtwo).then(res => {
                                                        if (res.status === 200 || res.status === 201) {
                                                            console.log(res)
                    
                                                        } if (res.status === 400) {
                                                            console.log(res.status)
                    
                                                        }
                                                        console.log(res.status)
                                                    });
                                                } else {
                                                    alert('Inserte los campos obligatorios');
                                                }
                    
                    
                                            }
                                            for (let j = 0; j < equipoList.length; j++) {
                                                const datatabthree = {
                                                    planta: data.planta,
                                                    id_prospecto: data.id_prospecto,
                                                    pe_tabb_equip: equipoList[j].pe_tabb_equip,
                                                    pe_tabb_cant: equipoList[j].pe_tabb_cant,
                                                    pe_tabb_prod: equipoList[j].pe_tabb_prod,
                                                    pe_tabb_cinturon: equipoList[j].pe_tabb_cinturon,
                                                    pe_tabb_tipofrec: equipoList[j].pe_tabb_tipofrec,
                                                    pe_tabb_cantfrec: equipoList[j].pe_tabb_cantfrec,
                                                    pe_tabb_comentario: equipoList[j].pe_tabb_comentario
                                                }
                                                if (valores.pe_tabb_equip != '' && valores.pe_tabb_cant != '' && valores.pe_tabb_prod != '') {
                                                    const insertabthree = axios.post(urltabthree, datatabthree).then(res => {
                                                        if (res.status === 200 || res.status === 201) {
                                                            console.log(res)
                    
                                                        } if (res.status === 400) {
                                                            console.log(res.status)
                    
                                                        }
                                                        console.log(res.status)
                                                    });
                                                } else {
                                                    alert('Inserte los campos obligatorios');
                                                }
                                            }
                                            if (valores.pe_ae_acomodato != '' && valores.pe_ae_procliente != '' && valores.pe_ec_fisica != '') {
                                                const insertabone = axios.post(urltabone, datatabone).then(res => {
                                                    if (res.status === 200 || res.status === 201) {
                                                        alert('Registro exitoso')
                    
                                                        mvDicSer();
                    
                                                    } if (res.status === 400) {
                                                        console.log(res.status)
                    
                                                    }
                                                    console.log(res.status)
                                                });
                                            } else {
                                                alert('Inserte los campos obligatorios');
                                            }
                    
                                        } catch (error) {
                                            console.log(error)
                                        }
                    */
                }
                }
            >
                {({ handleChange, values, handleSubmit, handleBlur }) => (
                    <div className="containerflevantamiento">
                        <form className="formulario" onSubmit={handleSubmit}>

                            <Tabs
                                className="TabNav"
                                value={value}
                                onChange={handleTabs}
                            >
                                <Tab className="TabClass" label="Propuesta Economica" style={{ minWidth: "50%", maxWidth: "50%" }} />
                                <Tab className="TabClass" label="Requerimientos Adicionales" style={{ minWidth: "50%", maxWidth: "50%" }} />


                            </Tabs>
                            <TapPanel value={value} index={0}>

                                <Stack sx={{ height: '130px' }}
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={2}
                                >
                                    <Item sx={{ width: '33.33%', height: 'auto', fontSize: '20px', alignItems: "center", paddingTop: '20px' }}>Asignacion de equipos</Item>
                                    <Item sx={{ width: '33.33%', height: 'auto' }}>
                                        <Typography>A comodato:</Typography>
                                        <br />
                                        <Typography>Propiedad del cliente:</Typography></Item>
                                    <Item sx={{ width: '33.33%', height: 'auto' }}> <div>
                                        <TextField sx={{ width: '50%' }}
                                            label="A comodato:"
                                            variant="outlined"
                                            name='pe_ae_acomodato'
                                            id='pe_ae_acomodato'
                                            style={{ marginTop: '6px' }}
                                            value={values.pe_ae_acomodato}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            inputProps={{
                                                style: {
                                                    height: "5px",
                                                },
                                            }} />

                                        <br />
                                        <TextField sx={{ width: '50%' }}
                                            label="Propiedad del cliente"
                                            variant="outlined"
                                            name='pe_ae_procliente'
                                            id='pe_ae_procliente'
                                            style={{ marginTop: '8px' }}
                                            value={values.pe_ae_procliente}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            inputProps={{
                                                style: {
                                                    height: "5px",
                                                },
                                            }} />
                                    </div>
                                    </Item>
                                </Stack>
                                <Divider orientation="horizontal" flexItem />
                                <Stack sx={{ height: '130px' }}
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={2}
                                >
                                    <Item sx={{ width: '33.33%', height: 'auto', fontSize: '20px', alignItems: "center", paddingTop: '20px' }}
                                    >Entrega de Carpeta:</Item>
                                    <Item sx={{ width: '33.33%', height: 'auto', fontSize: '15px', alignItems: "center", paddingTop: '15px' }}>
                                        <Typography>Fisica:</Typography>
                                        <br />
                                        <Typography>Digital:</Typography></Item>
                                    <Item sx={{ width: '33.33%', height: 'auto', alignItems: "center", paddingTop: '20px' }}>
                                        <div>
                                            <TextField sx={{ width: '50%' }}
                                                label="Fisica"
                                                variant="outlined"
                                                name='pe_ec_fisica'
                                                id='pe_ec_fisica'
                                                style={{ marginTop: '6px' }}
                                                value={values.pe_ec_fisica}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                inputProps={{
                                                    style: {
                                                        height: "5px",
                                                    },
                                                }} />

                                            <br />
                                            <TextField sx={{ width: '50%' }}
                                                label="Digital"
                                                variant="outlined"
                                                name='pe_ec_digital'
                                                id='pe_ec_digital'
                                                style={{ marginTop: '8px' }}
                                                value={values.pe_ec_digital}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                inputProps={{
                                                    style: {
                                                        height: "5px",
                                                    },
                                                }} />

                                        </div>

                                    </Item>
                                </Stack>
                                <Divider orientation="horizontal" flexItem />
                                <Stack sx={{ height: '170px' }}
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={2}
                                >
                                    <Item sx={{ width: '33.33%', height: 'auto', fontSize: '20px', alignItems: "center", paddingTop: '50px' }}>Tecnico:</Item>
                                    <Item sx={{ width: '33.33%', height: 'auto' }}>
                                        <Typography style={{ paddingTop: '5px' }}>Full Time:</Typography>
                                        <br />
                                        <Typography style={{ paddingTop: '5px' }}>Part Time:</Typography>
                                        <br />
                                        <Typography style={{ paddingTop: '5px' }}>Asignado a Ruta:</Typography>
                                    </Item>
                                    <Item sx={{ width: '33.33%', height: 'auto' }}>
                                        <div>
                                            <TextField sx={{ width: '50%' }}
                                                label="Full Time"
                                                variant="outlined"
                                                name='pe_tec_fulltime'
                                                id='pe_tec_fulltime'
                                                value={values.pe_tec_fulltime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                inputProps={{
                                                    style: {
                                                        height: "5px",
                                                    },
                                                }} />

                                            <br />
                                            <TextField sx={{ width: '50%', marginTop: '15px' }}
                                                label="Part Time"
                                                variant="outlined"
                                                name='pe_tec_partime'
                                                id='pe_tec_partime'
                                                value={values.pe_tec_partime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                style={{ marginTop: '6px' }}
                                                inputProps={{
                                                    style: {
                                                        width: '60%',
                                                        height: "5px",
                                                    },
                                                }} />
                                            <br />
                                            <TextField sx={{ marginTop: '2px' }}
                                                label="Asignado a Ruta"
                                                variant="outlined"
                                                name='pe_tec_asigruta'
                                                id='pe_tec_asigruta'
                                                value={values.pe_tec_asigruta}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                style={{ marginTop: '6px', height: "5px" }}
                                                inputProps={{
                                                    style: {
                                                        width: '60%',
                                                        height: "5px",
                                                    },
                                                }} />
                                        </div>

                                    </Item>
                                </Stack>
                                <Divider orientation="horizontal" flexItem />
                                <div className="apliequiforms">
                                    <div className="formtdataae">
                                        <div className='titleapli'><label>APLICACIONES</label></div>

                                        <div className='titleequi'><label>EQUIPOS</label></div>

                                    </div>
                                    <div className="formdata">
                                        <Button variant="outlined" color="success" endIcon={<StickyNote2Icon />} onClick={handleOpen}>Ingresar Aplicaciones</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <div className="form-field">
                                                    <div className="formtdata">
                                                        <div className="tabone">
                                                            <label>Apicaciones</label>
                                                        </div>
                                                        <div className="tabtwo">
                                                            <label>Producto </label>
                                                        </div>
                                                        <div className="tabthree">
                                                            <label>Cantidad M2/M3</label>
                                                        </div>
                                                        <div className="tabfour">
                                                            <label>Area</label>
                                                        </div>
                                                        <div className="tabfive">
                                                            <label>Tipo de Frecuencia</label>
                                                        </div>
                                                        <div className="tabsix">
                                                            <label>Cantidad Frecuencia</label>
                                                        </div>
                                                        <div className="tabseven">
                                                            <label>Comentarios</label>
                                                        </div>
                                                        <div className="tabeight">
                                                            <label></label>
                                                        </div>
                                                    </div>

                                                    {serviceList.map((singleService, index) => (

                                                        <div key={index} className="services">

                                                            <div className="datagridone">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    options={servicioArray}
                                                                    className="inputformdise"
                                                                    name="pe_taba_apli"
                                                                    type="text"
                                                                    id="pe_taba_apli"
                                                                    sx={{ width: 250 }}
                                                                    value={singleService.pe_taba_apli}
                                                                    onChange={(e) => {handleApliacionesChange(e, index);handleChange(e)}}
                                                                    required 
                                                                    renderInput={(params) => <TextField {...params}
                                                                    
                                                                    label="Agregar Aplicacion" />}
                                                                />
                                                                {/*<TextField sx={{ fontSize: "5px" }}
                                                                    className="inputformdise"
                                                                    name="pe_taba_apli"
                                                                    type="text"
                                                                    id="pe_taba_apli"
                                                                    label="Agregar Aplicacion"
                                                                    value={singleService.pe_taba_apli}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                    required />*/}
                                                            </div>
                                                            <div className="datagridtwo">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    options={productrnpArray}
                                                                    sx={{ width: 250 }}
                                                                    value={singleService.pe_taba_prod}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                    required
                                                                    renderInput={(params) => <TextField {...params} label="Agregar Productos" />}
                                                                />
                                                                {/*<TextField className="inputformdise"
                                                                    name="pe_taba_prod"
                                                                    type="text"
                                                                    id="pe_taba_prod"
                                                                    label="Agregar Productos"
                                                                    value={singleService.pe_taba_prod}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                required />*/}</div>
                                                            <div className="datagridthree">
                                                                <TextField className="inputformdise"
                                                                    name="pe_taba_cant"
                                                                    type="text"
                                                                    id="pe_taba_cant"
                                                                    label="Agregar Cantidad"
                                                                    value={singleService.pe_taba_cant}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                    required />
                                                            </div>
                                                            <div className="datagridfour">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    options={areasProspectoArray}
                                                                    sx={{ width: 300 }}
                                                                    value={singleService.pe_taba_area}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                    required
                                                                    renderInput={(params) => <TextField {...params} label="Agregar Area" />}
                                                                />
                                                                {/*<TextField sx={{ width: "80%", marginTop: "10px" }}
                                                                    className="inputformdise"
                                                                    name="pe_taba_area"
                                                                    type="text"
                                                                    id="pe_taba_area"
                                                                    label="Agregar Area"
                                                                    value={singleService.pe_taba_area}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                    required />
                                                                */}
                                                            </div>
                                                            <div className="datagridfive">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    options={frecuenciaArray}
                                                                    sx={{ width: 250 }}
                                                                    value={singleService.pe_taba_tipofrec}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                    required
                                                                    renderInput={(params) => <TextField {...params} label="Tipo Frecuencia" />}
                                                                />
                                                                {/*<TextField className="inputformdise"
                                                                    name="pe_taba_tipofrec"
                                                                    type="text"
                                                                    id="pe_taba_tipofrec"
                                                                    label="Tipo Frecuencia"
                                                                    value={singleService.pe_taba_tipofrec}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                            required />*/}
                                                            </div>
                                                            <div className="datagridsix">
                                                                <TextField className="inputformdise"
                                                                    name="pe_taba_cantfrec"
                                                                    type="text"
                                                                    id="pe_taba_cantfrec"
                                                                    label="Cantidad Frecuencia"
                                                                    value={singleService.pe_taba_cantfrec}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                    required />
                                                            </div>
                                                            <div className="datagridseven">
                                                                <TextField
                                                                    className="inputformdise"
                                                                    name="pe_taba_comentfrec"
                                                                    type="text"
                                                                    id="pe_taba_comentfrec"
                                                                    label="Comentarios"
                                                                    value={singleService.pe_taba_comentfrec}
                                                                    onChange={(e) => { handleServiceChange(e, index); handleChange(e) }}
                                                                    required />
                                                            </div>
                                                            <div className="datagrideight">
                                                                {serviceList.length !== 1 && (
                                                                    <IconButton onClick={() => handleServiceRemove(index)}
                                                                        className="remove-btn"
                                                                        aria-label="delete"
                                                                        color="error">
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                )}
                                                            </div>
                                                            {serviceList.length - 1 === index && serviceList.length < 100 && (
                                                                <Button
                                                                    type="button"
                                                                    onClick={handleServiceAdd}
                                                                    className="add-btnTwo"
                                                                >
                                                                    <span>Agregar Area</span>
                                                                </Button>
                                                            )}

                                                        </div>
                                                    ))}
                                                </div>

                                            </Box>
                                        </Modal>
                                    </div>
                                    <div className="formdataprodd">
                                        <Button variant="outlined" color="success" endIcon={<ConstructionIcon />} onClick={handleOpena}>Ingresar Equipos</Button>
                                        <Modal
                                            open={opena}
                                            onClose={handleClosea}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <div className="form-field">
                                                    <div className="formtdata">
                                                        <div className="tabBone">
                                                            <label>Equipo</label>
                                                        </div>
                                                        <div className="tabBtwo">
                                                            <label>Cantidad </label>
                                                        </div>
                                                        <div className="tabBthree">
                                                            <label>Distribucion</label>
                                                        </div>
                                                        <div className="tabBfour">
                                                            <label>Producto</label>
                                                        </div>
                                                        <div className="tabBfive">
                                                            <label>Tipo de Frecuencia</label>
                                                        </div>
                                                        <div className="tabBsix">
                                                            <label>Cantidad Frecuencia</label>
                                                        </div>
                                                        <div className="tabBseven">
                                                            <label>Comentarios</label>
                                                        </div>
                                                        <div className="tabBeight">
                                                            <label></label>
                                                        </div>
                                                    </div>

                                                    {equipoList.map((singleEquipo, indexe) => (

                                                        <div key={indexe} className="services">

                                                            <div className="datagridBone">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    options={servtrampdispArray}
                                                                    sx={{ width: 150 }}
                                                                    value={singleEquipo.pe_tabb_equip}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                                    required
                                                                    renderInput={(params) => <TextField {...params} label="Agregar Equipo" />}
                                                                />
                                                                {/*<TextField className="inputformdise"
                                                                    name="pe_tabb_equip"
                                                                    type="text"
                                                                    id="pe_tabb_equip"
                                                                    label="Agregar Equipo"
                                                                    value={singleEquipo.pe_tabb_equip}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                    required />*/}
                                                            </div>
                                                            <div className="datagridBtwo">
                                                                <TextField className="inputformdise"
                                                                    name="pe_tabb_cant"
                                                                    type="text"
                                                                    id="pe_tabb_cant"
                                                                    label="Agregar Cantidad"
                                                                    value={singleEquipo.pe_tabb_cant}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                                    required /></div>
                                                            <div className="datagridBthree">
                                                                <TextField className="inputformdise"
                                                                    name="pe_tabb_prod"
                                                                    type="text"
                                                                    id="pe_tabb_prod"
                                                                    label="Agregar Producto"
                                                                    value={singleEquipo.pe_tabb_prod}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                                    required />
                                                            </div>
                                                            <div className="datagridBfour">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    options={cinturonesArray}
                                                                    sx={{ width: 300 }}
                                                                    value={singleEquipo.pe_tabb_cinturon}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                                    required
                                                                    renderInput={(params) => <TextField {...params} label="Movie" />}
                                                                />
                                                                {/*<TextField className="inputformdise"
                                                                    name="pe_tabb_cinturon"
                                                                    type="text"
                                                                    id="pe_tabb_cinturon"
                                                                    label="Agregar Cinturon"
                                                                    value={singleEquipo.pe_tabb_cinturon}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                    required />*/}
                                                            </div>
                                                            <div className="datagridBfive">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    options={frecuenciaArray}
                                                                    sx={{ width: 150 }}
                                                                    value={singleEquipo.pe_tabb_tipofrec}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                                    required
                                                                    renderInput={(params) => <TextField {...params} label="Tipo Frecuencia" />}
                                                                />
                                                                {/*<TextField className="inputformdise"
                                                                    name="pe_tabb_tipofrec"
                                                                    type="text"
                                                                    id="pe_tabb_tipofrec"
                                                                    label="Tipo Frecuencia"
                                                                    value={singleEquipo.pe_tabb_tipofrec}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                required />*/}
                                                            </div>

                                                            <div className="datagridBsix">
                                                                <TextField className="inputformdise"
                                                                    name="pe_tabb_cantfrec"
                                                                    type="text"
                                                                    id="pe_tabb_cantfrec"
                                                                    label="Cantidad Frecuencia"
                                                                    value={singleEquipo.pe_tabb_cantfrec}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                                    required />
                                                            </div>
                                                            <div className="datagridBseven">
                                                                <TextField
                                                                    className="inputformdise"
                                                                    name="pe_tabb_comentario"
                                                                    type="text"
                                                                    id="pe_tabb_comentario"
                                                                    label="Comentarios"
                                                                    value={singleEquipo.pe_tabb_comentario}
                                                                    onChange={(e) => { handleEquipoChange(e, indexe); handleChange(e) }}
                                                                    required />
                                                            </div>
                                                            <div className="datagridBeight">
                                                                {equipoList.length !== 1 && (
                                                                    <IconButton onClick={() => handleEquipoRemove(indexe)}
                                                                        aria-label="delete"
                                                                        color="error">
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                )}
                                                            </div>
                                                            {equipoList.length - 1 === indexe && equipoList.length < 100 && (
                                                                <Button
                                                                    type="button"
                                                                    onClick={handleEquipoAdd}
                                                                    className="add-btnOne"
                                                                >
                                                                    <span>Agregar Equipo</span>
                                                                </Button>
                                                            )}

                                                        </div>
                                                    ))}
                                                </div>


                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="formservadic">
                                    <div className='titleseradic'>
                                        <label>SERVICIOS ADICIONALES</label>
                                    </div>
                                </div>
                                <div className="formservadicdata">
                                    <Button variant="outlined" color="success" endIcon={<CallSplitIcon />} onClick={handleOpenb}>Ingresar Servicios Adicionales</Button>
                                    <Modal
                                        open={openb}
                                        onClose={handleCloseb}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <div className="form-field">
                                                <div className="formtdata">
                                                    <div className="tabCone">
                                                        <label>Servicios Adicionales</label>
                                                    </div>
                                                    <div className="tabCtwo">
                                                        <label>Cantidad Mensual </label>
                                                    </div>
                                                    <div className="tabCthree">
                                                        <label>Especificaciones</label>
                                                    </div>
                                                </div>
                                                <div className="tabCsix">
                                                    <label></label>
                                                </div>
                                            </div>

                                            {servadicList.map((singleServAdic, indexa) => (

                                                <div key={indexa} className="services">

                                                    <div className="datagridCone">
                                                        <TextField className="inputformdise"
                                                            name="pe_tabb_equip"
                                                            type="text"
                                                            id="pe_tabb_equip"
                                                            placeholder="Agregar Equipo"
                                                            value={singleServAdic.pe_tabb_equip}
                                                            onChange={(e) => { handleServAdicChange(e, indexa); handleChange(e) }}
                                                            required /></div>
                                                    <div className="datagridCtwo">
                                                        <TextField className="inputformdise"
                                                            name="pe_tabb_cant"
                                                            type="text"
                                                            id="pe_tabb_cant"
                                                            placeholder="Agregar Cantidad"
                                                            value={singleServAdic.pe_tabb_cant}
                                                            onChange={(e) => { handleServAdicChange(e, indexa); handleChange(e) }}
                                                            required /></div>
                                                    <div className="datagridCthree">
                                                        <TextField className="inputformdise"
                                                            name="pe_tabb_dist"
                                                            type="text"
                                                            id="pe_tabb_dist"
                                                            placeholder="Agregar Distribucion"
                                                            value={singleServAdic.pe_tabb_dist}
                                                            onChange={(e) => { handleServAdicChange(e, indexa); handleChange(e) }}
                                                            required />
                                                    </div>
                                                    <div className="datagridCfour">
                                                        {servadicList.length !== 1 && (
                                                            <IconButton onClick={() => handleServAdicRemove(indexa)}
                                                                aria-label="delete"
                                                                color="error">
                                                                <DeleteIcon />
                                                            </IconButton>

                                                        )}
                                                    </div>
                                                    {servadicList.length - 1 === indexa && equipoList.length < 100 && (
                                                        <Button
                                                            color="info"
                                                            type="button"
                                                            onClick={handleServAdicAdd}
                                                            className="add-btn"
                                                        >
                                                            <span>Agregar Equipo</span>
                                                        </Button>
                                                    )}

                                                </div>
                                            ))}


                                        </Box>
                                    </Modal>
                                </div>



                            </TapPanel>
                            <TapPanel value={value} index={1}>

                                <Box sx={{ width: '100%' }}>
                                    <div className="form-field">
                                        <div className="formtdata">
                                            <div className="tabCone">
                                                <label>Solicitud</label>
                                            </div>
                                            <div className="tabCtwo">
                                                <label>Si - No </label>
                                            </div>
                                            <div className="tabCthree">
                                                <label>Especificaciones</label>
                                            </div>
                                        </div>
                                        <div className="tabCsix">
                                            <label></label>
                                        </div>
                                    </div>

                                    {reqadicList.map((singleReqAdic, indexR) => (

                                        <div key={indexR} className="services">

                                            <div className="datagridCone">
                                                <TextField
                                                    className="inputformdise"
                                                    name="pe_tabb_equip"
                                                    type="text"
                                                    id="pe_tabb_equip"
                                                    placeholder="Solicitud"
                                                    value={singleReqAdic.pe_tabb_equip}
                                                    onChange={(e) => { handleReqAdicChange(e, indexR); handleChange(e) }}
                                                    required /></div>
                                            <div className="datagridCtwo">
                                                <FormControl>
                                                    <RadioGroup row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue=""
                                                        name="programa_seguridad"
                                                        id="programa_seguridad"
                                                        onChange={(e) => { handleReqAdicChange(e, indexR); handleChange(e) }}
                                                        onBlur={handleBlur}
                                                        value={singleReqAdic.programa_seguridad}
                                                    >
                                                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                                        <FormControlLabel value="no" control={<Radio />} label="no" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div className="datagridCthree">
                                                <TextField className="inputformdise"
                                                    name="pe_tabb_dist"
                                                    type="text"
                                                    id="pe_tabb_dist"
                                                    placeholder="Especificaciones"
                                                    value={singleReqAdic.pe_tabb_dist}
                                                    onChange={(e) => { handleReqAdicChange(e, indexR); handleChange(e) }}
                                                    required />
                                            </div>
                                            <div className="datagridCfour">
                                                {reqadicList.length !== 1 && (
                                                    <IconButton onClick={() => handleReqAdicRemove(indexR)}
                                                        aria-label="delete"
                                                        color="error">
                                                        <DeleteIcon />
                                                    </IconButton>

                                                )}
                                            </div>
                                            {reqadicList.length - 1 === indexR && reqadicList.length < 100 && (
                                                <Button
                                                    type="button"
                                                    onClick={handleReqAdicAdd}
                                                    className="add-btn"
                                                >
                                                    <span>Agregar Requerimiento adicional</span>
                                                </Button>
                                            )}

                                        </div>
                                    ))}

                                </Box>


                            </TapPanel>
                            <Button className="formservadicdata" variant="contained" color="success" type='submit'>Guardar</Button>
                        </form>
                    </div>
                )}
            </Formik>


        </div>

    );
}
function TapPanel(props) {
    const { children, value, index } = props
    return (
        <div>
            {
                value === index &&
                (
                    <h1>{children}</h1>
                )
            }
        </div>
    )
}

export default FormDicServ;