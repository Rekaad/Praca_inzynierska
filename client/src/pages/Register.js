import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

function Register(){

const [nameReg, setnameReg] = useState('');
const [surnameReg, setSurnameReg] = useState('');
const [emailReg, setEmailReg] = useState('');
const [passwordReg, setPasswordReg] = useState('');
const [password2Reg, setPassword2Reg] = useState('');
const [phoneReg, setPhoneReg] = useState('');


const [registerStatus, setRegisterStatus] = useState('');

Axios.defaults.withCredentials = true;

const register = () => {
  if(passwordReg.length>=8 && passwordReg === password2Reg){
    console.log(nameReg, surnameReg, emailReg, passwordReg,phoneReg);
    Axios.post("http://localhost:3001/rejestracja",{
      name: nameReg,
      surname:surnameReg,
      password: passwordReg,
      email: emailReg,
      phone: phoneReg,
    }).then((response) => {
      if(response.data.message){
        console.log(response);
        setRegisterStatus(response.data.message); 
      }else{
        console.log(response);
        window.location.reload(false);
        window.location = "/login";
      }
    });
  }else{
    console.log("zle powtorzone haslo");
  }
  
};

    return <div>

<section className="">

    <div className="container py-2">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-5 text-center">

              <h2 className="text-uppercase text-center mb-3">Stwórz konto</h2>

             

                <div className="form-outline mb-2">
                  <input type="text" id="form3Example1cg" required className="form-control form-control-lg" onChange={(e) =>{
                    setnameReg(e.target.value);
                 }} />
                  <label className="form-label" htmlFor="form3Example1cg">Imie</label>
                </div>

                <div className="form-outline mb-2">
                  <input type="text" id="form3Example2cg" required className="form-control form-control-lg" onChange={(e) =>{
                    setSurnameReg(e.target.value);
                 }} />
                  <label className="form-label" htmlFor="form3Example2cg">Nazwisko</label>
                </div>

                <div className="form-outline mb-2">
                  <input type="text" id="form3Example3cg" required className="form-control form-control-lg" onChange={(e) =>{
                    setEmailReg(e.target.value);
                 }}/>
                  <label className="form-label" htmlFor="form3Example3cg">Email</label>
                </div>

                <div className="form-outline mb-2">
                  <input type="password" id="form3Example4cg" minLength={8} className="form-control form-control-lg" onChange={(e) =>{
                    setPasswordReg(e.target.value);
                 }} />
                  <label className="form-label" htmlFor="form3Example4cg">Hasło</label>
                </div>

                <div className="form-outline mb-2">
                  <input type="password" id="form3Example5cdg" required className="form-control form-control-lg" onChange={(e) =>{
                    setPassword2Reg(e.target.value);
                 }}/>
                  <label className="form-label" htmlFor="form3Example5cdg">Powtórz hasło</label>
                </div>

                <div className="form-outline mb-2">
                  <input type="text" id="form3Example6cdg" maxLength={9} className="form-control form-control-lg" onChange={(e) =>{
                    setPhoneReg(e.target.value);
                 }}/>
                  <label className="form-label" htmlFor="form3Example6cdg">Numer telefonu</label>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-outline-dark btn-lg px-5" onClick={register}>Register</button>
                </div>

                <p className="mt-3 mb-0">Posiadasz już konto? <Link className=" fw-bold" to='/login'> Zaloguj się </Link></p>


              <h1>{registerStatus}</h1>
          </div>
        </div>
      </div>
    </div>

</section>
    </div>

}

export default Register;