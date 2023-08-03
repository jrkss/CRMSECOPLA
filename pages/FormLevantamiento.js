import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "../css/FormLevantamiento.css";
import { Formik } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Tabs, Tab, AppBar, Container } from "@material-ui/core";
import moment from "moment";

import { styled } from "@mui/system";
import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import Link from "@mui/material/Link";
import withReactContent from "sweetalert2-react-content";
import { Routes, Route, useParams } from "react-router-dom";
import dayjs from 'dayjs';

import Aprobaciones from "./Aprobaciones";
import UserCreate from "./UserCreate";

function FormLevantamiento(props) {
  const { match } = props;
  const [Cdate, setDate] = useState(new Date().toLocaleDateString("fr-FR"));
  const [archivos, setArchivos] = useState([null]);
  const baseUrlG = `http://192.168.1.47:5000/api/formlevantamiento/:${match.params.planta}`;
  const { formid } = useParams();
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState([]);
  const [dataApro, setDataApro] = useState([]);

  /*   const subirArchivos = e => {
        setArchivos(e);
    }
    */

  const PeticionGetAll = () => {
    const baseUrlG = `http://192.168.1.47:5000/api/formlevantamiento/${match.params.planta}`;
    const urlAproG = `http://192.168.1.47:5000/api/kds_aprobaciones/`;
    const getgridlev = axios.get(baseUrlG);
    const geturlapro = axios.get(urlAproG);

    axios.all([getgridlev, geturlapro]).then(
      axios.spread((...allData) => {
        const datagridlev = allData[0].data;
        const datagridapro = allData[1].data;
        setData(datagridlev);
        setDataApro(datagridapro);
      })
    );
  };

  /**
     * Insertar Imagenes
     
    const insertarArchivos = async () => {
        const f = new FormData();
        for (let index = 0; index < archivos.length; index++) {
            f.append("partida", data.planta);
            f.append("FileUri", archivos[index]);
        }
        console.log(f)
        await axios.post("http://192.168.1.47:5000/api/kdslevantamientosfiles", f)
            .then(response => {console.log(response.data)  })
            .catch(error => {  })
    }

    
     * Fin Insertar Imagenes
     */
  /*
       const peticionGet = async () => {
           await axios.get(baseUrlG)
               .then(response => {
                   setData(response.data);
               }).catch(error => {
                   .log(error);
               })
               .log(data.c2)
       }*/
  const mvgridlev = () => {
    props.history.push("/GridLevantamiento");
  };

  const cookies = new Cookies();

  useEffect(() => {
    PeticionGetAll(data);
    if (!cookies.get("id")) {
      props.history.push("./");
    }
  }, []);

  const sections = document.querySelectorAll("section[id]");

  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".nav__menu a[href*=" + sectionId + "]")
          .classList.add("active-link");
      } else {
        document
          .querySelector(".nav__menu a[href*=" + sectionId + "]")
          .classList.remove("active-link");
      }
    });
  }
  window.addEventListener("scroll", scrollActive);
  const rows = [
    {
      nombre_contacto: data.nombre_contacto,
      nombre_empresa: data.nombre_empresa,
    },
  ];
  const [value, setValue] = React.useState(0);
  const handleTabs = (e, val) => {
    console.warn(val);
    setValue(val);
  };

  if(data.fecha_levantamiento == null){
    console.log("Load Data")
  }else{
    var datetime = moment(data.fecha_levantamiento).format("YYYY/MM/DD");
  }

  console.log(datetime)

  return (
    <div>
      <label>{rows[0].nombre_contacto}</label>
      <Formik
        enableReinitialize={true}
        validateOnChange={true}
        initialStatus={true}
        initialValues={{
          c2: data.planta,
          c3: data.c3,
          c111: data.c111,
          estatus: "Pendiente",
          fecha_levantamiento: `${data.fecha_levantamiento || ""}`,
          nombre_contacto: `${data.nombre_contacto || ""}`,
          nombre_empresa: `${data.nombre_empresa || ""}`,
          direccion_empresa: `${data.direccion_empresa || ""}`,
          ubicacion: `${data.ubicacion || ""}`,
          contacto_comercial: `${data.contacto_comercial || ""}`,
          mail_comercial: `${data.mail_comercial || ""}`,
          telefono_comercial: `${data.telefono_comercial || ""}`,
          contacto_calidad: `${data.contacto_calidad || ""}`,
          mail_calidad: `${data.mail_calidad || ""}`,
          telefono_calidad: `${data.telefono_calidad || ""}`,
          giro_empresa: `${data.giro_empresa || ""}`,
          actividad_empresa: `${data.actividad_empresa || ""}`,

          programa_seguridad: `${data.programa_seguridad || ""}`,
          comentario_programa: `${data.comentario_programa || ""}`,
          requerimiento_salubridad: `${data.requerimiento_salubridad || ""}`,
          comentario_salubridad: `${data.comentario_salubridad || ""}`,
          normas_sanitarias: `${data.normas_sanitarias || ""}`,
          comentario_nsanitarias: `${data.comentario_nsanitarias || ""}`,
          identifica_plaga: `${data.identifica_plaga || ""}`,
          fauna_domestica: `${data.fauna_domestica || ""}`,
          tipo_domestica: `${data.tipo_domestica || ""}`,
          fauna_silvestre: `${data.fauna_silvestre || ""}`,
          tipo_silvestre: `${data.tipo_silvestre || ""}`,
          insectos_voladores: `${data.insectos_voladores || ""}`,
          tipo_voladores: `${data.tipo_voladores || ""}`,
          insectos_rastreros: `${data.insectos_rastreros || ""}`,
          tipo_rastreros: `${data.tipo_rastreros || ""}`,
          fauna_aviar: `${data.fauna_aviar || ""}`,
          tipo_aviar: `${data.tipo_aviar || ""}`,
          desornitacion: `${data.desornitacion || ""}`,
          comentario_desornitacion: `${data.comentario_desornitacion || ""}`,
          gorgojo: `${data.gorgojo || ""}`,
          comentario_gorgojo: `${data.comentario_gorgojo || ""}`,
          roedores: `${data.roedores || ""}`,
          comentario_roedor: `${data.comentario_roedor || ""}`,
          areas_conflictivas: `${data.areas_conflictivas || ""}`,

          tipo_area: `${data.tipo_area || ""}`,

          escaleras: `${data.escaleras || ""}`,
          tipo_escalera: `${data.tipo_escalera || ""}`,
          azoteas: `${data.azoteas || ""}`,
          tipo_azoteas: `${data.tipo_azoteas || ""}`,
          techos: `${data.techos || ""}`,
          tipo_techo: `${data.tipo_techo || ""}`,
          pasillos: `${data.pasillos || ""}`,
          tipo_pasillo: `${data.tipo_pasillo || ""}`,
          banios: `${data.banios || ""}`,
          tipo_banio: `${data.tipo_banio || ""}`,
          lockers: `${data.lockers || ""}`,
          tipo_locker: `${data.tipo_locker || ""}`,
          andenes: `${data.andenes || ""}`,
          tipo_anden: `${data.tipo_anden || ""}`,
          rampas: `${data.rampas || ""}`,
          tipo_rampa: `${data.tipo_rampa || ""}`,
          areas_produccion: `${data.areas_produccion || ""}`,
          tipo_produccion: `${data.tipo_produccion || ""}`,
          areas_verdes: `${data.areas_verdes || ""}`,
          tipo_verdes: `${data.tipo_verdes || ""}`,
          comedores: `${data.comedores || ""}`,
          tipo_comedores: `${data.tipo_comedores || ""}`,
          oficinas: `${data.oficinas || ""}`,
          tipo_oficina: `${data.tipo_oficina || ""}`,
          almacen_mp: `${data.almacen_mp || ""}`,
          tipo_almacenmp: `${data.tipo_almacenmp || ""}`,
          almacen_pt: `${data.almacen_pt || ""}`,
          tipo_almacenpt: `${data.tipo_almacenpt || ""}`,
          almacen_empaque: `${data.almacen_empaque || ""}`,
          tipo_empaque: `${data.tipo_empaque || ""}`,
          tratadora_agua: `${data.tratadora_agua || ""}`,
          tipo_tratadora: `${data.tipo_tratadora || ""}`,
          contenedor_basura: `${data.contenedor_basura || ""}`,
          tipo_contenedor: `${data.tipo_contenedor || ""}`,
          silos: `${data.silos || ""}`,
          tipo_silos: `${data.tipo_silos || ""}`,
          tuneles: `${data.tuneles || ""}`,
          tipo_tuneles: `${data.tipo_tuneles || ""}`,
          bandas_transportadora: `${data.bandas_transportadora || ""}`,
          tipo_trasportadora: `${data.tipo_trasportadora || ""}`,
          unidades_reparto: `${data.unidades_reparto || ""}`,
          tipo_unidades: `${data.tipo_unidades || ""}`,
          tarimas: `${data.tarimas || ""}`,
          tipo_tarimas: `${data.tipo_tarimas || ""}`,
          talleres: `${data.talleres || ""}`,
          tipo_talleres: `${data.tipo_talleres || ""}`,
          camaras_refrigeracion: `${data.camaras_refrigeracion || ""}`,
          tipo_camaras: `${data.tipo_camaras || ""}`,
          producto_noconforme: `${data.producto_noconforme || ""}`,
          tipo_noconforme: `${data.tipo_noconforme || ""}`,
          otros_especificar: `${data.otros_especificar || ""}`,
          tipo_otros: `${data.tipo_otros || ""}`,
          lineamientos_auditados: `${data.lineamientos_auditados || ""}`,
          tipo_auditados: `${data.tipo_auditados || ""}`,
          programas_formacion: `${data.programas_formacion || ""}`,
          programas_mantto: `${data.programas_mantto || ""}`,
          area_oportunidad: `${data.area_oportunidad || ""}`,
          programas_almacenamiento: `${data.programas_almacenamiento || ""}`,
          detalle_programa: `${data.detalle_programa || ""}`,
          infraestructura: `${data.infraestructura || ""}`,
          zonas_mantto: `${data.zonas_mantto || ""}`,
          equipo_comunicacion: `${data.equipo_comunicacion || ""}`,
          tipo_equipo: `${data.tipo_equipo || ""}`,
          equipo_epp: `${data.equipo_epp || ""}`,
          tipo_epp: `${data.tipo_epp || ""}`,
          acceso_interno: `${data.acceso_interno || ""}`,
          tipo_acceso: `${data.tipo_acceso || ""}`,
          horarios: `${data.horarios || ""}`,
          tipo_horario: `${data.tipo_horario || ""}`,
          examenes_medicos: `${data.examenes_medicos || ""}`,
          tipo_examenmedico: `${data.tipo_examenmedico || ""}`,
          frecuencia_examen: `${data.frecuencia_examen || ""}`,
          tipo_frecuencia: `${data.tipo_frecuencia || ""}`,
          carta_antecedentes: `${data.carta_antecedentes || ""}`,
          tipo_carta: `${data.tipo_carta || ""}`,
          imss: `${data.imss || ""}`,
          documento_imss: `${data.documento_imss || ""}`,
          credencial_identificacion: `${data.credencial_identificacion || ""}`,
          tipo_identificacion: `${data.tipo_identificacion || ""}`,
          dias_capacitacion: `${data.dias_capacitacion || ""}`,
          tipo_dias: `${data.tipo_dias || ""}`,
          capacitacion_empresa: `${data.capacitacion_empresa || ""}`,
          tipo_capacitacionemp: `${data.tipo_capacitacionemp || ""}`,
          planeacion_visitas: `${data.planeacion_visitas || ""}`,
          tipo_planeacion: `${data.tipo_planeacion || ""}`,
          dc3: `${data.dc3 || ""}`,
          tipo_dc3: `${data.tipo_dc3 || ""}`,
          resguardo_equipos: `${data.resguardo_equipos || ""}`,
          zona_resguardo: `${data.zona_resguardo || ""}`,
          orden_compra: `${data.orden_compra || ""}`,
          oc_comentario: `${data.oc_comentario || ""}`,
          contrato: `${data.contrato || ""}`,
          contrato_comentario: `${data.contrato_comentario || ""}`,
          servicio_contratado: `${data.servicio_contratado || ""}`,
          periodo_comentario: `${data.periodo_comentario || ""}`,
          carpeta_fisica: `${data.carpeta_fisica || ""}`,
          fisica_comentario: `${data.fisica_comentario || ""}`,
          carpeta_digital: `${data.carpeta_digital || ""}`,
          digital_comentario: `${data.digital_comentario || ""}`,
          portal_factura: `${data.portal_factura || ""}`,
          portal_comentario: `${data.portal_comentario || ""}`,
          fianza: `${data.fianza || ""}`,
          fianza_comentario: `${data.fianza_comentario || ""}`,
          sindical: `${data.sindical || ""}`,
          sindical_comentario: `${data.sindical_comentario || ""}`,
          plagas_region: `${data.plagas_region || ""}`,
          colindancia: `${data.colindancia || ""}`,
          layout_cliente: `${data.layout_cliente || ""}`,
          urlimagen: `${data.urlimagen || ""}`,
          m2_terreno: `${data.m2_terreno || "0"}`,
          m2_construcion: `${data.m2_construcion || "0"}`,
          m3: `${data.m3 || "0"}`,
          cebadero_a_actual: `${data.cebadero_a_actual || "0"}`,
          cebadero_a_requerido: `${data.cebadero_a_requerido || "0"}`,
          cebadero_a_comentarios: `${data.cebadero_a_comentarios || ""}`,
          cebadero_b_actual: `${data.cebadero_b_actual || "0"}`,
          cebadero_b_requerido: `${data.cebadero_b_requerido || "0"}`,
          cebadero_b_comentarios: `${data.cebadero_b_comentarios || ""}`,
          mecanicas_c_actual: `${data.mecanicas_c_actual || "0"}`,
          mecanicas_c_requerido: `${data.mecanicas_c_requerido || "0"}`,
          trapper: `${data.trapper || ""}`,
          metalicas: `${data.metalicas || ""}`,
          trex_actual: `${data.trex_actual || "0"}`,
          trex_requerido: `${data.trex_requerido || "0"}`,
          trex_comentarios: `${data.trex_comentarios || ""}`,
          gomasroedor_actual: `${data.gomasroedor_actual || "0"}`,
          gomasroedor_requerido: `${data.gomasroedor_requerido || "0"}`,
          gomasroedor_comentarios: `${data.gomasroedor_comentarios || ""}`,
          gomasinsecto_actual: `${data.gomasinsecto_actual || "0"}`,
          gomasinsecto_requerido: `${data.gomasinsecto_requerido || "0"}`,
          gomasinsecto_comentarios: `${data.gomasinsecto_comentarios || ""}`,
          lln_actual: `${data.lln_actual || "0"}`,
          lln_requerido: `${data.lln_requerido || "0"}`,
          lln_comentarios: `${data.lln_comentarios || ""}`,
          electrocutadores_actual: `${data.electrocutadores_actual || "0"}`,
          electrocutadores_requerdio: `${
            data.electrocutadores_requerdio || "0"
          }`,
          electrocutadores_comentarios: `${
            data.electrocutadores_comentarios || ""
          }`,
          dispensadores_actual: `${data.dispensadores_actual || "0"}`,
          dispensadores_requerido: `${data.dispensadores_requerido || "0"}`,
          dispensadores_comentarios: `${data.dispensadores_comentarios || ""}`,
          jaulas_actual: `${data.jaulas_actual || "0"}`,
          jaulas_requerido: `${data.jaulas_requerido || "0"}`,
          jaulas_comentarios: `${data.jaulas_comentarios || ""}`,
          bebederos_actual: `${data.bebederos_actual || "0"}`,
          bebederos_requerido: `${data.bebederos_requerido || "0"}`,
          bebederos_comentarios: `${data.bebederos_comentarios || ""}`,
          feromonas_actual: `${data.feromonas_actual || "0"}`,
          feromonas_requerido: `${data.feromonas_requerido || "0"}`,
          feromonas_comentarios: `${data.feromonas_comentarios || ""}`,
          tratamiento_mosca_actual: `${data.tratamiento_mosca_actual || "0"}`,
          tratamiento_mosca_requerido: `${
            data.tratamiento_mosca_requerido || "0"
          }`,
          tratamiento_mosca_comentarios: `${
            data.tratamiento_mosca_comentarios || ""
          }`,
          otros_actual: `${data.otros_actual || "0"}`,
          otros_requerido: `${data.otros_especificar || "0"}`,
          otros_comentarios: `${data.otros_comentarios || ""}`,
          tecnico_fijo_actual: `${data.tecnico_fijo_actual || "0"}`,
          tecnico_fijo_requerido: `${data.tecnico_fijo_requerido || "0"}`,
          tecnico_fijo_comentarios: `${data.tecnico_fijo_comentarios || ""}`,
          tecnico_zona_actual: `${data.tecnico_zona_actual || "0"}`,
          tecnico_zona_requerido: `${data.tecnico_zona_requerido || "0"}`,
          tecnico_zona_comentarios: `${data.tecnico_zona_comentarios || ""}`,
          tecnico_ruta_actual: `${data.tecnico_ruta_actual || "0"}`,
          tecnico_ruta_requerido: `${data.tecnico_ruta_requerido || "0"}`,
          tecnico_ruta_comentarios: `${data.tecnico_ruta_comentarios || ""}`,
          distancia_tecnico_actual: `${data.distancia_tecnico_actual || "0"}`,
          distancia_tecnico_requerido: `${
            data.distancia_tecnico_requerido || "0"
          }`,
          distancia_tecnico_comentarios: `${
            data.dispensadores_comentarios || ""
          }`,
          frecuencia_aspersion_actual: `${
            data.frecuencia_aspersion_actual || "0"
          }`,
          frecuencia_aspersion_requerido: `${
            data.frecuencia_aspersion_requerido || "0"
          }`,
          frecuencia_aspersion_comentarios: `${
            data.frecuencia_aspersion_comentarios || ""
          }`,
          frecuencia_nebulizacion_actual: `${
            data.frecuencia_nebulizacion_actual || "0"
          }`,
          frecuencia_nebulizacion_requerido: `${
            data.frecuencia_nebulizacion_requerido || "0"
          }`,
          frecuencia_nebulizacion_comentaros: `${
            data.frecuencia_nebulizacion_comentaros || ""
          }`,
          frecuencia_termo_actual: `${data.frecuencia_termo_actual || "0"}`,
          frecuencia_termo_requerido: `${
            data.frecuencia_termo_requerido || "0"
          }`,
          frecuencia_termo_comentarios: `${
            data.frecuencia_termo_comentarios || ""
          }`,
          tratamiento_unidades_actual: `${
            data.tratamiento_unidades_actual || "0"
          }`,
          tratamiento_unidades_requerido: `${
            data.tratamiento_unidades_requerido || "0"
          }`,
          tratamiento_unidades_comentarios: `${
            data.tratamiento_unidades_comentarios || ""
          }`,
          tratamiento_tarimas_actual: `${
            data.tratamiento_tarimas_actual || "0"
          }`,
          tratamiento_tarimas_requerido: `${
            data.tratamiento_tarimas_requerido || "0"
          }`,
          tratamiento_tarimas_comentarios: `${
            data.tratamiento_tarimas_comentarios || ""
          }`,
          equipo_comodato_actual: `${data.equipo_comodato_actual || "0"}`,
          equipo_comodato_requerido: `${data.equipo_comodato_requerido || "0"}`,
          equipo_comodato_comentarios: `${
            data.equipo_comodato_comentarios || ""
          }`,
          equipo_propio_actual: `${data.equipo_propio_actual || "0"}`,
          equipo_propio_requerido: `${data.equipo_propio_requerido || "0"}`,
          equipo_propio_comentarios: `${data.equipo_propio_comentarios || ""}`,
          tratamiento_drenaje_actual: `${
            data.tratamiento_drenaje_actual || "0"
          }`,
          tratamiento_drenaje_requerido: `${
            data.tratamiento_drenaje_requerido || "0"
          }`,
          tratamiento_drenaje_comentarios: `${
            data.tratamiento_drenaje_comentarios || ""
          }`,
          malla: `${data.malla || ""}`,
          pared: `${data.pared || ""}`,
          varillas_anclar: `${data.varillas_anclar || ""}`,
          tipo_superficie: `${data.tipo_superficie || ""}`,
          tipo_instalacion: `${data.tipo_instalacion || ""}`,
          proveedor_actual: `${data.proveedor_actual || ""}`,
          comentarios_generales: `${data.comentarios_generales || ""}`,
        }}
        onSubmit={(valores) => {
          const editaFormLev = {
            planta: data.planta,
            id_prospecto: data.id_prospecto,
            asesor_asignado: data.asesor_asignado,
            zona: "QRO",
            region: "Norte",
            estatus: "Pendiente",
            direccion: "Norte",
            fecha_levantamiento: data.fecha_levantamiento,
            nombre_contacto: valores.nombre_contacto,
            nombre_empresa: valores.nombre_empresa,
            direccion_empresa: valores.direccion_empresa,
            ubicacion: valores.ubicacion,
            contacto_comercial: valores.contacto_comercial,
            mail_comercial: valores.mail_comercial,
            telefono_comercial: valores.telefono_comercial,
            contacto_calidad: valores.contacto_calidad,
            mail_calidad: valores.mail_calidad,
            telefono_calidad: valores.telefono_calidad,
            giro_empresa: valores.giro_empresa,
            actividad_empresa: valores.actividad_empresa,
            programa_seguridad: valores.programa_seguridad,
            comentario_programa: valores.comentario_programa,
            requerimiento_salubridad: valores.requerimiento_salubridad,
            comentario_salubridad: valores.comentario_salubridad,
            normas_sanitarias: valores.normas_sanitarias,
            comentario_nsanitarias: valores.comentario_nsanitarias,
            identifica_plaga: valores.identifica_plaga,
            fauna_domestica: valores.fauna_domestica,
            tipo_domestica: valores.tipo_domestica,
            fauna_silvestre: valores.fauna_silvestre,
            tipo_silvestre: valores.tipo_silvestre,
            insectos_voladores: valores.insectos_voladores,
            tipo_voladores: valores.tipo_voladores,
            insectos_rastreros: valores.insectos_rastreros,
            tipo_rastreros: valores.tipo_rastreros,
            fauna_aviar: valores.fauna_aviar,
            tipo_aviar: valores.tipo_aviar,
            desornitacion: valores.desornitacion,
            comentario_desornitacion: valores.comentario_desornitacion,
            gorgojo: valores.gorgojo,
            comentario_gorgojo: valores.comentario_gorgojo,
            roedores: valores.roedores,
            comentario_roedor: valores.comentario_roedor,
            areas_conflictivas: valores.areas_conflictivas,
            tipo_area: valores.tipo_area,
            escaleras: valores.escaleras,
            tipo_escalera: valores.tipo_escalera,
            azoteas: valores.azoteas,
            tipo_azoteas: valores.tipo_azoteas,
            techos: valores.techos,
            tipo_techo: valores.tipo_techo,
            pasillos: valores.pasillos,
            tipo_pasillo: valores.tipo_pasillo,
            banios: valores.banios,
            tipo_banio: valores.tipo_banio,
            lockers: valores.lockers,
            tipo_locker: valores.tipo_locker,
            andenes: valores.andenes,
            tipo_anden: valores.tipo_anden,
            rampas: valores.rampas,
            tipo_rampa: valores.tipo_rampa,
            areas_produccion: valores.areas_produccion,
            tipo_produccion: valores.tipo_produccion,
            areas_verdes: valores.areas_verdes,
            tipo_verdes: valores.tipo_verdes,
            comedores: valores.comedores,
            tipo_comedores: valores.tipo_comedores,
            oficinas: valores.oficinas,
            tipo_oficina: valores.tipo_oficina,
            almacen_mp: valores.almacen_mp,
            tipo_almacenmp: valores.tipo_almacenmp,
            almacen_pt: valores.almacen_pt,
            tipo_almacenpt: valores.tipo_almacenpt,
            almacen_empaque: valores.almacen_empaque,
            tipo_empaque: valores.tipo_empaque,
            tratadora_agua: valores.tratadora_agua,
            tipo_tratadora: valores.tipo_tratadora,
            contenedor_basura: valores.contenedor_basura,
            tipo_contenedor: valores.tipo_contenedor,
            silos: valores.silos,
            tipo_silos: valores.tipo_silos,
            tuneles: valores.tuneles,
            tipo_tuneles: valores.tipo_tuneles,
            bandas_transportadora: valores.bandas_transportadora,
            tipo_trasportadora: valores.tipo_trasportadora,
            unidades_reparto: valores.unidades_reparto,
            tipo_unidades: valores.tipo_unidades,
            tarimas: valores.tarimas,
            tipo_tarimas: valores.tipo_tarimas,
            talleres: valores.talleres,
            tipo_talleres: valores.tipo_talleres,
            camaras_refrigeracion: valores.camaras_refrigeracion,
            tipo_camaras: valores.tipo_camaras,
            producto_noconforme: valores.producto_noconforme,
            tipo_noconforme: valores.tipo_noconforme,
            otros_especificar: valores.otros_especificar,
            tipo_otros: valores.tipo_otros,
            lineamientos_auditados: valores.lineamientos_auditados,
            tipo_auditados: valores.tipo_auditados,
            programas_formacion: valores.programas_formacion,
            programas_mantto: valores.programas_mantto,
            area_oportunidad: valores.area_oportunidad,
            programas_almacenamiento: valores.programas_almacenamiento,
            detalle_programa: valores.detalle_programa,
            infraestructura: valores.infraestructura,
            zonas_mantto: valores.zonas_mantto,
            equipo_comunicacion: valores.equipo_comunicacion,
            tipo_equipo: valores.tipo_equipo,
            equipo_epp: valores.equipo_epp,
            tipo_epp: valores.tipo_epp,
            acceso_interno: valores.acceso_interno,
            tipo_acceso: valores.tipo_acceso,
            horarios: valores.horarios,
            tipo_horario: valores.tipo_horario,
            examenes_medicos: valores.examenes_medicos,
            tipo_examenmedico: valores.tipo_examenmedico,
            frecuencia_examen: valores.frecuencia_examen,
            tipo_frecuencia: valores.tipo_frecuencia,
            carta_antecedentes: valores.carta_antecedentes,
            tipo_carta: valores.tipo_carta,
            imss: valores.imss,
            documento_imss: valores.documento_imss,
            credencial_identificacion: valores.credencial_identificacion,
            tipo_identificacion: valores.tipo_identificacion,
            dias_capacitacion: valores.dias_capacitacion,
            tipo_dias: valores.tipo_dias,
            capacitacion_empresa: valores.capacitacion_empresa,
            tipo_capacitacionemp: valores.tipo_capacitacionemp,
            planeacion_visitas: valores.planeacion_visitas,
            tipo_planeacion: valores.tipo_planeacion,
            dc3: valores.dc3,
            tipo_dc3: valores.tipo_dc3,
            resguardo_equipos: valores.resguardo_equipos,
            zona_resguardo: valores.zona_resguardo,
            orden_compra: valores.orden_compra,
            oc_comentario: valores.oc_comentario,
            contrato: valores.contrato,
            contrato_comentario: valores.contrato_comentario,
            servicio_contratado: valores.servicio_contratado,
            periodo_comentario: valores.periodo_comentario,
            carpeta_fisica: valores.carpeta_fisica,
            fisica_comentario: valores.fisica_comentario,
            carpeta_digital: valores.carpeta_digital,
            digital_comentario: valores.digital_comentario,
            portal_factura: valores.portal_factura,
            portal_comentario: valores.portal_comentario,
            fianza: valores.fianza,
            fianza_comentario: valores.fianza_comentario,
            sindical: valores.sindical,
            sindical_comentario: valores.sindical_comentario,
            plagas_region: valores.plagas_region,
            colindancia: valores.colindancia,
            layout_cliente: valores.layout_cliente,
            urlimagen: data.urlimagen,
            m2_terreno: valores.m2_terreno,
            m2_construcion: valores.m2_construcion,
            m3: valores.m3,
            cebadero_a_actual: valores.cebadero_a_actual,
            cebadero_a_requerido: valores.cebadero_a_requerido,
            cebadero_a_comentarios: valores.cebadero_a_comentarios,
            cebadero_b_actual: valores.cebadero_b_actual,
            cebadero_b_requerido: valores.cebadero_b_requerido,
            cebadero_b_comentarios: valores.cebadero_b_comentarios,
            mecanicas_c_actual: valores.mecanicas_c_actual,
            mecanicas_c_requerido: valores.mecanicas_c_requerido,
            trapper: valores.trapper,
            metalicas: valores.metalicas,
            trex_actual: valores.trex_actual,
            trex_requerido: valores.trex_requerido,
            trex_comentarios: valores.trex_comentarios,
            gomasroedor_actual: valores.gomasroedor_actual,
            gomasroedor_requerido: valores.gomasroedor_requerido,
            gomasroedor_comentarios: valores.gomasroedor_comentarios,
            gomasinsecto_actual: valores.gomasinsecto_actual,
            gomasinsecto_requerido: valores.gomasinsecto_requerido,
            gomasinsecto_comentarios: valores.gomasinsecto_comentarios,
            lln_actual: valores.lln_actual,
            lln_requerido: valores.lln_requerido,
            lln_comentarios: valores.lln_comentarios,
            electrocutadores_actual: valores.electrocutadores_actual,
            electrocutadores_requerdio: valores.electrocutadores_requerdio,
            electrocutadores_comentarios: valores.electrocutadores_comentarios,
            dispensadores_actual: valores.dispensadores_actual,
            dispensadores_requerido: valores.dispensadores_requerido,
            dispensadores_comentarios: valores.dispensadores_comentarios,
            jaulas_actual: valores.jaulas_actual,
            jaulas_requerido: valores.jaulas_requerido,
            jaulas_comentarios: valores.jaulas_comentarios,
            bebederos_actual: valores.bebederos_actual,
            bebederos_requerido: valores.bebederos_requerido,
            bebederos_comentarios: valores.bebederos_comentarios,
            feromonas_actual: valores.feromonas_actual,
            feromonas_requerido: valores.feromonas_requerido,
            feromonas_comentarios: valores.feromonas_comentarios,
            tratamiento_mosca_actual: valores.tratamiento_mosca_actual,
            tratamiento_mosca_requerido: valores.tratamiento_mosca_requerido,
            tratamiento_mosca_comentarios:
              valores.tratamiento_mosca_comentarios,
            otros_actual: valores.otros_actual,
            otros_requerido: valores.otros_requerido,
            otros_comentarios: valores.otros_comentarios,
            tecnico_fijo_actual: valores.tecnico_fijo_actual,
            tecnico_fijo_requerido: valores.tecnico_fijo_requerido,
            tecnico_fijo_comentarios: valores.tecnico_fijo_comentarios,
            tecnico_zona_actual: valores.tecnico_zona_actual,
            tecnico_zona_requerido: valores.tecnico_zona_requerido,
            tecnico_zona_comentarios: valores.tecnico_zona_comentarios,
            tecnico_ruta_actual: valores.tecnico_ruta_actual,
            tecnico_ruta_requerido: valores.tecnico_ruta_requerido,
            tecnico_ruta_comentarios: valores.tecnico_ruta_comentarios,
            distancia_tecnico_actual: valores.distancia_tecnico_actual,
            distancia_tecnico_requerido: valores.distancia_tecnico_requerido,
            distancia_tecnico_comentarios:
              valores.distancia_tecnico_comentarios,
            frecuencia_aspersion_actual: valores.frecuencia_aspersion_actual,
            frecuencia_aspersion_requerido:
              valores.frecuencia_aspersion_requerido,
            frecuencia_aspersion_comentarios:
              valores.frecuencia_aspersion_comentarios,
            frecuencia_nebulizacion_actual:
              valores.frecuencia_nebulizacion_actual,
            frecuencia_nebulizacion_requerido:
              valores.frecuencia_nebulizacion_requerido,
            frecuencia_nebulizacion_comentaros:
              valores.frecuencia_nebulizacion_comentaros,
            frecuencia_termo_actual: valores.frecuencia_termo_actual,
            frecuencia_termo_requerido: valores.frecuencia_termo_requerido,
            frecuencia_termo_comentarios: valores.frecuencia_termo_comentarios,
            tratamiento_unidades_actual: valores.tratamiento_unidades_actual,
            tratamiento_unidades_requerido:
              valores.tratamiento_unidades_requerido,
            tratamiento_unidades_comentarios:
              valores.tratamiento_unidades_comentarios,
            tratamiento_tarimas_actual: valores.tratamiento_tarimas_actual,
            tratamiento_tarimas_requerido:
              valores.tratamiento_tarimas_requerido,
            tratamiento_tarimas_comentarios:
              valores.tratamiento_tarimas_comentarios,
            equipo_comodato_actual: valores.equipo_comodato_actual,
            equipo_comodato_requerido: valores.equipo_comodato_requerido,
            equipo_comodato_comentarios: valores.equipo_comodato_comentarios,
            equipo_propio_actual: valores.equipo_propio_actual,
            equipo_propio_requerido: valores.equipo_propio_requerido,
            equipo_propio_comentarios: valores.equipo_propio_comentarios,
            tratamiento_drenaje_actual: valores.tratamiento_drenaje_actual,
            tratamiento_drenaje_requerido:
              valores.tratamiento_drenaje_requerido,
            tratamiento_drenaje_comentarios:
              valores.tratamiento_drenaje_comentarios,
            malla: valores.malla,
            pared: valores.pared,
            varillas_anclar: valores.varillas_anclar,
            tipo_superficie: valores.tipo_superficie,
            tipo_instalacion: valores.tipo_instalacion,
            proveedor_actual: valores.proveedor_actual,
            comentarios_generales: valores.comentarios_generales,
          };
          const dataapro = {
            planta: data.planta,
            apro_nombre: data.nombre_empresa,
            apro_asesor: data.asesor_asignado,
            apro_estatus: "Abierto",
          };
          const urlEdita = `http://192.168.1.47:5000/api/formlevantamiento/${data.planta}`;
          const urlApro = "http://192.168.1.47:5000/api/kds_aprobaciones";

          try {
            const insercion = axios.put(urlEdita, editaFormLev).then((res) => {
              if (res.status === 200 || res.status === 201) {
                MySwal.fire({
                  icon: "success",
                  title: "¡Registros Enviados de manera correcta!",
                  showConfirmButton: false,
                  timer: 2000,
                });
                console.log(res);
                var datos = data.planta;
                var index = dataApro.findIndex((item) => item.planta === datos);
                if (index === -1) {
                  const insercionapro = axios
                    .post(urlApro, dataapro)
                    .then((res) => {});
                } else {
                  var validate = dataApro[index].planta;
                  console.log(validate);
                }

                mvgridlev();
              }
              if (res.status === 400) {
                MySwal.fire({
                  icon: "error",
                  title: "no se enviaron los datos",
                  showConfirmButton: false,
                  timer: 2000,
                });
                window.location.reload();
              }
            });

            /*if (insercion.status === 200 ) {
                            MySwal.fire({
                                icon: 'success',
                                title: '¡Registros Enviados de manera correcta!',
                                showConfirmButton: false,
                                timer: 2000
                              })
                              mvgridlev();
                        } if(insercion.status === 201){
                            MySwal.fire({
                                icon: 'success',
                                title: '¡Registros Enviados de manera correcta!',
                                showConfirmButton: false,
                                timer: 2000
                              })
                              mvgridlev();
                        } if(insercion.status > 300) {
                            MySwal.fire({
                                icon: 'error',
                                title: 'no se enviaron los datos',
                                showConfirmButton: false,
                                timer: 2000
                              })
                        }else{
                            MySwal.fire({
                                icon: 'error',
                                title: 'no se enviaron los datos',
                                showConfirmButton: false,
                                timer: 2000
                              })
                        }*/
          } catch (error) {}
        }}
      >
        {({ handleChange, values, handleSubmit, handleBlur }) => (
          <div className="containerflevantamiento">
            <form className="formulario" onSubmit={handleSubmit}>
              <Tabs className="TabNav" value={value} onChange={handleTabs}>
                <Tab
                  className="TabClass"
                  label="DGE"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="REG"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="REC"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="REC"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="RPP"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="TEC"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="RCL"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="MAM"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="LOT"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="IEP"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="RIN"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
                <Tab
                  className="TabClass"
                  label="CFI"
                  style={{ minWidth: "8.33%", maxWidth: "8.33%" }}
                />
              </Tabs>
              <TapPanel value={value} index={0}>
                <div className="tdatgen">
                  <label> DATOS GENERALES.</label>
                </div>
                <div className="unolef">
                  <div>
                  <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="fecha_levantamiento"
                      id="fecha_levantamiento"
                      value={values.fecha_levantamiento}
                      label="nombre del Contacto:"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      ariant="outlined"
                    />
                    {/*<LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                      defaultValue={dayjs(datetime)}
                        sx={{ width: "80%", marginTop: "10px" }}
                        label="Fecha de Levantamiento"
                        onChange={(e) => {
                          setDate(e);
                        }}
                        format="YYYY-MM-DD"
                        value={values.Cdate}
                      />
                    </LocalizationProvider>*/}
                    {/*<TextField sx={{ width: "80%", marginTop: "10px" }} 

                                        onChange={handleChange}
                                        dateFormat="yyyy-MM-dd"
                                        value={values.fecha_levantamiento}
                                        name='fecha_levantamiento'
                                        id='fecha_levantamiento'
                                        label="Ingrese la Fecha Formato Año/Mes/Dia"
                               />*/}
                  </div>

                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="nombre_contacto"
                      id="nombre_contacto"
                      value={values.nombre_contacto}
                      label="nombre del Contacto:"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      ariant="outlined"
                    />
                    {/*<TextField sx={{ width: "80%", marginTop: "10px" }} 
                                        name='nombre_contacto'
                                        id='nombre_contacto'
                                        value={values.nombre_contacto}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        label="nombre del Contacto"
                                    />*/}
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="nombre_empresa"
                      id="nombre_empresa"
                      setValue={data.nombre_empresa}
                      value={values.nombre_empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="nombre de la Empresa"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="direccion_empresa"
                      id="direccion_empresa"
                      value={values.direccion_empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Dirección de la Empresa"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="ubicacion"
                      id="ubicacion"
                      value={values.ubicacion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Ubicación"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="contacto_comercial"
                      id="contacto_comercial"
                      value={values.contacto_comercial}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Contacto Comercial"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="mail_comercial"
                      id="mail_comercial"
                      value={values.mail_comercial}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label=" Mail Comercial"
                    />
                  </div>
                </div>
                <div className="unoraigh">
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="telefono_comercial"
                      id="telefono_comercial"
                      value={values.telefono_comercial}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Teléfono Comercial"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="contacto_calidad"
                      id="contacto_calidad"
                      value={values.contacto_calidad}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Contacto Calidad"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      id="mail_calidad"
                      name="mail_calidad"
                      value={values.mail_calidad}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Mail Calidad"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="telefono_calidad"
                      id="telefono_calidad"
                      value={values.telefono_calidad}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Teléfono Calidad"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="giro_empresa"
                      id="giro_empresa"
                      value={values.giro_empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Giro de la Empresa"
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "80%", marginTop: "10px" }}
                      name="actividad_empresa"
                      id="actividad_empresa"
                      value={values.actividad_empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      label="Actividad de la Empresa"
                    />
                  </div>
                </div>
              </TapPanel>
              <TapPanel value={value} index={1}>
                <div className="treqgen">
                  <label> REQUERIMIENTOS GENERALES.</label>
                </div>
                <div className="unolef">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Existen requerimientos en su programa de seguridad e
                      higiene que deberíamos observar?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="programa_seguridad"
                      id="programa_seguridad"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.programa_seguridad}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="comentario_programa"
                    value={values.comentario_programa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />

                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Existe algún requerimiento de la secretaría de salubridad
                      de la localidad que deberíamos observar?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="requerimiento_salubridad"
                      id="requerimiento_salubridad"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.requerimiento_salubridad}
                    >
                      <FormControlLabel
                        value="SI"
                        control={<Radio />}
                        label="SI"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="comentario_salubridad"
                    value={values.comentario_salubridad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
                <div className="unoraigh">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Qué normas sanitarias tienen que cumplir?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="normas_sanitarias"
                      value={values.normas_sanitarias}
                      id="normas_sanitarias"
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="comentario_nsanitarias"
                    value={values.comentario_nsanitarias}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
              </TapPanel>
              <TapPanel value={value} index={2}>
                <div className="treqgen">
                  <label>REQUERIMIENTOS ESPECÍFICOS DEL CLIENTE</label>
                </div>
                <div className="treslef">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      {" "}
                      ¿Se identifico el tipo de plaga que pudiera generar un
                      conflicto en planta?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      id="identifica_plaga"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="identifica_plaga"
                      value={values.identifica_plaga}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>

                  <label className="labelform">
                    Si R=SI Especificar el tipo de plaga
                  </label>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Fauna Doméstica
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      id="fauna_domestica"
                      value={values.fauna_domestica}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="fauna_domestica"
                    >
                      <FormControlLabel
                        value="SI"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_domestica"
                    value={values.tipo_domestica}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Fauna Silvestre
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="fauna_silvestre"
                      id="fauna_silvestre"
                      value={values.fauna_silvestre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_silvestre"
                    value={values.tipo_silvestre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />

                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Insectos Voladores
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="insectos_voladores"
                      id="insectos_voladores"
                      value={values.insectos_voladores}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_voladores"
                    value={values.tipo_voladores}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />

                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Insectos Rastreros
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="insectos_rastreros"
                      id="insectos_rastreros"
                      value={values.insectos_rastreros}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_rastreros"
                    value={values.tipo_rastreros}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
                <div className="tresraigh">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Fauna Aviar
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="fauna_aviar"
                      id="fauna_aviar"
                      value={values.fauna_aviar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_aviar"
                    value={values.tipo_aviar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿El problema de aves lo soucionamos con la desornitación o
                      se requiere un plan especifico?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="desornitacion"
                      id="desornitacion"
                      value={values.desornitacion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="comentario_desornitacion"
                    value={values.comentario_desornitacion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />

                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gorgojo
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="gorgojo"
                      id="gorgojo"
                      value={values.gorgojo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="comentario_gorgojo"
                    value={values.comentario_gorgojo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />

                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Roedores / Rata
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="roedores"
                      id="roedores"
                      value={values.roedores}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="comentario_roedor"
                    value={values.comentario_roedor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
              </TapPanel>
              <TapPanel value={value} index={3}>
                <div className="treqgen">
                  <label>REQUERIMIENTOS ESPECÍFICOS DEL CLIENTE</label>
                </div>
                <div className="cuatrolef">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Tiene identificadas las áreas conflictivas de la empresa
                      en relación al control de plagas?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="areas_conflictivas"
                      id="areas_conflictivas"
                      value={values.areas_conflictivas}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_area"
                    value={values.tipo_area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />

                  <label className="labelform">
                    si R= SI Especifica el tipo de plaga.
                  </label>
                  <label className="labelform">
                    Alguna de las siguientes zonas, tiene conflicto de Plaga{" "}
                  </label>

                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Escaleras
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="escaleras"
                      id="escaleras"
                      value={values.escaleras}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_escalera"
                    value={values.tipo_escalera}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Azoteas
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="azoteas"
                      id="azoteas"
                      value={values.azoteas}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_azoteas"
                    value={values.tipo_azoteas}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Techos / Estructuras
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="techos"
                      id="techos"
                      value={values.techos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_techo"
                    value={values.tipo_techo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Pasillos / Recepción.
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="pasillos"
                      id="pasillos"
                      value={values.pasillos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_pasillo"
                    value={values.tipo_pasillo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Baños / Vestidores
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="banios"
                      id="banios"
                      value={values.banios}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_banio"
                    value={values.tipo_banio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Lockers
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="lockers"
                      id="lockers"
                      value={values.lockers}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_locker"
                    value={values.tipo_locker}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Lockers
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="andenes"
                      id="andenes"
                      value={values.andenes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_anden"
                    value={values.tipo_anden}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Rampas
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="rampas"
                      id="rampas"
                      value={values.rampas}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_rampa"
                    value={values.tipo_rampa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Área de Producción
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="areas_produccion"
                      id="areas_produccion"
                      value={values.areas_produccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_produccion"
                    value={values.tipo_produccion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Áreas Verdes / Estacionamiento / Vigilancia
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="areas_verdes"
                      id="areas_verdes"
                      value={values.areas_verdes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_verdes"
                    value={values.tipo_verdes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Comedores / Cocina.
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="comedores"
                      id="comedores"
                      value={values.comedores}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_comedores"
                    value={values.tipo_comedores}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Oficinas / Salas de Juntas
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="oficinas"
                      id="oficinas"
                      value={values.oficinas}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_oficina"
                    value={values.tipo_oficina}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Almácen, Materías primas
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="almacen_mp"
                      id="almacen_mp"
                      value={values.almacen_mp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_almacenmp"
                    value={values.tipo_almacenmp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
                <div className="cuatroraigh">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Almácen, Producto Terminado
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="almacen_pt"
                      id="almacen_pt"
                      value={values.almacen_pt}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_almacenpt"
                    value={values.tipo_almacenpt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Almácen, Material de Empaque
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="almacen_empaque"
                      id="almacen_empaque"
                      value={values.almacen_empaque}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_empaque"
                    value={values.tipo_empaque}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Planta Tratadora de Agua
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="tratadora_agua"
                      id="tratadora_agua"
                      value={values.tratadora_agua}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_tratadora"
                    value={values.tipo_tratadora}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Contenedores de Basura
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="contenedor_basura"
                      id="contenedor_basura"
                      value={values.contenedor_basura}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_contenedor"
                    value={values.tipo_contenedor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Silos
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="silos"
                      id="silos"
                      value={values.silos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_silos"
                    value={values.tipo_silos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Túneles Transportadores
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="tuneles"
                      id="tuneles"
                      value={values.tuneles}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_tuneles"
                    value={values.tipo_tuneles}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Bandas Transportadoras
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="bandas_transportadora"
                      id="bandas_transportadora"
                      value={
                        values.requebandas_transportadorarimiento_salubridad
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_trasportadora"
                    value={values.tipo_trasportadora}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Unidades de Reparto
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="unidades_reparto"
                      id="unidades_reparto"
                      value={values.unidades_reparto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_unidades"
                    value={values.tipo_unidades}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Tarimas
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="tarimas"
                      id="tarimas"
                      value={values.tarimas}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_tarimas"
                    value={values.tipo_tarimas}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Talleres
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="talleres"
                      id="talleres"
                      value={values.talleres}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_talleres"
                    value={values.tipo_talleres}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Camáras de Refrigeración
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="camaras_refrigeracion"
                      id="camaras_refrigeracion"
                      value={values.camaras_refrigeracion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_camaras"
                    value={values.tipo_camaras}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Producto no Conforme / Devoluciones
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="producto_noconforme"
                      id="producto_noconforme"
                      value={values.producto_noconforme}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_noconforme"
                    value={values.tipo_noconforme}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Otros, Especificar…
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="otros_especificar"
                      id="otros_especificar"
                      value={values.otros_especificar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_otros"
                    value={values.tipo_otros}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Bajo qué lineamientos son auditados?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="lineamientos_auditados"
                      id="lineamientos_auditados"
                      value={values.lineamientos_auditados}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="AIB"
                        control={<Radio />}
                        label="AIB"
                      />
                      <FormControlLabel
                        value="BRC"
                        control={<Radio />}
                        label="BRC"
                      />
                      <FormControlLabel
                        value="SQF"
                        control={<Radio />}
                        label="SQF"
                      />
                      <FormControlLabel
                        value="ISO"
                        control={<Radio />}
                        label="ISO"
                      />
                      <FormControlLabel
                        value="OTROS"
                        control={<Radio />}
                        label="OTROS"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_auditados"
                    value={values.tipo_auditados}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                </div>
              </TapPanel>
              <TapPanel value={value} index={4}>
                <div className="treqgen">
                  <label>RIESGOS Y PELIGROS EN PLANTA</label>
                </div>
                <div className="cincocontainer">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿El Personal que labora en Planta cuenta con programas de
                      formación y desarrollo para el Manejo Integrado de Plagas?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="programas_formacion"
                      id="programas_formacion"
                      value={values.programas_formacion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Se cuenta con programas de Mantenimiento o Limpieza?
                      (PLAN MAESTRO)
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="programas_mantto"
                      id="programas_mantto"
                      value={values.programas_mantto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="area_oportunidad"
                    value={values.area_oportunidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Se cuenta con programas de pre-requisitos de
                      almacenamiento de producto?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="programas_almacenamiento"
                      id="programas_almacenamiento"
                      value={values.programas_almacenamiento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="detalle_programa"
                    value={values.detalle_programa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Las condiciones de INFRAESTRUCTURA, están diseñadas para
                      el buen Manejo Integrado de Plagas?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="infraestructura"
                      id="infraestructura"
                      value={values.infraestructura}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="zonas_mantto"
                    value={values.zonas_mantto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
              </TapPanel>
              <TapPanel value={value} index={5}>
                <div className="treqgen">
                  <label>
                    ¿Los técnicos / instaladores deben de cumplir con requisitos
                    específicos para su ingreso? Como los siguientes
                  </label>
                </div>
                <div className="seislef">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Equipo de comunicación específico
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="equipo_comunicacion"
                      id="equipo_comunicacion"
                      value={values.equipo_comunicacion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_equipo"
                    value={values.tipo_equipo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Equipo de protección personal
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="equipo_epp"
                      id="equipo_epp"
                      value={values.equipo_epp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_epp"
                    value={values.tipo_epp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Procedimiento de acceso interno
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="acceso_interno"
                      id="acceso_interno"
                      value={values.acceso_interno}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_acceso"
                    value={values.tipo_acceso}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Horarios específicos
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="horarios"
                      id="horarios"
                      value={values.horarios}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_horario"
                    value={values.tipo_horario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Exámenes médicos (¿Cuáles?)
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="examenes_medicos"
                      id="examenes_medicos"
                      value={values.examenes_medicos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_examenmedico"
                    value={values.tipo_examenmedico}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Frecuencia de exámenes
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="frecuencia_examen"
                      id="frecuencia_examen"
                      value={values.frecuencia_examen}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_frecuencia"
                    value={values.tipo_frecuencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Carta de antecedentes no penales
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="carta_antecedentes"
                      id="carta_antecedentes"
                      value={values.carta_antecedentes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_carta"
                    value={values.tipo_carta}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                </div>
                <div className="seisrigth">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Afiliación al IMSS
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="imss"
                      id="imss"
                      value={values.imss}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="documento_imss"
                    value={values.documento_imss}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Credenciales de identificación
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="credencial_identificacion"
                      id="credencial_identificacion"
                      value={values.credencial_identificacion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_identificacion"
                    value={values.tipo_identificacion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Existen días especificos para capacitación?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="dias_capacitacion"
                      id="dias_capacitacion"
                      value={values.dias_capacitacion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_dias"
                    value={values.tipo_dias}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Capacitación por parte de la empresa
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="capacitacion_empresa"
                      id="capacitacion_empresa"
                      value={values.capacitacion_empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_capacitacionemp"
                    value={values.tipo_capacitacionemp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Planeación de visitas (días específicos)
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="planeacion_visitas"
                      id="planeacion_visitas"
                      value={values.planeacion_visitas}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_planeacion"
                    value={values.tipo_planeacion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      DC-3
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="dc3"
                      id="dc3"
                      value={values.dc3}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_dc3"
                    value={values.tipo_dc3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Hay alguna zona asignada a plagas para el resguardo de
                      equipos?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="resguardo_equipos"
                      id="resguardo_equipos"
                      value={values.resguardo_equipos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="zona_resguardo"
                    value={values.zona_resguardo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                </div>
              </TapPanel>
              <TapPanel value={value} index={6}>
                <div className="treqgen">
                  <label>REQUERIMIENTOS COMERCIALES Y LEGALES</label>
                </div>
                <div className="sietelef">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Orden de compra
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="orden_compra"
                      id="orden_compra"
                      value={values.orden_compra}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="oc_comentario"
                    value={values.oc_comentario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Contrato / Propuesta Firmada
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="contrato"
                      id="contrato"
                      value={values.contrato}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="contrato_comentario"
                    value={values.contrato_comentario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Periodo del Servicio contratado.(Indicar la cantidad de
                      meses del contrato)
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="servicio_contratado"
                      id="servicio_contratado"
                      value={values.servicio_contratado}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="periodo_comentario"
                    value={values.periodo_comentario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Entrega de Carpeta física
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="carpeta_fisica"
                      id="carpeta_fisica"
                      value={values.carpeta_fisica}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="fisica_comentario"
                    value={values.fisica_comentario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
                <div className="sieteright">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Entrega de carpeta digital
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="carpeta_digital"
                      id="carpeta_digital"
                      value={values.carpeta_digital}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="digital_comentario"
                    value={values.digital_comentario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Se requiere el pago por uso de portal para factura?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="portal_factura"
                      id="portal_factura"
                      value={values.portal_factura}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="portal_comentario"
                    value={values.portal_comentario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Se requiere alguna fianza?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="fianza"
                      id="fianza"
                      value={values.fianza}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="fianza_comentario"
                    value={values.fianza_comentario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
              </TapPanel>
              <TapPanel value={value} index={7}>
                <div className="treqgen">
                  <label>MEDIO AMBIENTE</label>
                </div>
                <div className="ochocontainer">
                  <FormLabel id="demo-radio-buttons-group-label">
                    ¿Cuál es la estacionalidad de plagas de la región?
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="plagas_region"
                    value={values.plagas_region}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Colindancia (Frente, Posterior, Izquierda, Derecha, Arriba
                    de, Debajo de)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="colindancia"
                    value={values.colindancia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                </div>
              </TapPanel>
              <TapPanel value={value} index={8}>
                <div className="treqgen">
                  <label>LAY OUT / MEDIDAS</label>
                </div>

                <div className="nuevecontainer">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      ¿Lay Out proporcionado por el cliente?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="layout_cliente"
                      id="layout_cliente"
                      value={values.layout_cliente}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <a
                    href={data.urlimagen}
                    target="_blank"
                    style={{
                      width: "80%",
                      marginTop: "10px",
                      fontSize: "20px",
                    }}
                  >
                    URL Image
                  </a>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="m2_terreno"
                    id="m2_terreno"
                    value={values.m2_terreno}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Indicar m2 del terreno"
                  />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="m2_construcion"
                    id="m2_construcion"
                    value={values.m2_construcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Indicar m2 de la construcción"
                  />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="m3"
                    id="m3"
                    value={values.m3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Indicar m3"
                  />
                </div>
              </TapPanel>
              <TapPanel value={value} index={9}>
                <div className="treqgen">
                  <label>INFORMACIÓN PARA ELABORAR PROPUESTA</label>
                </div>

                <div className="diezlef">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Cebaderos A
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="cebadero_a_actual"
                    id="cebadero_a_actual"
                    value={values.cebadero_a_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Cebaderos Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="cebadero_a_requerido"
                    id="cebadero_a_requerido"
                    value={values.cebadero_a_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Cebaderos requeridos"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="cebadero_a_comentarios"
                    value={values.cebadero_a_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Cebaderos B
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="cebadero_b_actual"
                    id="cebadero_b_actual"
                    value={values.cebadero_b_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Cebadero B Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="cebadero_b_requerido"
                    id="cebadero_b_requerido"
                    value={values.cebadero_b_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Cebadero B Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="cebadero_b_comentarios"
                    value={values.cebadero_b_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Mecanicas C
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="mecanicas_c_actual"
                    id="mecanicas_c_actual"
                    value={values.mecanicas_c_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Mecanica C Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="mecanicas_c_requerido"
                    id="mecanicas_c_requerido"
                    value={values.mecanicas_c_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Mecanica C Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="trapper"
                    value={values.trapper}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    type="text"
                    label="Trapper"
                  />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="metalicas"
                    id="metalicas"
                    value={values.metalicas}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Metalicas"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    T-REX
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="trex_actual"
                    id="trex_actual"
                    value={values.trex_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="T-REX Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="trex_requerido"
                    id="trex_requerido"
                    value={values.trex_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="T-REX Requeridas"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="trex_comentarios"
                    value={values.trex_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-multiline-flexible"
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gomas para roedor
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="gomasroedor_actual"
                    id="gomasroedor_actual"
                    value={values.gomasroedor_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Gomas para Roedor Actaul"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="gomasroedor_requerido"
                    id="gomasroedor_requerido"
                    value={values.gomasroedor_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Gomas para Roedor Requeridas"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="gomasroedor_comentarios"
                    value={values.gomasroedor_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gomas para insecto rastrero
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="gomasinsecto_actual"
                    id="gomasinsecto_actual"
                    value={values.gomasinsecto_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Gomas para insectos actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="gomasinsecto_requerido"
                    id="gomasinsecto_requerido"
                    value={values.gomasinsecto_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Gomas para insecto requeridas"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="gomasinsecto_comentarios"
                    value={values.gomasinsecto_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">LLN</FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="lln_actual"
                    id="lln_actual"
                    value={values.lln_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="LLN Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="lln_requerido"
                    id="lln_requerido"
                    value={values.lln_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="LLN Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="lln_comentarios"
                    value={values.lln_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Electrocutadores
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="electrocutadores_actual"
                    id="electrocutadores_actual"
                    value={values.electrocutadores_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="electrocutadores Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="electrocutadores_requerdio"
                    id="electrocutadores_requerdio"
                    value={values.electrocutadores_requerdio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Electrocutadores Requeridos"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="electrocutadores_comentarios"
                    value={values.electrocutadores_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Dispensadores
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="dispensadores_actual"
                    id="dispensadores_actual"
                    value={values.dispensadores_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Dispensadores Actuales"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="dispensadores_requerido"
                    id="dispensadores_requerido"
                    value={values.dispensadores_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Dispensadores Requeridos"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="dispensadores_comentarios"
                    value={values.dispensadores_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                </div>
                <div className="diezmid">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Jaulas (indicar especie)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="jaulas_actual"
                    id="jaulas_actual"
                    value={values.jaulas_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Jaulas Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="jaulas_requerido"
                    id="jaulas_requerido"
                    value={values.jaulas_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Jaulas Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="jaulas_comentarios"
                    id="jaulas_comentarios"
                    value={values.jaulas_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Bebederos (indicar especie)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="bebederos_actual"
                    id="bebederos_actual"
                    value={values.bebederos_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Bebederos Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="bebederos_requerido"
                    id="bebederos_requerido"
                    value={values.bebederos_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Bebederos Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="bebederos_comentarios"
                    id="bebederos_comentarios"
                    value={values.bebederos_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Feromonas (Indicar tipo y si incluye Domo)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="feromonas_actual"
                    id="feromonas_actual"
                    value={values.feromonas_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Feromonas Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="feromonas_requerido"
                    id="feromonas_requerido"
                    value={values.feromonas_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Feromonas Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="feromonas_comentarios"
                    id="feromonas_comentarios"
                    value={values.feromonas_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Tratamiento para Mosca.(Cubeta / Bolsa) (indicar periodo de
                    cambio de atrayente)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_mosca_actual"
                    id="tratamiento_mosca_actual"
                    value={values.tratamiento_mosca_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tratamientos Moscas Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_mosca_requerido"
                    id="tratamiento_mosca_requerido"
                    value={values.tratamiento_mosca_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tratamiento Moscas Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_mosca_comentarios"
                    id="tratamiento_mosca_comentarios"
                    value={values.tratamiento_mosca_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Otros (indicar producto)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="otros_actual"
                    id="otros_actual"
                    value={values.otros_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Otros Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="otros_requerido"
                    id="otros_requerido"
                    value={values.otros_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Otros Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="otros_comentarios"
                    id="otros_comentarios"
                    value={values.otros_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    ¿Se requiere técnico Fijo?. (Indicar horario y jornada)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_fijo_actual"
                    id="tecnico_fijo_actual"
                    value={values.tecnico_fijo_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tecnico Fijo Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_fijo_requerido"
                    id="tecnico_fijo_requerido"
                    value={values.tecnico_fijo_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tecnico Fijo Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_fijo_comentarios"
                    id="tecnico_fijo_comentarios"
                    value={values.tecnico_fijo_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Salario del técnico de zona. (Revisar con RH)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_zona_actual"
                    id="tecnico_zona_actual"
                    value={values.tecnico_zona_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tecnico Zona Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_zona_requerido"
                    id="tecnico_zona_requerido"
                    value={values.tecnico_zona_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tecnico Zona Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_zona_comentarios"
                    id="tecnico_zona_comentarios"
                    value={values.tecnico_zona_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Frecuencia de visita Técnico de Ruta
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_ruta_actual"
                    id="tecnico_ruta_actual"
                    value={values.tecnico_ruta_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tecnico Ruta Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_ruta_requerido"
                    id="tecnico_ruta_requerido"
                    value={values.tecnico_ruta_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tecnico Ruta Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tecnico_ruta_comentarios"
                    id="tecnico_ruta_comentarios"
                    value={values.tecnico_ruta_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Distancia (en km) entre el técnico más cercano y las
                    instalaciones del cliente (Revisar con Operaciones)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="distancia_tecnico_actual"
                    id="distancia_tecnico_actual"
                    value={values.distancia_tecnico_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Distancia Tecnico Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="distancia_tecnico_requerido"
                    id="distancia_tecnico_requerido"
                    value={values.distancia_tecnico_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Distancia Tecnico Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="distancia_tecnico_comentarios"
                    id="distancia_tecnico_comentarios"
                    value={values.distancia_tecnico_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                </div>
                <div className="diezright">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Frecuencia de Aspersiones(Indicar m2 de las zonas a aplicar)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_aspersion_actual"
                    id="frecuencia_aspersion_actual"
                    value={values.frecuencia_aspersion_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Frecuencia de Aspercion Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_aspersion_requerido"
                    id="frecuencia_aspersion_requerido"
                    value={values.frecuencia_aspersion_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Frecuencia de Aspercion Requerida"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_aspersion_comentarios"
                    id="frecuencia_aspersion_comentarios"
                    value={values.frecuencia_aspersion_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Frecuencia de Nebulizaciones (Indicar m3 de las zonas a
                    aplicar)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_nebulizacion_actual"
                    id="frecuencia_nebulizacion_actual"
                    value={values.frecuencia_nebulizacion_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Frecuencia Nebulizacion Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_nebulizacion_requerido"
                    id="frecuencia_nebulizacion_requerido"
                    value={values.frecuencia_nebulizacion_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Frecuencia Nebulizacion Requerida"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_nebulizacion_comentaros"
                    id="frecuencia_nebulizacion_comentaros"
                    value={values.frecuencia_nebulizacion_comentaros}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Frecuencia de Termonebulizaciones(Indicar m3 de las zonas a
                    aplicar)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_termo_actual"
                    id="frecuencia_termo_actual"
                    value={values.frecuencia_termo_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Frecuencia Termo Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_termo_requerido"
                    id="frecuencia_termo_requerido"
                    value={values.frecuencia_termo_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Frecuencia Termo Requerida"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="frecuencia_termo_comentarios"
                    id="frecuencia_termo_comentarios"
                    value={values.frecuencia_termo_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Tratamiento a Unidades.(Especificar total, tipo de Unidades,
                    frecuencia y tipo aplicación a realizar)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_unidades_actual"
                    id="tratamiento_unidades_actual"
                    value={values.tratamiento_unidades_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tratamiento Unidades Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_unidades_requerido"
                    id="tratamiento_unidades_requerido"
                    value={values.tratamiento_unidades_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tratamiento Unidades Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_unidades_comentarios"
                    id="tratamiento_unidades_comentarios"
                    value={values.tratamiento_unidades_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Tratamiento a Tarimas.(Especificar total de tarimas,
                    frecuencia y tipo aplicación)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_tarimas_actual"
                    id="tratamiento_tarimas_actual"
                    value={values.tratamiento_tarimas_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tratamiento Tarimas Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_tarimas_requerido"
                    id="tratamiento_tarimas_requerido"
                    value={values.tratamiento_tarimas_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tratamiento Tarimas Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_tarimas_comentarios"
                    id="tratamiento_tarimas_comentarios"
                    value={values.tratamiento_tarimas_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Equipos a comodato
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="equipo_comodato_actual"
                    id="equipo_comodato_actual"
                    value={values.equipo_comodato_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Equipo Acomodato Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="equipo_comodato_requerido"
                    id="equipo_comodato_requerido"
                    value={values.equipo_comodato_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Equipo Acomodato Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="equipo_comodato_comentarios"
                    id="equipo_comodato_comentarios"
                    value={values.equipo_comodato_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Equipos propiedad del cliente
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="equipo_propio_actual"
                    id="equipo_propio_actual"
                    value={values.equipo_propio_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Equipo propiedad Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="equipo_propio_requerido"
                    id="equipo_propio_requerido"
                    value={values.equipo_propio_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Equipo Propiedad Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="equipo_propio_comentarios"
                    id="equipo_propio_comentarios"
                    value={values.equipo_propio_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Tratamiento a drenajes (indicar frecuencia)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_drenaje_actual"
                    id="tratamiento_drenaje_actual"
                    value={values.tratamiento_drenaje_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tratamiento Drenajes Actual"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_drenaje_requerido"
                    id="tratamiento_drenaje_requerido"
                    value={values.tratamiento_drenaje_requerido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tratamiento Drenajes Requerido"
                  />
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tratamiento_drenaje_comentarios"
                    id="tratamiento_drenaje_comentarios"
                    value={values.tratamiento_drenaje_comentarios}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Comentarios"
                    multiline
                    maxRows={2}
                    disabled={false}
                    variant="filled"
                  />
                </div>
              </TapPanel>
              <TapPanel value={value} index={10}>
                <div className="treqgen">
                  <label>REQUERIMIENTOS PARA INSTALACIONES</label>
                </div>

                <div className="oncelef">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Cantidad de Localizadores
                  </FormLabel>
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    En malla
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="malla"
                    id="malla"
                    value={values.malla}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="En Malla"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    En pared
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="pared"
                    id="pared"
                    value={values.pared}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label=" En Pared"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Varillas para anclar
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="varillas_anclar"
                    id="varillas_anclar"
                    value={values.varillas_anclar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Varillas para Anclar"
                  />
                </div>
                <div className="oncemid">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Especificaciones para Instalar
                  </FormLabel>
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Tipo de Superficie.(Indicar si es, tierra, concreto, etc)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_superficie"
                    id="tipo_superficie"
                    value={values.tipo_superficie}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tipo Superficie"
                  />
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Tipo de Instalación.(Indicar la forma de ancar los equipos)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="tipo_instalacion"
                    id="tipo_instalacion"
                    value={values.tipo_instalacion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Tipo Instalacion"
                  />
                </div>

                <div className="onceright">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Datos Proveedor Actual
                  </FormLabel>
                  <br />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Proveedor Actual
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="proveedor_actual"
                    id="proveedor_actual"
                    value={values.proveedor_actual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    label="Proveedor Actual"
                  />
                </div>
              </TapPanel>
              <TapPanel value={value} index={11}>
                <div className="treqgen">
                  <label>COMENTARIOS</label>
                </div>

                <div className="docecontainer">
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ width: "20px" }}
                  >
                    Indicar información de reelevancia a considerar para
                    complementar el levantamiento (pertenece a un grupo, tiene
                    plantas o unidades de servicio adicionales, es un cliente al
                    que ya le damos servicio, es recomendación de un cliente
                    actual, etc)
                  </FormLabel>
                  <br />
                  <TextField
                    sx={{ width: "80%", marginTop: "10px" }}
                    name="comentarios_generales"
                    value={values.comentarios_generales}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="outlined-multiline-static"
                    label="C O M E N T A R I O S"
                    multiline
                    rows={8}
                    disabled={false}
                    variant="filled"
                  />

                  <br />
                  <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Enviar
                  </Button>
                </div>
              </TapPanel>

              {/*<h2> </h2>
                            <label className="labelform">{cookies.get('username')}</label>
                            */}
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
function TapPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
}

export default FormLevantamiento;
