import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Login } from '../../pages/Login/Login'
import { Index } from '../../pages/Index/Index'
import {Todos} from "../../pages/Todos/Todos";
import {Chats} from "../../pages/Chats/Chats";

export const useRoutes = (isAuthenticated: Boolean) => {
   if (isAuthenticated) {
      return (
         <>
            <Switch>
               <Route path="/" exact>
                  <Index />
               </Route>
                <Route path="/user-todos/:id" exact>
                    <Todos />
                </Route>
                <Route path="/chats" exact>
                    <Chats />
                </Route>

               <Redirect to="/" />
            </Switch>
         </>
      )
   }
   return (
      <>
         <Switch>
            <Route path="/login" exact>
               <Login />
            </Route>
            <Redirect to="/login" />
         </Switch>
      </>
   )
}
