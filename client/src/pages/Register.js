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

const [nameRegErr, setnameRegErr] = useState(false);
const [surnameRegErr, setSurnameRegErr] = useState(false);
const [emailRegErr, setEmailRegErr] = useState(false);
const [passwordRegErr, setPasswordRegErr] = useState(false);
const [password2RegErr, setPassword2RegErr] = useState(false);
const [phoneRegErr, setPhoneRegErr] = useState(false);

const [nameRegErrMess, setnameRegErrMess] = useState('Błędnie wpisane imię');
const [surnameRegErrMess, setSurnameRegErrMess] = useState('Błędnie wpisane nazwisko');
const [emailRegErrMess, setEmailRegErrMess] = useState('Nieprawidłowy email');
const [passwordRegErrMess, setPasswordRegErrMess] = useState('Hasło powinno zawierać przynajmniej 8 znaków');
const [password2RegErrMess, setPassword2RegErrMess] = useState('Hasła nie jest takie samo');
const [phoneRegErrMess, setPhoneRegErrMess] = useState('Numer telefonu składa się z 9 cyfr');


const [registerStatus, setRegisterStatus] = useState('');
const [registerStatuslogic, setRegisterStatusLogic] = useState(false)

Axios.defaults.withCredentials = true;

const register = () => {
  if((nameRegErr && surnameRegErr && emailRegErr && passwordRegErr && password2RegErr && phoneRegErr) === false){
  if(passwordReg.length>=8 && phoneReg===9 && passwordReg === password2Reg){
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
        setRegisterStatusLogic(true);
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
}
  
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(nameReg);
  console.log(surnameReg);
  console.log(emailReg);
  console.log(passwordReg);
  console.log(password2Reg);
  console.log(phoneReg);
  register();
  
}

    return <div>

<section className="">

    <div className="container py-2">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-5 text-center">

              <h2 className="text-uppercase text-center mb-3">Stwórz konto</h2>

             
                  <form onSubmit={handleSubmit}>
                <div className="form-outline mb-2">
                  <input type="text" id="form3Example1cg" required className="form-control form-control-lg" onChange={(e) =>{
                    if(e.target.value.match("^(?:[A-Z][a-z]{1,13})$")!=null){
                    setnameRegErr(false);
                    setRegisterStatusLogic(false);
                    setnameReg(e.target.value);
                  }else{
                    setnameRegErr(true);
                    
                  } 
                    
                 }} />
                  <label className="form-label" htmlFor="form3Example1cg">Imie</label>
                  <p className={nameRegErr ? ' text-danger' :'d-none text-danger' }>{nameRegErrMess}</p>
                </div>

                <div className="form-outline mb-2">
                  <input type="text" id="form3Example2cg" required className="form-control form-control-lg" onChange={(e) =>{
                     if(e.target.value.match("^(?:[A-Z][a-z]{1,13})$")!=null){
                    setSurnameRegErr(false);
                    setRegisterStatusLogic(false);
                    setSurnameReg(e.target.value);
                  }else{
                    setSurnameRegErr(true);
                    
                  }
                    
                 }} />
                  <label className="form-label" htmlFor="form3Example2cg">Nazwisko</label>
                  <p className={surnameRegErr ? ' text-danger' :'d-none text-danger' }>{surnameRegErrMess}</p>
                </div>

                <div className="form-outline mb-2">
                  <input type="text" id="form3Example3cg" required className="form-control form-control-lg" onChange={(e) =>{
                    if(e.target.value.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")!=null){
                    setEmailRegErr(false);
                    setRegisterStatusLogic(false);
                    setEmailReg(e.target.value);
                  }else{
                    setEmailRegErr(true);
                    
                  } 
                    
                 }}/>
                  <label className="form-label" htmlFor="form3Example3cg">Email</label>
                  <p className={emailRegErr ? ' text-danger' :'d-none text-danger' }>{emailRegErrMess}</p>
                </div>

                <div className="form-outline mb-2">
                  <input type="password" id="form3Example4cg" required className="form-control form-control-lg" onChange={(e) =>{
                    if(e.target.value.match("^(?=.*?[a-z]).{8,}$")!=null){
                    setPasswordRegErr(false);
                    setRegisterStatusLogic(false);
                    setPasswordReg(e.target.value);
                  }else{
                    setPasswordRegErr(false);
                    setRegisterStatusLogic(false);
                    setPasswordReg(e.target.value);
                  }
                 }} />
                  <label className="form-label" htmlFor="form3Example4cg">Hasło</label>
                  <p className={passwordRegErr ? ' text-danger' :'d-none text-danger' }>{passwordRegErrMess}</p>
                </div>

                <div className="form-outline mb-2">
                  <input type="password" id="form3Example5cdg" required className="form-control form-control-lg" onChange={(e) =>{
                    if(e.target.value.match("^(?=.*?[a-z]).{8,}$")!=null){
                    setPassword2RegErr(false);
                    setRegisterStatusLogic(false);
                    setPassword2Reg(e.target.value);
                  }else{
                    setPassword2RegErr(false);
                  }
                    
                 }}/>
                  <label className="form-label" htmlFor="form3Example5cdg">Powtórz hasło</label>
                  <p className={password2RegErr ? ' text-danger' :'d-none text-danger' }>{password2RegErrMess}</p>
                </div>

                <div className="form-outline mb-2">
                  <input type="text" id="form3Example6cdg" maxLength={9} className="form-control form-control-lg" onChange={(e) =>{
                    if(e.target.value.match("^(?:[0-9]{0,9})$")!=null){
                    setPhoneRegErr(false);
                    setRegisterStatusLogic(false);
                    setPhoneReg(e.target.value);
                  }else{
                    setPhoneRegErr(true);
                    
                  }
                    
                 }}/>
                  <label className="form-label" htmlFor="form3Example6cdg">Numer telefonu</label>
                  <p className={phoneRegErr ? ' text-danger' :'d-none text-danger' }>{phoneRegErrMess}</p>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-dark btn-lg px-5">Register</button>
                </div>
                <p className={registerStatuslogic ? ' text-danger' :'d-none text-danger' }>{registerStatus}</p>
                </form>
                <p className="mt-3 mb-0">Posiadasz już konto? <Link className=" fw-bold" to='/login'> Zaloguj się </Link></p>

          </div>
        </div>
      </div>
    </div>

</section>
    </div>

}

export default Register;