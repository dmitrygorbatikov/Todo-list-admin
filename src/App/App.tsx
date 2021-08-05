import React, { useEffect, useState } from 'react'
import { useRoutes } from '../containers/Routes/Routes'
import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import {RootState} from "../redux/store";
import AuthService from "../services/auth.service";
import {Navibar} from "../components/Navbar/Navbar";

const App = () => {
   const token = useSelector((store: RootState) => store.auth.token)
   const routes = useRoutes(!!token)

   useEffect(() => {
      if (token) {
         AuthService.setToken(token)
      }
   }, [token])

   return (
      <Router>
         <Switch>
            <Container>
               {!!token && <Navibar />}
               {routes}
            </Container>
         </Switch>
      </Router>
   )
}
export default App
