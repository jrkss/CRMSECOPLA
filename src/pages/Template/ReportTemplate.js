import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import Cookies from 'universal-cookie';
import axios, { Axios } from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Card, responsiveFontSizes } from "@mui/material";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

function FormAprobaciones(props) {
    const Grid = styled(MuiGrid)(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& [role="separator"]': {
          margin: theme.spacing(0, 2),
        },
      }));
    const { match } = props;
    const [data, setData] = useState([]);

    const cookies = new Cookies();
    console.log(match.params.c2)
    const PeticionGetAll = () => {
        const baseUrlG = `https://localhost:7239/api/formlevantamiento/${match.params.c2}`;

        const getgridlev = axios.get(baseUrlG)

        axios.all([getgridlev]).then(
            axios.spread((...allData) => {
                const datagridlev = allData[0].data
                setData(datagridlev)
            })
        )
    }
    useEffect(() => {
        PeticionGetAll();
        if (!cookies.get('id')) {
            props.history.push('./');
        }
    }, []);
    const reportTemplateRef = useRef(null);

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: "a4",
            unit: "px"
        });

        // Adding the fonts

        doc.html(reportTemplateRef.current, {
            async callback(doc) {
                await doc.save("document");
            }
        });

    };

    const styles = {
        page: {
            width: '100%',
        },
        column: {
            display: "flex",
            flexDirection: "row"
        },
    };
    return (
        <>
            <div className="alternaldata">
                Datos Separados
                <div>

                    <input placeholder="Insertar monto" />
                </div>
            </div>
            <div className="Templatecontainer">
                <button className="button" onClick={handleGeneratePdf}>
                    Generate PDF
                </button>
                <div style={styles.page} ref={reportTemplateRef}>
                    
                    <Card sx={{ width: '450px', height: 'auto' }}>
                        <img style={{ position: 'relative', width: '100px', padding: "10px" }} ></img>
                        <label style={{ position: 'absolute', padding: '15px', fontSize: '10px' }}>Levantamiento de Servicios</label>
                        <label style={{ position: 'absolute', marginLeft: '150px', padding: '5px', fontSize: '10px' }}>Código: ISO-CO-001</label>
                        <label style={{ position: 'absolute', marginLeft: '141px', padding: '14px', fontSize: '10px' }}>Número de versión: 9 </label>
                        <label style={{ position: 'absolute', marginLeft: '130px', padding: '25px', fontSize: '10px' }}>Fecha de creación: 01/08/2020 </label>
                        <label style={{ position: 'absolute', marginLeft: '120px', padding: '36px', fontSize: '10px' }}>Fecha de revisión:22/02/2023</label>
                        <Divider />
                        

                    </Card>
                    <Grid container sx={{ width: '450px', height: 'auto' }}>
                        <Grid item xs sx={{background:'white', width:'225px'}}>
                        <label style={{ position: 'relative', paddingLeft: '17px', fontSize: '10px' }}>Datos Generales</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Fecha del Levantamiento.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Nombre del Contacto.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Nombre del Contacto.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Nombre de la Empresa.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Dirección de la Empresa.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Ubicación.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Contacto Comercial.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Mail Comercial.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Teléfono Comercial.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Contacto Calidad.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Teléfono Calidad.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Giro de la Empresa.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Actividad de la empresa.</label>
                        <br /><Divider variant="inset" />
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{background:'white'}}>
                            REQ
                        </Divider>
                        <Grid item xs sx={{background:'white', width:'225px'}}>
                        <label style={{ position: 'relative', paddingLeft: '17px', fontSize: '10px' }}>Datos Generales</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Fecha del Levantamiento.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Nombre del Contacto.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Nombre del Contacto.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Nombre de la Empresa.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Dirección de la Empresa.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Ubicación.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Contacto Comercial.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Mail Comercial.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Teléfono Comercial.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Contacto Calidad.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Teléfono Calidad.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Giro de la Empresa.</label>
                        <br /><Divider variant="middle" />
                        <label style={{ position: 'relative', padding: '17px', fontSize: '10px' }}>Actividad de la empresa.</label>
                        <br /><Divider variant="middle" />
                        </Grid>
                    </Grid>

                </div>
            </div>


        </>

    );
}

export default FormAprobaciones;
