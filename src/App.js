import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import './App.css';

import HomePage from './Home'
import Companies from './Companies/CompanyList'
import SpecificCompany from './Companies/CompanyDetails'
import RegisterUser from './Forms/Register'
import LoginForm from './Forms/Login'
import JobsDetail from './Jobs/JobDetail'
import UserProfile from './Profile/Profile'
import JoblyApi from './API/api'

import jwt from 'jsonwebtoken'

import Navlinks from './Navigation/Navbar'

import  { getUserProfile } from './ActionCreators/ActionCreator'

function App() {

  const dispatch = useDispatch()

  const token = useSelector(store=>store.token)

  useEffect(()=>{
    if(token){
      try{
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          dispatch(getUserProfile(username))
      }catch{
          console.error('could not locate user/ problem loading info')
      }
    }
  }, [token])

  
  return (
    <div>
      <BrowserRouter>
        <Navlinks />
        <Switch>

            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/companies">
              <Companies />
            </Route>

            <Route exact path="/companies/:name">
              <SpecificCompany />
            </Route>

            <Route exact path="/jobs">
              <JobsDetail />
            </Route>

            <Route exact path="/login">
              <LoginForm />
            </Route>

            <Route exact path="/signup">
              <RegisterUser />
            </Route>

            <Route exact path="/profile">
              <UserProfile />
            </Route>

        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
