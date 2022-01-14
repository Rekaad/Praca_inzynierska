import { Route,Switch } from 'react-router-dom'
import MainNavigation from './components/layout/MainNavigation';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Orliki from './pages/Orliki';
import OrlikInfo from './pages/OrlikInfo';
import Profile from './pages/Profile';
import Register from './pages/Register';
import SearchGame from './pages/SearchGame';
import SearchPlayers from './pages/SearchPlayers';
import React, { Component, useEffect, useState } from 'react';
import Axios from 'axios';


function App() {

  
    Axios.defaults.withCredentials = true;
  const [role, setRole] = useState("visitor");

  function checkLoginStatus(){

    Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
      if(response.data.loggedIn === true){
        console.log(response);  
        setRole("logged");
          console.log(response);
          console.log("info z gory1")
      }else if(!response.data.loggedIn){
        console.log(response); 
          setRole("visitor");
          console.log("info z gory2");
          
      }
      
    });
  }
 
  useEffect(() =>{
     
    checkLoginStatus();
      
    },[]);


  return (
  <div>
  <MainNavigation/>
  <Switch>
    <Route path='/' exact> <MainPage /> </Route>
    <Route path='/orliki'> <Orliki /> </Route>
    <Route path='/gry'> <SearchGame /> </Route>
    <Route path='/gracze'> <SearchPlayers /> </Route>
    <Route path='/login'> <Login/></Route>
    <Route path='/rejestracja'> <Register/> </Route>
    <Route path='/profil'> <Profile /> </Route>
    <Route path='/orlikinfo'> <OrlikInfo/> </Route>
    </Switch>
  </div>
  );
}

export default App;
