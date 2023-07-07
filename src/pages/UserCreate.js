import React, { useRef, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios, { Axios } from 'axios';
import { Button } from "@mui/material";

function UserCreate(props) {
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
    { field: 'partida', 
    headerClassName: 'super-app-theme--header',headerName: 'Partida', width: 90 },
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
    },{
        field: 'apro_estatus',
        headerClassName: 'super-app-theme--header',
        headerName: 'Estatus',
    },{
        field: 'apro_Precio',
        headerClassName: 'super-app-theme--header',
        headerName: 'Monto',
        renderCell: (params) => {
            return <Button >Click</Button>;
          }
        
        
    }
];

    return (
        <Box sx={{background:'white',
            height: 300,
            width: '100%',
            '& .super-app-theme--header': {
              backgroundColor: 'rgba(255, 7, 0, 0.55)',
            },
          }}>
            <DataGrid 
            getRowId={(data) => data.partida}
                rows={data }
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );

}

export default UserCreate;