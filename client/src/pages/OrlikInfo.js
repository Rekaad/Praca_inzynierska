import { useState,useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Modal from "../components/ui/Modal";
import { Link } from "react-router-dom";
import Axios from "axios";
function OrlikInfo(props){

    const [role, setRole] = useState("");
    const [thisId, setThisId] = useState("1");
    const [day, setDay] = useState("Poniedziałek");
    const [thisHour, setThisHour] = useState("0");
    const [thisData, setThisData] = useState([]);

    const history = useHistory();
    const location = useLocation();
    const dataId = location.state;

    const handleDays = async e => {
        if(e === "1") setDay("Poniedziałek");
        else if(e === "2") setDay("Wtorek");
        else if(e === "3") setDay("Środa");
        if(e === "4") setDay("Czwartek");
        if(e === "5") setDay("Piątek");
        if(e === "6") setDay("Sobota");
        if(e === "7") setDay("Niedziela");
        console.log(e,day);
         };
    
    const handleHour = async e => {
        setThisHour(e);
        console.log(thisData);
    };

    function handleData(){
        setThisData([dataId.adress,dataId.school,day,thisHour]);
    };
    Axios.defaults.withCredentials = true;
    useEffect(() =>{
        Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
            if(response.data.loggedIn === true){
                setRole("logged");
                console.log(response);
            }else{
                setRole("visitor");
            }
            
          });
        console.log(dataId);
        
      },[]);

    const modaldata = [dataId.pl_terms,thisData];

if(role === "logged"){

    return <div className="w-75 mx-auto">


    <div className="card mb-4 w-100 mx-auto text-center mt-4 border border-5">
    
    {/*  <div>
        <img className="card-img-top" src={props.image} alt={props.title} />
    </div> */}
    <div className="card-body w-100">
    <div className="mb-4">
    <h1>{dataId.adress}</h1>
    </div>
      <div className="d-flex">
      <div className="border border-3 float-start w-25">
      <h3> Kontakt</h3>
      <h5>Nr telefonu: <br/> {dataId.number}</h5>
      <h5>E-mail: <br/> {dataId.email}</h5>
      </div>
    
      <div className="border border-3 m-auto w-25">
      <h3> Godziny otwarcia</h3>
      <h5>Pon-Sob: </h5>
      <h5>Nd: </h5>
      </div>
    
      <div className="d-flex border border-3 float-end w-25" data-bs-toggle="modal" data-bs-target="#modalregu">
      <h3 className=" m-auto" > Regulamin </h3>
        
      </div>
     
    </div>
    
    <div className="border border-2 mt-4">
        <h3>Rezerwacje</h3>
    </div>
    
    <div className="btn-group mt-3 m-auto">
        <button id="1" onClick={e => {const wybrany = e.target.id; setThisId(wybrany);handleDays(wybrany);}}> Pon </button>
        <button id="2" value={thisId} onClick={e => {const wybrany = e.target.id; setThisId(wybrany);handleDays(wybrany);}}> Wt</button>
        <button id="3" value={thisId} onClick={e => {const wybrany = e.target.id; setThisId(wybrany);handleDays(wybrany);}}> Sr</button>
        <button id="4" value={thisId} onClick={e => {const wybrany = e.target.id; setThisId(wybrany);handleDays(wybrany);}}> Czw</button>
        <button id="5" value={thisId} onClick={e => {const wybrany = e.target.id; setThisId(wybrany);handleDays(wybrany);}}> Pt</button>
        <button id="6" value={thisId} onClick={e => {const wybrany = e.target.id; setThisId(wybrany);handleDays(wybrany);}}> Sob</button>
        <button id="7" value={thisId} onClick={e => {const wybrany = e.target.id; setThisId(wybrany);handleDays(wybrany);}}> Nd</button>
        
    
    </div>
    <div className="border border-2 mt-3 d-flex">
    
    {/* <div className="border border-2 w-25 float-start" onClick={console.log("test111")}> godzina 1</div> */}
    <button id="godzina1" className="float-start w-25 btn btn-success" onMouseOver={e=>{const godzina = e.target.id; handleHour(godzina);}} onClick={handleData} data-bs-toggle="modal" data-bs-target="#exampleModal">godzina1</button>
    <button id="godzina2" className="w-25 m-auto btn btn-danger" onMouseOver={e=>{const godzina = e.target.id; handleHour(godzina);}} onClick={handleData} data-bs-toggle="modal" data-bs-target="#exampleModal">godzina 2</button>
    <button id="godzina3" className="w-25 float-end btn btn-secondary" onMouseOver={e=>{const godzina = e.target.id; handleHour(godzina);}} onClick={handleData} data-bs-toggle="modal" data-bs-target="#exampleModal">godzina 3</button>
    {/* <div className="border border-2 w-25 m-auto" onClick={() => {}}> godzina 2</div>
    <div className="border border-2 w-25 float-end"> godzina 3</div> */}
    <Modal dane={modaldata}/>
    
    
    </div>
    </div>
    
    </div>
    
    
    
    {/* 
    <button onClick={() => history.goBack()}> Wstecz </button>
        <h1>{dataId.title}</h1>
        <h2>{dataId.address}</h2> */}
    
    
    
    </div>
}
else{

    return <div className="text-center m-5">
        <h3>Dostęp tylko dla zalogowanych użytkowników</h3>
        <h4><Link className="nav-link text-decoration-none" to='/login'> Zaloguj się </Link></h4>
    </div>
}



}

export default OrlikInfo;