import { useState,useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
// import Modal from "../components/ui/Modal";
import Modal from 'react-modal'
import { Link } from "react-router-dom";
import Axios from "axios";
import ReservationInnerItemList from "../components/reservation/ReservationInnerItemList";


function OrlikInfo(props){

    const [role, setRole] = useState(sessionStorage.getItem("role"));
    const [thisId, setThisId] = useState("1");
    const [day, setDay] = useState("Poniedziałek");
    const [thisHour, setThisHour] = useState("0");
    const [thisData, setThisData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dane, setDane] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const dataId = location.state;

    Axios.defaults.withCredentials = true;
    useEffect(() =>{
        const checklogin = async() => { 
            await Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
            if(response.data.loggedIn === true){
                //setRole("logged");
                console.log(response);
            }else{
                
                setRole("visitor");
            }
            
          });}
        //console.log(dataId);
        const getRezerwacje = () => {

            Axios.get(`http://localhost:3001/rezerwacjeorlik/${dataId.id}`).then((response) => {
                 console.log(response.data);
                 setDane(response.data);
             });
             
             }

        checklogin();
        getRezerwacje();
        console.log(localStorage);
      },[]);


    

if(role === "logged"){

    return <div className="w-75 mx-auto">


    <div className="card mb-4 w-100 mx-auto text-center mt-2 border border-5">
    
    {/*  <div>
        <img className="card-img-top" src={props.image} alt={props.title} />
    </div> */}
    <div className="card-body w-100">
    <div className="mb-4">
    <h1>{dataId.adress}</h1>
    </div>
      <div className="d-flex">
      <div className="border border-3 float-start w-50 me-2">
      <h3> Kontakt</h3>
      <h5>Nr telefonu: {dataId.number}</h5>
      <h5>E-mail: {dataId.email}</h5>
      </div>

    
      <div className="d-flex border border-3 float-end w-50 ms-2">
      <button className="m-auto w-100 h-100 bg-white border-0" onClick={() => {setModalIsOpen(true)}}> <h3> Regulamin</h3></button>
    
      <Modal isOpen={modalIsOpen} style={
          {
              overlay:
              {
                position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(80, 83, 90, 0.75)'
              },
              content:{
                  width:"500px",
                  height:"300px",
                  position: 'absolute',
      top: '50%',
      left: '50%',
      transform: "translate(-50%, -50%)",
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '0px',
              }
            }}> 

            <div className="modal-dialog-scrollable"> 
    <div className="modal-content">
      <div className="modal-header">
      <h3 className="modal-title">Regulamin</h3>
      </div>
    
    <div className="modal-body" style={{height:"250px"}}>
                 {dataId.pl_terms}<br/>
                 {dataId.pl_terms}<br/>
                 {dataId.pl_terms}<br/>
                 {dataId.pl_terms}<br/>
                 {dataId.pl_terms}<br/>
                 {dataId.pl_terms}<br/>
                 {dataId.pl_terms}<br/>
                 {dataId.pl_terms}<br/>
    
    </div>   
    <div className="fixed-bottom mb-2 me-2">
    <button type="button" className="border border 1 btn btn-light float-end" onClick={() => {setModalIsOpen(false); console.log(modalIsOpen)}}> Anuluj </button>
    </div>
       
    </div>
    </div>
 
      </Modal>
      </div>
     
    </div>
    
    <div className="border border-2 mt-4" >
        <h3>Rezerwacje</h3>
        
    </div>

    <div className="border border-2 mt-3">
    
    <ReservationInnerItemList reservationinner={dane}/>
   
    {/* <div className="border border-2 w-25 m-auto" onClick={() => {}}> godzina 2</div>
    <div className="border border-2 w-25 float-end"> godzina 3</div> */}
   
    
    
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