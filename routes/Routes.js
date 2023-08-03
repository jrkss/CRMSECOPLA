import React from 'react';
import {BrowserRouter, Switch, Route, useParams} from 'react-router-dom';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import UserCreate from '../pages/UserCreate';
import GridLevantamiento from '../pages/GridLevantamiento';
import DataGridExample from '../pages/DataGridExample';
import FormLevantamiento from '../pages/FormLevantamiento';
import DicServicio from '../pages/DicServicio';
import FormDicServ from '../pages/FormDicServ';
import Aprobaciones from '../pages/Aprobaciones';
import FormAprobaciones from '../pages/FormAprobaciones';
import ReportTemplate from '../pages/Template/ReportTemplate';
import ExampleDoc from '../pages/ExampleDoc';

function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/UserCreate" component={UserCreate}/>
        <Route exact path="/GridLevantamiento" component={GridLevantamiento}/>
        <Route exact path={"/FormLevantamiento/:planta"} component={FormLevantamiento}/>

        <Route exact path="/DicServicio" component={DicServicio}/>
        <Route exact path="/DataGridExample" component={DataGridExample}/>
        <Route exact path="/FormDicServ/:planta" component={FormDicServ}/>

        <Route exact path="/Aprobaciones" component={Aprobaciones}/>
        <Route exact path={"/FormAprobaciones/:partida"} component={FormAprobaciones}/>
        <Route exact path={"/ReportTemplate/:planta"} component={ReportTemplate}/>
        <Route exact path={"/ExampleDoc"} component={ExampleDoc}/>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
