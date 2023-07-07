import React, { useRef, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios, { Axios } from 'axios';
import { Button } from "@mui/material";

import { darken, lighten, styled } from '@mui/material/styles';


const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.3) : lighten(color, 0.3);

const getSelectedBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.1) : lighten(color, 0.1);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .super-app-theme--Abierto': {
        backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.info.main,
                theme.palette.mode,
            ),
        },
        '&.Mui-selected': {
            backgroundColor: getSelectedBackgroundColor(
                theme.palette.info.main,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor(
                    theme.palette.info.main,
                    theme.palette.mode,
                ),
            },
        },
    },
    '& .super-app-theme--Aprobado': {
        backgroundColor: getBackgroundColor(
            theme.palette.success.main,
            theme.palette.mode,
        ),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode,
            ),
        },
        '&.Mui-selected': {
            backgroundColor: getSelectedBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor(
                    theme.palette.success.main,
                    theme.palette.mode,
                ),
            },
        },
    },
    '& .super-app-theme--PartiallyFilled': {
        backgroundColor: getBackgroundColor(
            theme.palette.warning.main,
            theme.palette.mode,
        ),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode,
            ),
        },
        '&.Mui-selected': {
            backgroundColor: getSelectedBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor(
                    theme.palette.warning.main,
                    theme.palette.mode,
                ),
            },
        },
    },
    '& .super-app-theme--Rechazado': {
        backgroundColor: getBackgroundColor(
            theme.palette.error.main,
            theme.palette.mode,
        ),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.error.main,
                theme.palette.mode,
            ),
        },
        '&.Mui-selected': {
            backgroundColor: getSelectedBackgroundColor(
                theme.palette.error.main,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor(
                    theme.palette.error.main,
                    theme.palette.mode,
                ),
            },
        },
    },
}));


function DataGridExample(props) {
    const [data, setData] = useState([]);
    const [datafl, setDatafl] = useState([]);

    const PeticionGetAll = () => {
        const baseUrlG = "https://localhost:7239/api/kds_aprobaciones";
        const baseUrlGfl = "https://localhost:7239/api/kds_aprobaciones";

        const getgridlev = axios.get(baseUrlG)
        const getformlev = axios.get(baseUrlGfl)

        axios.all([getgridlev, getformlev]).then(
            axios.spread((...allData) => {
                const datos = allData[0].data
                const dataformlev = allData[1].data
                setData(datos)
                setDatafl(dataformlev)

                console.log(datos)
            })
        )
    }
    useEffect(() => {
        /*peticionGet();
        peticionGetFl();*/
        PeticionGetAll();
    }, []);

    const columns = [
        {
            field: 'partida',
            headerClassName: 'super-app-theme--header',
            headerName: 'Partida',
            width: 90
        },
        {
            field: 'c2',
            headerName: 'Folio',

            headerClassName: 'super-app-theme--header',
            width: 150,
            editable: false,
        },
        {
            field: 'apro_nombre',
            headerClassName: 'super-app-theme--header',
            headerName: 'Nombre',
            width: 250,
            editable: false,
        },
        {
            field: 'apro_asesor',
            headerClassName: 'super-app-theme--header',
            headerName: 'Asesor',
            width: 110,
            editable: false,
        },
        {
            field: 'apro_comentarios',
            headerClassName: 'super-app-theme--header',
            headerName: 'Comentarios',
        }, {
            field: 'apro_estatus',
            headerClassName: 'super-app-theme--header',
            headerName: 'Estatus',
        }, {
            field: 'apro_Precio',
            headerClassName: 'super-app-theme--header',
            headerName: 'Monto',
            renderCell: ( data  ) => {
                
                return <Button onClick={(data) => console.log(data.c2)}>Click</Button>;
            }


        }
    ];

    return (
        <Box sx={{
            background: 'white',
            height: 300,
            width: '90%',
            '& .super-app-theme--header': {
                backgroundColor: 'rgba(0, 86, 140)',
                color: "common.white"
            },
        }}>
            <StyledDataGrid
                getRowId={(data) => data.partida}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 2,
                        },
                    },
                }}
                pageSizeOptions={[2]}
                disableRowSelectionOnClick
                getRowClassName={(data) => `super-app-theme--${data.row.apro_estatus}`}
            />
        </Box>
    );

}

export default DataGridExample;