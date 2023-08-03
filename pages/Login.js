import React, { useState, useEffect } from 'react';

import logosecoplam from '../images/logosecopla.png'
import logotwitter from '../images/facebook.svg'
import logofacebook from '../images/twitter.svg'
import logoinstagram from '../images/instagram.svg'
import logoln from '../images/linkedin.svg'
import Alert from '@mui/material/Alert';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Login(props) {

  const baseUrl = "http://192.168.1.47:5000/api/usuarios";
  const cookies = new Cookies();
  const MySwal = withReactContent(Swal)
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

 
  const iniciarSesion = async () => {
    
    console.log("starting...");
    await axios.get(baseUrl + `/${form.username}/${md5(form.password)}`)
      .then(response => {
        return response.data;
      }).then(response => {

        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set('id', respuesta.id, { path: '/' });
          cookies.set('name', respuesta.name, { path: '/' });
          cookies.set('lastname', respuesta.lastname, { path: '/' });
          cookies.set('direccion', respuesta.direccion, { path: '/' });
          cookies.set('region', respuesta.region, { path: '/' });
          cookies.set('zona', respuesta.zona, { path: '/' });
          cookies.set('username', respuesta.username, { path: '/' });
          cookies.set('password', respuesta.password, { path: '/' });
          MySwal.fire({
            icon: 'info',
            title: 'Bienvenido: ',
            html: <i>{respuesta.name + " " + respuesta.lastname}</i>,
            showConfirmButton: false,
            timer: 1000
          })
          
          props.history.push('/Menu');
        } else {
          MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>El usuario o la contraseña no son correctos</i>,
            icon: 'error'
          })
        }
      })

      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (cookies.get('id')) {
      props.history.push('/Menu');
    }
  }, []);

  return (


    <div className="containerlogin">
      <div className="logosecopla">
        <img className="secoplalogo" src={logosecoplam} alt="" />
      </div>
      <div className="col-25"><label className="labellogin">Usuario:</label></div>
      <div className="col-75"><input className="inputlogin" placeholder="Usuario" name="username"
        onChange={handleChange}></input></div>
      <div className="col-25"><label>Contraseña:</label></div>
      <div className="col-75"><input className="inputlogin" type="password" placeholder="Contraseña" name="password"
        onChange={handleChange}></input></div>
      <div className="loginbtn"><button className="btnlogin" onClick={() => iniciarSesion()}>Iniciar</button></div>
      <div className="socialmedia">
        <img className="media" src={logotwitter} alt="" />
        <img className="media" src={logofacebook} alt="" />
        <img className="media" src={logoinstagram} alt="" />
        <img className="media" src={logoln} alt="" />

      </div>
    </div>
  );
}

export default Login;