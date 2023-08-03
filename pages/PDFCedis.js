import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';
import Base64 from "base-64";
import axios from "axios";

import "jspdf-autotable";

function PDFCedis(props) {
  const id = props.id;
  const [data, setData] = useState([]);
  const [aprobacion, setAprobacion] = useState([]);
  const [tabthreebyplanta, setTabThreeByPlanta] = useState([]);
  const [tabtwobyplanta, setTabTwoByPlanta] = useState([]);

  const PeticionGetAll = () => {
    const baseUrlG = `http://192.168.1.47:5000/api/formlevantamiento/${id}`;

    const baseAprobaciones = `http://192.168.1.47:5000/api/kds_aprobaciones/`;

    const basetabThreeByPlanta = `https://localhost:7239/api/tabthreebyplanta/${id}`;
    const basetabTwoByPlanta = `https://localhost:7239/api/tabtwobyplanta/${id}`;

    const getgridlev = axios.get(baseUrlG);
    const getApro = axios.get(baseAprobaciones);
    const getTabThreeByPlanta = axios.get(basetabThreeByPlanta);
    const getTabTwoByPlanta = axios.get(basetabTwoByPlanta);

    axios.all([getgridlev, getApro, getTabThreeByPlanta,getTabTwoByPlanta]).then(
      axios.spread((...allData) => {
        const datagridlev = allData[0].data;
        const dataApro = allData[1].data;
        const dataTabThreeByPlanta = allData[2].data;
        const dataTabTwoByPlanta = allData[3].data;
        setData(datagridlev);
        setAprobacion(dataApro);
        setTabThreeByPlanta(dataTabThreeByPlanta);
        setTabTwoByPlanta(dataTabTwoByPlanta);
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
    console.log(aprobacion[index].apro_precio);
  }

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

    const doc = new jsPDF();
    img.src = require("../images/logosecopla.png");
    cebadero.src = require("../images/logosecopla.png");
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
      doc.text("Guadalajara, Jalisco a 09 marzo 2023", 140, 50);
      doc.setFontSize(9);
      doc.text("Cotización: 090320231526", 155, 54);

      //A quien correspoda
      var nombrecliente = data.nombre_empresa;
      console.log(nombrecliente);
      doc.setFont(undefined, "bold");
      doc.text(nombrecliente, 15, 64);
      var att = "Alejandro Solorzano";
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
      doc.text(`4. PROPUESTA ECONÓMICA`, 110, 35, {
        maxWidth: 175,
        align: "center",
      });

      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 40,

        body: [
          ["Asignación de Equipos", "A comodato", "Si"],
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

      let tabtwo = []
      tabtwobyplanta.forEach((element, index, array)=>{
        tabtwo.push([
          element.pe_taba_apli,
          element.pe_taba_prod, 
          element.pe_taba_cant,
          element.pe_taba_area,
          element.pe_taba_tipofrec
        ])
      })
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 95,
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

      doc.autoTable({ html: "#my-table" });

      
      let info = []
      tabthreebyplanta.forEach((element, index, array)=>{
        info.push([element.pe_tabb_equip,element.pe_tabb_cant, element.pe_tabb_prod,element.pe_tabb_cinturon,element.pe_tabb_tipofrec,element.pe_tabb_cantfrec])
      })

      doc.autoTable({
        startY: 125,
        head: [
          [
            "nombre",
            "apellido",
            "apellido2",
            "apellido3",
            "apellido4",
            "nombre2",
          ],
        ],
        body: info,
        styles: {
          fontSize: 9,
        },
        theme: "grid",
      });

      var precio = preciodata;
      var iva = precio * 0.16;
      var total = precio + iva;
      var conDecimal = total.toFixed(2);
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 170,
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
        195,
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
        218,
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
      doc.text("Página: 3", 150, 26);
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
      doc.autoTable({ html: "#my-table" });
      doc.autoTable({
        startY: 40,
        head: [["Solicitud", "Si", "No", "Especificaciones"]],
        body: [
          [`Equipo de comunicación específico`, `X`, ``, `EQUIPO CELULAR`],
          [
            `EPP con características específicas`,
            `X`,
            ``,
            `CUBRE BOCAS, ZAPATO INDUSTRIAL`,
          ],
          [
            `Horario específico`,
            `X`,
            ``,
            `SE ESPECIFICA UNA VEZ APROBADA LA PROPUESTA`,
          ],
          [`Exámenes médicos especiales `, ``, `X`, ``],
          [
            `Días específicos para realizar la visita`,
            `X`,
            ``,
            `SE ESPECIFICA UNA VEZ APROBADA LA PROPUESTA.`,
          ],
          [`DC-3`, ``, `X`, ``],
          [`Orden de compra obligatoria`, `X`, ``, ``],
          [`Contrato obligatorio`, `X`, ``, ``],
          [`Otro`, ``, `X`, ``],

          // ...
        ],
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
          [`Cebadero`, ``, `$136.00`],
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
        theme: "grid",
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
      doc.text("Página: 4", 150, 26);
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
      doc.text(`ANDREA CASTAÑEDA.`, 15, 110, {
        maxWidth: 175,
        align: "justify",
      });
      doc.text(`COMERCIAL OCCIDENTE.`, 15, 115, {
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

      doc.save("Cedis - "+id+".pdf");
    };
  };

  return (
    <div>
      <Button variant="contained" color="error" endIcon={<CloudDownloadIcon />}
        onClick={() => {
          generatePDF();
        }}
        type="primary"
      >
        Cedis PDF
      </Button>
    </div>
  );
}
export default PDFCedis;
