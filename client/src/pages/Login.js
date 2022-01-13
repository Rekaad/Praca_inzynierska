
import  Axios  from 'axios';
import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';


function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');
  
  Axios.defaults.withCredentials = true;
  const logins = () => {
    Axios.post("http://localhost:3001/login",{
      email: email,
      password: password,
    }).then((response) => {
        if(response.data.message){
          setLoginStatus(response.data.message);
          console.log(response);
      }else{
          console.log(response);
          localStorage.setItem('role', "logged");
          //console.log(response.data[0].name);
          localStorage.setItem('name',response.data[0].name);
          localStorage.setItem('userId',response.data[0].user_id);
          window.location.reload(false);
          window.location = "/";
      }
    });
  };

  useEffect(() => {
  
    Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
      if (response.data.loggedIn == true) {
        
      setLoginStatus(response.data.user);
      console.log(response);
      }
    });

  }, []);

    return <div>
    
        <section className="gradient">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card">
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-2">

              <h2 className="fw-bold mb-3 text-uppercase">Logowanie</h2>


              <div className="form-outline mb-4">
                <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={(e) =>{
                    setEmail(e.target.value);
                 }} />
                <label className="form-label" for="typeEmailX" >Email</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e) =>{
                    setPassword(e.target.value);
                 }} />
                <label className="form-label" for="typePasswordX">Hasło</label>
              </div>

              <p className="small mb-3 pb-lg-2"><a className="" href="#!">Zapomniałeś hasła?</a></p>

              <button className="btn btn-outline-dark btn-lg px-5" onClick={logins}>Login</button>

            </div>

            <div>
              <p className="mb-0">Nie masz jeszcze konta?? <Link className=" fw-bold" to='/rejestracja'> Rejestracja </Link></p>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</section>
    </div>

}

export default Login;