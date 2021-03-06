
import  Axios  from 'axios';
import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';


function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessEmail, setErrorMessEmail] = useState("Zły email");
  const [errorMessPass, setErrorMessPass] = useState("Hasło powinno zawierać przynajmniej 8 znaków");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);


  const [loginStatus, setLoginStatus] = useState('');
  const [loginStatuslogic, setLoginStatusLogic] = useState(false)
  
  Axios.defaults.withCredentials = true;
  const logins = () => {
    if((errorEmail && errorPass) === false){
      Axios.post("http://localhost:3001/login",{
        email: email,
        password: password,
      }).then((response) => {
          if(response.data.message){
            setLoginStatusLogic(true);
            setLoginStatus(response.data.message);
            console.log(response);
        }else{
            console.log(response);
            sessionStorage.setItem('role', "logged");
            //console.log(response.data[0].name);
            sessionStorage.setItem('name',response.data[0].name);
            sessionStorage.setItem('userId',response.data[0].user_id);
            window.location.reload(false);
            window.location = "/";
        }
      });
    }else console.log("nieudalosie");   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    logins();
    
  }

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

              <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input type="email" id="typeEmailX" required className="form-control form-control-lg" onChange={(e) =>{
                  if(e.target.value.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")!=null){
                    setErrorEmail(false);
                    setEmail(e.target.value);
                  }else{
                    setErrorEmail(true);
                    setEmail(e.target.value);
                  } 
                    
                 }} />
                  
                <label className="form-label" for="typeEmailX" >Email</label>
                <p className={errorEmail ? ' text-danger' :'d-none text-danger' }>{errorMessEmail}</p>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="typePasswordX" required className="form-control form-control-lg" onChange={(e) =>{
                    if(e.target.value.match("^(?=.*?[a-z]).{8,}$")!=null){
                    setErrorPass(false);
                    setPassword(e.target.value);
                  }else{
                    setErrorPass(false);
                    setPassword(e.target.value);
                  } 
                   
                 }} />
                
                <label className="form-label" for="typePasswordX">Hasło</label>
                <p className={errorPass ? ' text-danger' :'d-none text-danger' }>{errorMessPass}</p>
              </div>
                
            

              <button className="btn btn-outline-dark btn-lg px-5 mb-4">Login</button>
              <p className={loginStatuslogic ? ' text-danger' :'d-none text-danger' }>{loginStatus}</p>
            </form>
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