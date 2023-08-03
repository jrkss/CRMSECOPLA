import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import Base64 from "base-64";
import moment from "moment";
import axios from "axios";
import "jspdf-autotable";

function UserCreate(props) {
  const id = props.id;

  console.log(id);

  const [data, setData] = useState([]);
  const [aprobacion, setAprobacion] = useState([]);
  const [tabthreebyplanta, setTabThreeByPlanta] = useState([]);
  const [tabtwobyplanta, setTabTwoByPlanta] = useState([]);
  const [tabfourbyplanta, setTabFourByPlanta] = useState([]);
  const [tabfivebyplanta, setTabFiveByPlanta] = useState([]);
  const [tabone, setTabOne] = useState([]);

  const PeticionGetAll = () => {
    const baseUrlG = `http://192.168.1.47:5000/api/formlevantamiento/${id}`;

    const baseAprobaciones = `https://localhost:7239/api/kds_aprobaciones/`;
    const basetabone = `https://localhost:7239/api/proecotabone/${id}`;

    const basetabThreeByPlanta = `https://localhost:7239/api/tabthreebyplanta/${id}`;
    const basetabTwoByPlanta = `https://localhost:7239/api/tabtwobyplanta/${id}`;
    const basetabFourByPlanta = `https://localhost:7239/api/tabfourbyplanta/${id}`;
    const basetabFiveByPlanta = `https://localhost:7239/api/tabfivebyplanta/${id}`;

    const getgridlev = axios.get(baseUrlG);
    const getApro = axios.get(baseAprobaciones);
    const getTabThreeByPlanta = axios.get(basetabThreeByPlanta);
    const getTabTwoByPlanta = axios.get(basetabTwoByPlanta);
    const getTabFourByPlanta = axios.get(basetabFourByPlanta);
    const getTabFiveByPlanta = axios.get(basetabFiveByPlanta);
    const getTabOne = axios.get(basetabone);

    axios
      .all([getgridlev, getApro, getTabThreeByPlanta, getTabTwoByPlanta,getTabFourByPlanta,getTabFiveByPlanta,getTabOne])
      .then(
        axios.spread((...allData) => {
          const datagridlev = allData[0].data;
          const dataApro = allData[1].data;
          const dataTabThreeByPlanta = allData[2].data;
          const dataTabTwoByPlanta = allData[3].data;
          const dataTabFourByPlanta = allData[4].data;
          const dataTabFiveByPlanta = allData[5].data;
          const dataTabOne = allData[5].data;
          setData(datagridlev);
          setAprobacion(dataApro);
          setTabThreeByPlanta(dataTabThreeByPlanta);
          setTabTwoByPlanta(dataTabTwoByPlanta);
          setTabFourByPlanta(dataTabFourByPlanta);
          setTabFiveByPlanta(dataTabFiveByPlanta);
          setTabOne(dataTabOne);
        })
      );
  };

  var datos = data.planta;
  var index = aprobacion.findIndex((item) => item.planta === datos);

  console.log(index);
  if (index === -1) {
    console.log("Datos aun no cargados");
  } else {
    var preciodata = aprobacion[index].apro_precio;
    var datetime = moment(aprobacion[index].apro_fecha).format("MM/DD/YYYY");
    var foliocot = aprobacion[index].apro_folio_cot;

    console.log(aprobacion[index].apro_precio);
  }
  console.log(foliocot);

  var datos = data.planta;
  const aprodataresult = aprobacion.filter(checkData);

  function checkData(aprodata) {
    return aprodata === "PL00001";
  }

  console.log(aprodataresult);

  useEffect(() => {
    PeticionGetAll();
  }, []);

  const generatePDF = () => {
    var img = new Image();
    var cebadero = new Image();
    var trapper = new Image();
    var metalica = new Image();
    var lln = new Image();
    var wats = new Image();
    var watts = new Image();

    const doc = new jsPDF();
    img.src = require("../images/logosecopla.png");
    cebadero.src = require("../images/cebadero.jpg");

    trapper.src = require("../images/edcmtrapper.jpg");
    metalica.src = require("../images/edcmmetalica.jpg");
    lln.src = require("../images/lln36wats.jpg");
    wats.src = require("../images/15watts.jpg");
    watts.src = require("../images/36watts.png");
    img.onload = () => {
      // cabecera del documento
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.text("DISEÑO DEL SERVICIO", 70, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 1", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Inicia el Documento
      doc.setFontSize(12);
      doc.text("Propuesta Comercial, Manejo Integrado de Plagas", 55, 40);
      //Ubicacion Fecha, num de cotizacion
      doc.setFontSize(9);

      doc.text(`${data.ubicacion}, a ${datetime}`, 140, 50);
      doc.setFontSize(9);
      doc.text(`Cotización: ${foliocot}`, 155, 54);

      //A quien correspoda
      var nombrecliente = data.nombre_empresa;
      console.log(nombrecliente);
      doc.setFont(undefined, "bold");
      doc.text(nombrecliente, 15, 64);
      var att = `${data.contacto_comercial}`;
      doc.setFont(undefined, "normal");
      doc.text(`Att´n: ${att}`, 15, 68);
      doc.text(`No. De Cliente:`, 15, 72);
      doc.text(`P R E S E N T E`, 15, 76);

      //Cuerpo del mensaje

      doc.text(
        `Servicios de Control de Plagas del Centro S.A de C.V (en adelante SECOPLA) hace patente su agradecimiento al considerar nuestro servicio profesional de Manejo Integrado de Plagas y a continuación, compartimos con usted nuestra propuesta Técnica-Comercial diseñada específicamente para sus instalaciones de ${nombrecliente}.`,
        15,
        85,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.text(
        `Esta propuesta, fue resultado de la inspección inicial en la que fueron consideradas las necesidades y características del área, así como lo tratamientos requeridos.`,
        15,
        100,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.text(
        `SECOPLA, es una empresa que se encuentra a la vanguardia en el Manejo Integrado de Plagas, enfocada principalmente a la industria de alimentos, áreas urbanas, doméstica y pecuaria. Así mismo, contamos con servicios complementarios como: mantenimiento a infraestructuras, jardinería, limpieza especializada, control aviar y tratamiento a granos almacenados, principalmente.`,
        15,
        110,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.text(
        `Nuestros servicios, son totalmente adaptables a Sistemas de Calidad y Normas Internaciones tales como: AIB, BRC, GFSI, FSSC 22000, IFS, SAGARPA, SILLIKER, SQF, USDA, YUM!, Secretaría de Salud, HACCP y a programas implementados sobre bioterrorismo, inocuidad alimentaria, trazabilidad y a cualquier organismo competente en sanidad de alimentos`,
        15,
        130,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.text(
        `Por favor, en caso de existir alguna duda o comentario respecto al contenido del presente documento, estamos para apoyarle.`,
        15,
        145,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer

      doc.addPage(); //Other Page

      //Header
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.text("DISEÑO DEL SERVICIO", 70, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 2", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      //Body

      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONTENIDO`, 110, 40, {
        maxWidth: 175,
        align: "center",
      });

      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(`1. PLAN DE TRABAJO.`, 15, 60, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFontSize(8);
      doc.text(`I. OBJETIVO`, 70, 70, {
        maxWidth: 80,
        align: "justify",
      });

      doc.setFontSize(8);
      doc.text(`II. PROGRAMA PREVENTIVO`, 70, 80, {
        maxWidth: 80,
        align: "justify",
      });
      doc.setFontSize(8);
      doc.text(
        `III. ANÁLISIS DE RIESGOS QUE PUEDEN SER EVITADOS CON LA IMPLEMENTACIÓN DEL PROGRAMA DE TRABAJO`,
        70,
        90,
        {
          maxWidth: 80,
          align: "justify",
        }
      );
      doc.setFontSize(8);
      doc.text(`IV. CONTROL DE ROEDORES`, 70, 100, {
        maxWidth: 80,
        align: "justify",
      });
      doc.setFontSize(8);
      doc.text(`V. CONTROL DE INSECTOS`, 70, 110, {
        maxWidth: 80,
        align: "justify",
      });
      doc.setFontSize(8);
      doc.text(`VI. PROGRAMA DE CAPACITACION`, 70, 120, {
        maxWidth: 80,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(`2. CONTROL ADMINISTRATIVO.`, 15, 140, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(`3. INFORME MENSUAL.`, 15, 160, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(`4. PROPUESTA ECONOMICA.`, 15, 180, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(`5. REQUERIMIENTOS ADICIONALES.`, 15, 200, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(`6. PROMESA DE SERVICIO.`, 15, 220, {
        maxWidth: 175,
        align: "justify",
      });

      //Body

      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer

      doc.addPage(); //Other Page
      //Header
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.text("DISEÑO DEL SERVICIO", 70, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 3", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      //Body
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`1. PLAN DE TRABAJO`, 110, 40, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(9);
      doc.text(`I OBJETIVO:`, 15, 50, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(
        `Mantener el nivel más bajo de población de plagas en las instalaciones para asegurar la sanidad de todo el proceso apoyándonos en el programa de Manejo Integrado de Plagas (MIP), Métodos Operativos, Prácticas de Limpieza, Programa de Mantenimiento Preventivo, Programa de Capacitación entre otros.`,
        15,
        55,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.setFontSize(9);
      doc.setFont(undefined, "bold");
      doc.text(`II.PROGRAMA PREVENTIVO:`, 15, 70, {
        maxWidth: 175,
        align: "justify",
      });

      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(
        `Este programa es un sistema que ajusta de manera periódica el MIP con el objetivo de enfocarnos a encontrar indicadores de riesgo que permitan el ingreso, refugio, desarrollo y proliferación de plagas que representen un riesgo en la seguridad de los alimentos. El programa se base fundamentalmente en la inspección de todo el entorno (dando prioridad a las áreas más importantes dentro del proceso) y se compone principalmente de:`,
        15,
        74,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(`a) Detección de indicadores de riesgo.`, 35, 92, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(`b) Control de indicadores de riesgo.`, 35, 97, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(`c) Seguimiento.`, 35, 102, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(
        `El programa es evaluado mensualmente para observar avances y resultados enfocándose en primera instancia en BMP’S, Programa de limpieza, Programa de mantenimiento de equipo y edificio, Rotación de inventario, Recepción de materia prima, Transportes, Puertas, Ventanas, Drenajes y Bajadas pluviales. `,
        15,
        107,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(
        `Los formatos que manejamos consideran un apartado de seguimiento con responsabilidad tanto para SECOPLA como para ALIMENTOS BOLONIA`,
        15,
        122,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.setFont(undefined, "bold");
      doc.setFontSize(9);
      doc.text(
        `III. ANÁLISIS DE RIESGOS QUE PUEDEN SER EVITADOS CON LA IMPLEMENTACIÓN DEL PROGRAMA DE TRABAJO`,
        15,
        135,
        {
          maxWidth: 175,
          align: "justify",
        }
      );

      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 140,
        head: [
          [
            "MODULO 1",
            "MANEJO Y PREVENCIÓN POR PARTE DEL CLIENTE",
            "PREVENCION Y CONTROL POR PARTE DE SECOPLA",
          ],
        ],
        body: [
          [
            "Exterior a prueba de insectos",
            "Techos y otras estructuras sin orificios, puertas de carga y descarga se mantendrán cerradas el mayor tiempo posible",
            "Aplicación de insecticidas residuales en grietas, marcos de puertas y en el perímetro de los inmuebles.",
          ],
          [
            "Exterior a prueba de roedores",
            "Paredes y pisos sin grietas sellado de orificios, cortinas de puertas que empalmen perfectamente con el piso, puertas de carga y descarga deberán mantenerse cerradas el mayor tiempo posible. ",
            "Disposición de estaciones de control en el perímetro de la planta con una separación de 15 a 30 metros a lo largo de las paredes. Se cerrarán las estaciones con llave. Se usarán cebos autorizados por EPA.",
          ],
          [
            "Oficinas administrativas",
            "Limpieza y orden del área. Evitar, documentos y cajas en el piso, alimentos y envolturas de alimentos fuera de área. Remoción regular de basura, especialmente si los desechos son orgánicos.",
            "Aplicación de insecticidas residuales de amplio espectro y monitoreo regular. Inspección para la detección de irregularidades y posibles focos de infestación.",
          ],
          [
            "Comedor",
            "Limpieza regular en mostradores y aparatos eléctricos. ",
            "Aplicación de insecticidas residuales y de expulsión en caso de ser necesario. Colocación de geles para el control de plagas asociadas con comedores (siempre y cuando se recomiende por parte de Secopla)",
          ],
          [
            "Áreas de subestación, calderas, servicios entre otras",
            "Evitar la acumulación de polvos. Trincheras deben de estar selladas.",
            "Cebado en trincheras y colocación de estaciones en el interior en caso de tener presencia de roedores. Aplicación de insecticidas residuales.",
          ],
          // ...
        ],
        styles: {
          fontSize: 9,
        },
      });

      //Body end

      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer

      doc.addPage(); //Next page
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.text("DISEÑO DEL SERVICIO", 70, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 4", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      //Body

      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 30,
        body: [
          [
            "Registros y Drenajes (tratamientos se cotizan por separado)",
            "Limpieza constante a registros, desazolve programado, tapas sin grietas y bien cerradas, y mallas tipo mosquitero.",
            "ratamiento con insecticidas residuales a las paredes de los registros y Termonebulización.",
          ],
          [
            "Control de invasores ocasionales (se cotizan por separado)",
            "En respuesta a lo establecido en la Norma 251 de SSA, no deben existir mascotas establecidas dentro de las instalaciones de la planta por higiene y seguridad de los productos manufacturados.",
            "Cuando se detecta la presencia de perros, gatos y algún otro mamífero menor, se instalan trampas mecánicas con una carnada para atraerlos, capturarlos y reubicarlos en un sitio alejado.",
          ],
          [
            "",
            "Limpieza y orden del área. Evitar, documentos y cajas en el piso, alimentos y envolturas de alimentos fuera de área. Remoción regular de basura, especialmente si los desechos son orgánicos.",
            "Aplicación de insecticidas residuales de amplio espectro y monitoreo regular. Inspección para la detección de irregularidades y posibles focos de infestación.",
          ],
          [
            "Comedor",
            "Limpieza regular en mostradores y aparatos eléctricos. ",
            "Aplicación de insecticidas residuales y de expulsión en caso de ser necesario. Colocación de geles para el control de plagas asociadas con comedores (siempre y cuando se recomiende por parte de Secopla)",
          ],
          [
            "Áreas de subestación, calderas, servicios entre otras",
            "Evitar la acumulación de polvos. Trincheras deben de estar selladas.",
            "Cebado en trincheras y colocación de estaciones en el interior en caso de tener presencia de roedores. Aplicación de insecticidas residuales.",
          ],
          // ...
        ],
        styles: {
          fontSize: 9,
        },
      });

      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 140,
        head: [
          [
            "MODULO 2",
            "MANEJO Y PREVENCIÓN POR PARTE DEL CLIENTE",
            "PREVENCION Y CONTROL POR PARTE DE SECOPLA",
          ],
        ],
        body: [
          [
            "Recepción de materiales.",
            "Limpieza, orden y manejo de espacios.",
            "plicaciones de insecticidas residuales para la prevención de insectos rastreros. Colocación de estaciones de control de roedores.",
          ],
          [
            "Interior a prueba de roedores",
            "Equipos separados a 40 cm de la pared para facilitar la limpieza y el manejo de estaciones de control.",
            "Disposición de estaciones de control en el perímetro interior de la planta con una separación de 8 a 12 metros a lo largo de las paredes en almacenes y colocación de trampas mecánicas en los accesos. ",
          ],
          [
            "Interior a prueba de insectos",
            "Puertas de carga y descarga deben mantenerse cerradas el mayor tiempo posible, huecos y drenaje asegurados no sellados, evitar condensaciones y encharcamientos, facilidad de limpieza y buenas prácticas de almacenaje.",
            "Inspección y monitoreo regulares, aplicación de cordones perimetrales con insecticidas de baja residualidad, orgánicos y biodegradables y de amplio espectro de control contra insectos rastreros. Colocación de trampas de luz negra en puertas de accesos y áreas críticas o áreas no aptas para la aplicación de insecticidas. ",
          ],
          [
            "Almacén de Materia Prima.",
            "Mantener puertas cerradas el mayor tiempo posible, evitar acumulación de basura.",
            "Aplicación de insecticidas de amplio espectro y baja residualidad para evitar el ingreso de insectos, colocación de estaciones de control para evitar el ingreso de roedores. ",
          ],
          [
            "Producción",
            "Aplicación de las GMP´s en toda su extensión ",
            "Inspección y monitoreo rutinarios para detectar a tiempo cualquier foco de infestación. Aplicación focalizada de Piretrinas Naturales o insecticidas Piretroides autorizados.",
          ],
          [
            "Almacén de Producto Terminado",
            " Aplicación total de las buenas prácticas de almacenamiento, mantenimiento y limpieza constante",
            "Se mantendrán monitoreos constantes, inspección y tratamiento perimetral para evitar posibles infestaciones. Colocación y monitoreo de dispositivos de control.",
          ],
          // ...
        ],
        styles: {
          fontSize: 9,
        },
      });

      //Body End

      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer
      doc.addPage(); //Next page
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.text("DISEÑO DEL SERVICIO", 70, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 5", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      //Body

      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 30,
        body: [
          [
            "Registros en interior de la planta",
            "Evitar acumulaciones de materia orgánica y limpieza continua. ",
            "Aplicación de insecticidas de baja residualidad y monitoreo de acuerdo al programa de trabajo.",
          ],
          [
            "Baños y Vestidores ",
            "Adecuado para el número actual de empleados; instalaciones completas, drenaje con tapas, tapete sanitario, puerta de cerrado automático, ventilación adecuada y sin olores ofensivos.",
            "Aplicación de insecticidas de expulsión en drenaje; aplicación de insecticidas residuales en paredes.",
          ],
          [
            "Área de Basura.",
            "Contenedor de tamaño adecuado y cerrado, distancia considerable entre contenedor y la planta, la basura no debe permanecer en las instalaciones por más de 72 horas.",
            "Área resguardada por estaciones de control, monitoreo regular y se colocarán trampas para mosca (en caso de ser necesario). Se aplicará cebo mosquicida solo en caso de una infestación alta de moscas. La aplicación en el área de basura dependerá de la frecuencia en que el contenedor sea removido. ",
          ],

          // ...
        ],
        styles: {
          fontSize: 9,
        },
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`IV.CONTROL DE ROEDORES`, 15, 98, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(
        `El Manejo Integrado de Roedores, consiste en implementar cordones de seguridad de protección contra roedores, el cordón primario y el cordón secundario.`,
        15,
        103,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.setFont(undefined, "bold");
      doc.text(`* Cinturón A y B: Cordón externo.`, 35, 115, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.text(`o`, 40, 121, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `En cada estación de cebado se colocará cebo rodenticida anticoagulante de dosis única en diversas formulaciones de manera rotacional fijo al cebadero. En el área externa se cebarán madrigueras para bajar población. `,
        43,
        121,
        {
          maxWidth: 130,
          align: "justify",
        }
      );
      doc.text(`o`, 40, 133, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `Con las inspecciones realizadas de acuerdo al programa, se generará un reporte mensual con gráficas poblacionales y comparativos de ingesta o capturas para su respectivo análisis y seguimiento.`,
        43,
        133,
        {
          maxWidth: 130,
          align: "justify",
        }
      );
      doc.setFont(undefined, "bold");
      doc.text(`* Cinturón C: Cordón interno.`, 35, 149, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.text(`o`, 40, 154, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `En caso de que haya alguna captura en alguna trampa, ésta estará sujeta bajo un procedimiento de limpieza y desinfección para ser utilizada nuevamente.`,
        43,
        154,
        {
          maxWidth: 130,
          align: "justify",
        }
      );
      doc.text(
        `En cada dispositivo para el control de roedores se encontrará un registro de servicio y limpieza donde se especificará el producto utilizado (para el caso de cebaderos) y la fecha de inspección`,
        15,
        165,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      //Body end

      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer
      doc.addPage(); //Next page
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 6", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      //Body
      doc.setFont(undefined, "bold");

      doc.text(`V.CONTROL DE INSECTOS.`, 15, 45, {
        maxWidth: 175,
        align: "justify",
      });
      doc.text(`I. Control físico:`, 15, 51, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.text(
        `Mediante la inspección y basándonos en los resultados del análisis de riesgos se recomienda la colocación de barrearas físicas para excluir insectos rastreros y voladores. `,
        44,
        51,
        {
          maxWidth: 140,
          align: "justify",
        }
      );
      doc.setFont(undefined, "bold");
      doc.text(`II. Control mecánico:`, 15, 61, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.text(
        `Mediante el uso de trampas mecánicas con pegamento se capturan insectos rastreros y voladores.`,
        52,
        61,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.setFont(undefined, "bold");
      doc.text(`II. Control cultural:`, 15, 71, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.text(
        `Mediante la inspección y basándonos en los resultados del análisis de riesgo, se puede considerar elaborar un programa de capacitación al personal involucrado para darles a conocer la importancia de su participación en la prevención de control de plagas (validar en la promesa de servicio si este servicio generará costo adicional).
        `,
        52,
        71,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.setFont(undefined, "bold");
      doc.text(`II. Control químico:`, 15, 91, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.text(
        `De acuerdo al ciclo de vida del insecto, el control químico se programa de manera calendarizada y programada.`,
        52,
        91,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.text(`°`, 28, 102, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `Se realizarán aplicaciones generales con insecticidas piretroides residuales en superficies de paredes y pisos solo en las áreas donde no exista alimento, alrededor de puertas y otras entradas, así también en los perímetros exteriores de la construcción o bodega. `,
        32,
        102,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.text(`°`, 28, 120, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `Aplicaciones focalizadas a los lugares donde se establecieron las colonias de insectos, además se podrían utilizarán insecticidas en polvo que compitan con las condiciones de tierra y basura.`,
        32,
        120,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.text(`°`, 28, 134, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `Las grietas y hendiduras se tratarán con polvos humectables para mejorar la persistencia del insecticida y evitar nuevos establecimientos `,
        32,
        134,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.text(
        `Se realizará un mapa o plano actualizado donde se muestre la ubicación de cada dispositivo,diferenciando perfectamente el cordón primario del secundario. Cada dispositivo de control contará con un señalamiento de seguridad y numeración, con los siguientes datos: `,
        15,
        144,
        {
          maxWidth: 175,
          align: "justify",
        }
      );

      doc.text(`-`, 28, 160, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Número de estación.`, 32, 160, {
        maxWidth: 133,
        align: "justify",
      });

      doc.text(`-`, 28, 165, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Teléfonos de emergencias las 24 horas.`, 32, 165, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`-`, 28, 170, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `AMIPFAC: SINTOX (con atención de personal especialista).`,
        32,
        170,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.text(`-`, 28, 175, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Teléfonos de la empresa responsable del control. `, 32, 175, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`-`, 28, 180, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `Leyenda de seguridad para el caso de los cebaderos. `,
        32,
        180,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.setFont(undefined, "bold");
      doc.text(`VI. PROGRAMA DE CAPACITACIÓN`, 15, 190, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.text(
        `Proponemos un programa de capacitación, dirigido al personal involucrado en el programa de control de plagas y los temas propuestos son los siguientes: `,
        15,
        195,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.text(`-`, 28, 205, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(` Manejo Integrado de Plagas `, 32, 205, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`-`, 28, 210, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(` Control, Ciclo y hábitos de cucarachas `, 32, 210, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`-`, 28, 215, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Biología y Control de Roedores.`, 32, 215, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`-`, 28, 220, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(` Plagas de productos almacenados.`, 32, 220, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(
        `De estos temas, ustedes eligen el orden y las fechas para programarlo y documentarlo en la carpeta técnica. Los temas están sujetos a cambio de acuerdo a sus propias necesidades y se puede preparar cualquier otro tema de control de plagas. En caso de considerarlo necesario, solicite a su asesor comercial la cotización correspondiente. `,
        15,
        230,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      //Body End

      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer
      doc.addPage(); //Next page
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 7", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      //Body
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`2. CONTROL ADMINISTRATIVO`, 110, 35, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFont(undefined, "normal");
      doc.text(
        `La siguiente información es con la que debe contar la carpeta técnica y se debe de actualizar de manera periódica: `,
        15,
        45,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.text(`a.`, 28, 55, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`CV Secopla y Organigrama`, 32, 55, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`b.`, 28, 60, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(` Licencia Sanitaria`, 32, 60, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`c.`, 28, 65, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Certificados ISO 22000 y 9001`, 32, 65, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`d.`, 28, 70, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Seguro de Responsabilidad Civil`, 32, 70, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`e.`, 28, 75, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Listado 24 hrs`, 32, 75, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`f.`, 28, 80, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `Constancias de capacitación y Certificaciones del personal técnico`,
        32,
        80,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.text(`g.`, 28, 85, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Layout de los dispositivos `, 32, 85, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`h.`, 28, 90, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Programa de trabajo`, 32, 90, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`i.`, 28, 95, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Procedimientos Operativos Estandar`, 32, 95, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`j.`, 28, 100, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Listado y rotación de plaguicidas`, 32, 100, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`k.`, 28, 105, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Tabla de aplicación`, 32, 105, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`l.`, 28, 110, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Hojas de Seguridad de los productos a utilizar`, 32, 110, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`m.`, 28, 115, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(
        `Fichas técnicas y etiquetas de los productos a utilizar`,
        32,
        115,
        {
          maxWidth: 133,
          align: "justify",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`2. CONTROL ADMINISTRATIVO`, 110, 125, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFont(undefined, "normal");
      doc.text(
        `Se emitirá un reporte mensual que será entregado al responsable de sanidad de la planta para documentar los aspectos más importantes de los siguientes rubros:`,
        15,
        135,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.text(`1.`, 28, 145, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Control de insectos`, 32, 145, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`2.`, 28, 150, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Control de roedores.`, 32, 150, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`3.`, 28, 155, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Cordón primario y secundario`, 32, 155, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`4.`, 28, 160, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Equipos de luz para insectos voladores`, 32, 160, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(`5.`, 28, 165, {
        maxWidth: 130,
        align: "justify",
      });
      doc.text(`Seguimiento a eventos anteriores`, 32, 165, {
        maxWidth: 133,
        align: "justify",
      });
      doc.text(
        `La finalidad, es tener presentes los puntos de oportunidad para ajustar el programa de control de plagas continuamente. `,
        15,
        175,
        {
          maxWidth: 175,
          align: "justify",
        }
      );

      //Body End

      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer
      doc.addPage(); //Next page
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 8", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      //Body
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`4. PROPUESTA ECONÓMICA`, 110, 35, {
        maxWidth: 175,
        align: "center",
      });

      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 40,

        body: [
          ["Asignación de Equipos", "A comodato", `${tabone.pe_ae_acomodato}`],
          ["", "Propiedad del cliente", ""],
          ["Entrega de Carpeta", "Física", ""],
          ["", "Digital", "Si"],

          // ...
        ],
        styles: {
          fontSize: 9,
        },
        theme: "grid",
      });
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 70,
        body: [
          ["", "Full Time", ""],
          ["Técnico", "Part Time", ""],
          ["", "Asignado a Ruta", "Si"],

          // ...
        ],
        styles: {
          fontSize: 9,
        },
        theme: "grid",
      });

      //BodyEnd
      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer
      doc.addPage(); //Next page
      //////
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 8", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header
      let tabtwo = [];
      tabtwobyplanta.forEach((element, index, array) => {
        tabtwo.push([
          element.pe_taba_apli,
          element.pe_taba_prod,
          element.pe_taba_cant,
          element.pe_taba_area,
          element.pe_taba_tipofrec,
        ]);
      });
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 35,
        head: [
          [
            "Aplicaciones",
            "Producto",
            "Cantidad m2 / m3",
            "Area",
            "Frecuencia",
          ],
        ],
        body: tabtwo,
        styles: {
          fontSize: 9,
        },
        theme: "grid",
      });
      //BodyEnd
      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer
      doc.addPage(); //Next page
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 8", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      doc.autoTable({ html: "#my-table" });

      let info = [];
      tabthreebyplanta.forEach((element, index, array) => {
        info.push([
          element.pe_tabb_equip,
          element.pe_tabb_cant,
          element.pe_tabb_cinturon,
          element.pe_tabb_prod,
          element.pe_tabb_tipofrec,
        ]);
      });

      doc.autoTable({
        startY: 35,
        head: [
          ["Equipo", "Cantidad", "Distribucion", "Producto", "Revisiones"],
        ],
        body: info,
        styles: {
          fontSize: 9,
        },
        theme: "grid",
      });

      doc.addPage(); //Next page
      //////
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 8", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header
      let tabtabi = [];
      tabfourbyplanta.forEach((element, index, array) => {
        tabtabi.push([
          element.pe_tabc_servadic,
          element.pe_tabc_cantmen,
          element.pe_tabc_espe
        ]);
      });
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 35,
        head: [
          [
            "Servicios Adicionales",
            "Cantidad Mensual",
            "Especificaciones"
          ],
        ],
        body: tabtabi,
        styles: {
          fontSize: 9,
        },
        theme: "grid",
      });
      //BodyEnd
      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer
      doc.addPage(); //Next page
      //////
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 8", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header
      var precio = preciodata;
      var iva = precio * 0.16;
      var total = precio + iva;
      var conDecimal = total.toFixed(2);
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 35,
        head: [["Costo mensual", "IVA", "Costo total"]],

        body: [
          [`$ ${precio}`, `$ ${iva}`, `$ ${conDecimal}`],

          // ...
        ],
        styles: {
          fontSize: 9,
          align: "center",
        },
        theme: "grid",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(
        `Nota: La presente propuesta no contempla el control de aves (colocación de redes, puntas, gel y resortes), murciélagos, termitas, tratamiento a plagas de granos almacenados ni silos debido a que, al tratarse de métodos de control especializados, se cotizan por separado. De igual forma el servicio de identificación taxonómica de fauna nociva es un servicio independiente que se cotiza por separado. Para el caso de aves, sí incluye la remoción de nidos (máximo a 7 mtrs de altura) y recomendaciones estructurales de manera mensual.`,
        15,
        60,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(
        `El reemplazo de los focos de los equipos de Luz Negra y/o Electrocutadores, se realizará con cargo al servicio MIP ya que, al ser un consumible, no aplica el concepto a comodato.`,
        15,
        80,
        {
          maxWidth: 175,
          align: "justify",
        }
      );

      //BodyEnd
      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer
    
      
      doc.addPage(); //Next page
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 9", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header
      //Body

      doc.setFont(undefined, "bold");
      doc.text(`5. REQUERIMIENTOS ADICIONALES`, 110, 35, {
        maxWidth: 175,
        align: "center",
      });

      doc.setFont(undefined, "normal");
      let tabfive = [];
      tabfivebyplanta.forEach((element, index, array) => {
        tabfive.push([
          element.pe_tabd_solicitud,
          element.pe_tabd_yesno,
          element.pe_tabd_espe
        ]);
      });
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 40,
        head: [["Solicitud", "Si - No", "Especificaciones"]],
        body: tabfive,
        styles: {
          fontSize: 9,
          align: "center",
        },
        theme: "grid",
      });
      doc.text(
        `En caso de pérdida o daño, el costo de los equipos por reposición es el que se muestra en la siguiente tabla (precios sujetos a cambios):`,
        15,
        120,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 130,
        head: [["Equipo", "Imagen", "Costo + IVA"]],
        body: [
          [`Cebadero`, ` `, `$136.00`],
          [`Mecánica (metálica o trapper)`, ``, `$262.73`],
          [`Lámpara de Luz `, ``, `$3,585.00`],
          [`Focos 36 watts inastillables`, ``, `$657.80`],
          [`Focos 15 watts`, ``, `$390.00`],

          // ...
        ],
        styles: {
          fontSize: 9,
          align: "center",
        },
        columnStyles: {
          0: { cellWidth: 60, minCellHeight: 24 },
          1: { cellWidth: 80 },
          2: { cellWidth: 40 },
          // etc
        },
        theme: "grid",
      });

      doc.addImage(cebadero, "jpg", 95, 140, 40, 20);
      doc.addImage(trapper, "jpg", 82, 163, 30, 20);
      doc.addImage(metalica, "jpg", 117, 163, 30, 20);
      doc.addImage(lln, "jpg", 90, 187, 50, 20);
      doc.addImage(watts, "png", 90, 210, 50, 20);
      doc.addImage(wats, "jpg", 100, 235, 30, 20);

      //Body End
      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer

      doc.addPage(); //Next page
      //HEADER
      doc.setFont(undefined, "normal");
      doc.addImage(img, "png", 12, 10, 50, 15);
      doc.setFontSize(15);
      doc.text("DISEÑO DEL SERVICIO", 75, 20);
      doc.setFontSize(10);
      doc.text("Código: ISO-CO-005", 150, 10);
      doc.line(149, 11, 202, 11);
      doc.setFontSize(10);
      doc.text("Número de versión: 4", 150, 14);
      doc.line(149, 15, 202, 15);
      doc.setFontSize(10);
      doc.text("Fecha de creación: 12/05/2018", 150, 18);
      doc.line(149, 19, 202, 19);
      doc.setFontSize(10);
      doc.text("Fecha de revisión: 01/11/2021", 150, 22);
      doc.line(149, 23, 202, 23);
      doc.setFontSize(10);
      doc.text("Página: 9", 150, 26);
      doc.line(10, 28, 202, 28);
      doc.line(10, 5, 202, 5);
      doc.line(10, 28, 10, 5);
      doc.line(202, 5, 202, 28);
      doc.line(149, 5, 149, 28);
      doc.line(65, 5, 65, 28);
      //Header

      //Body
      doc.setFont(undefined, "bold");
      doc.text(`6. PROMESA DE SERVICIO`, 110, 35, {
        maxWidth: 175,
        align: "center",
      });
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 40,
        head: [
          [
            "Analisis de riesgo",
            "Respuesta a contingencias",
            "tiempo de instalacion(a partir de que se recibe la OC)",
            "Fisica",
            "Digital",
            "Apoyo en auditorias / visita supervisor de zona / Platicas de capacitacion",
            "Visitas gerente regional",
            "Visitas calidad",
            "Presentacion de resultado (Gte Regional)",
          ],
        ],
        body: [
          [
            `Solicitar Cotizacion`,
            `Dependera del tipo de contingencia, tiempo promedio 24hrs`,
            `10 dias naturales.`,
            `Cotizar por separado`,
            `Incluye`,
            `Cuatro eventos en total al año. El supervisor de Zona quien se encarga de atender estas solicitudes.`,
            `Se cotiza por separado`,
            `Anual`,
            `Se envia por correo previa renovacion de contrato`,
          ],
          // ...
        ],
        styles: {
          fontSize: 7,
          align: "center",
        },
        theme: "grid",
      });
      doc.setFont(undefined, "normal");
      doc.text(
        `Contamos con un Seguro de Responsabilidad Civil con una cobertura de hasta $20,000,000.00 para cubrir indemnizaciones y pérdidas.`,
        15,
        80,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.text(
        `Recuerde, nuestro objetivo es contribuir al mejoramiento de la calidad de vida de nuestros clientes, mediante la aplicación de medidas que mantengan los niveles más bajos de plagas. Por lo mismo, concédanos la importancia que su imagen y prestigio merecen. `,
        15,
        90,
        {
          maxWidth: 175,
          align: "justify",
        }
      );
      doc.setFont(undefined, "bold");
      doc.text(`Atte:`, 15, 105, {
        maxWidth: 175,
        align: "justify",
      });
      doc.setFont(undefined, "normal");
      doc.text(`${data.asesor_asignado}.`, 15, 110, {
        maxWidth: 175,
        align: "justify",
      });
      doc.text(`Comercial ${data.region}.`, 15, 115, {
        maxWidth: 175,
        align: "justify",
      });

      //BodyEnd

      //Footer
      doc.line(15, 260, 197, 260);
      doc.text(
        `Prolongación Corregidora Norte 354-G Col La Trinidad Santiago de Querétaro CP 76166`,
        110,
        263,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.text(
        `Tel: 442 214 6373 / 442 214 6191 Email: ventas@secopla.com.mx www.secopla.com.mx`,
        110,
        267,
        {
          maxWidth: 175,
          align: "center",
        }
      );
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`CONFIDENCIAL`, 110, 274, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`FORMATO: ISO-CO-005`, 110, 279, {
        maxWidth: 175,
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`DOCUMENTO NO CONTROLADO`, 110, 284, {
        maxWidth: 175,
        align: "center",
      });
      //Footer

      doc.save("Planta - " + id + ".pdf");
    };
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        endIcon={<CloudDownloadIcon />}
        onClick={() => {
          generatePDF();
        }}
        type="primary"
      >
        Planta PDF
      </Button>
    </div>
  );
}
export default UserCreate;
