import {useState, useEffect} from "react";
import Axios from "axios";

function Modal(props) {

const [email, setEmail] = useState("");
const [akualnehaslozap, setAktualnehaslozap] = useState("")
const [aktualnehaslo, setAktualneHaslo] = useState("");
const [nowehaslo, setNoweHaslo] = useState("");
const [nowehaslo2, setNoweHaslo2] = useState("");
const [loginStatus, setLoginStatus] = useState('');

Axios.defaults.withCredentials = true;
    
useEffect(() => {
    Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
        if(response.data.loggedIn === true){
            //setRole("logged");
            setAktualnehaslozap(response.data.user[0].password);
            setEmail(response.data.user[0].email);
            console.log(response);
        }else{
           // setRole("visitor");
        }
        
      });
        
        
  

  }, []);

const zmianaHasla = () =>{

if(nowehaslo === nowehaslo2){
  Axios.post("http://localhost:3001/zmianahasla", {
  email: email,
  password: nowehaslo,
  }).then((response) => {
    if(response.data.message){
     setLoginStatus(response.data.message);
      
      console.log(response);
  }else{
      console.log(response);
      
      //window.location.reload(false);
      //window.location = "/";
  }
});
}else{
  console.log(akualnehaslozap);
  console.log("test");
}

}

function cancelHandler(){
props.onCancel();

}

function confirmHandler(){
  props.onConfirm();
}

return (

<div>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Okno rezerwacji</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {console.log(props.dane)}
        {props.dane[1][0]} <br/>
        {props.dane[1][1]} <br/>
        {props.dane[1][2]} <br/>
        {props.dane[1][3]} <br/>
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-dark">Zarezerwuj</button>
        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Anuluj</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="modal2" tabIndex="-1" aria-labelledby="modal2Label" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modal2Label">Okno zapisu</h5>
        <button type="button" onClick={cancelHandler} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
      <h3>Czy na pewno chcesz się zapisać?</h3>
       Właściciel rezerwacji: {props.dane[0]} <br/>
       Adres orlika: {props.dane[1]} <br/>
       Tutaj chyba później będzie dzień: {props.dane[2]} <br/>
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-dark">Zapisz się</button>
        <button type="button" onClick={cancelHandler} className=" border border 1 btn btn-light" data-bs-dismiss="modal">Anuluj</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="modal3" tabIndex="-1" aria-labelledby="modal3Label" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modal3Label">Okno szukania graczy</h5>
        <button type="button" onClick={cancelHandler} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
        Wpisz ilu graczy szukasz <br/>
        <input type="text"/><br/>

      </div>
      <div className="modal-footer ">
      <div className="w-100">
      <button type="button" className="btn btn-dark mr-auto">Szukaj</button>
        <button type="button" onClick={cancelHandler} className="border border 1 btn btn-light float-end" data-bs-dismiss="modal">Anuluj</button>
      </div>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="modalchange" tabIndex="-1" aria-labelledby="modalchangeLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modalchangeLabel">Okno zmiany hasła</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body m-auto">
      <form autoComplete="off">
      <div className="col">
        <div className="row">        <div className="text-center" >Wpisz aktualne hasło </div></div>
        <div className="row">        <input type="password" onChange={(e) =>{
                    setAktualneHaslo(e.target.value);
                 }}/></div>
        <div className="row">    <div className="text-center" >Wpisz nowe hasło </div> </div>
        <div className="row">       <input type="text" onChange={(e) =>{
                    setNoweHaslo(e.target.value);
                 }}/></div>
        <div className="row">         <div className="text-center" >Powtórz nowe hasło </div></div>
        <div className="row">    <input type="text" onChange={(e) =>{
                    setNoweHaslo2(e.target.value);
                 }}/></div>

      </div>
      </form>


      </div>
      <div className="modal-footer ">
      <div className="w-100">
      <button type="button" className="btn btn-dark float-start mr-auto" onClick={zmianaHasla}>Zapisz zmiany</button>
        <button type="button"  className="border border 1 btn btn-light float-end" data-bs-dismiss="modal">Anuluj</button>
      </div>
      
      </div>
    </div>
  </div>
</div>

<div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="modalregu" tabIndex="-1" aria-labelledby="modalreguLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modalreguLabel">Regulamin</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
         {props.dane[0]}<br/>

      </div>
      <div className="modal-footer ">
      <div className="w-100">
        <button type="button" className="border border 1 btn btn-light float-end" data-bs-dismiss="modal">Anuluj</button>
      </div>
      </div>
    </div>
  </div>
</div>

</div>
);


}

export default Modal;