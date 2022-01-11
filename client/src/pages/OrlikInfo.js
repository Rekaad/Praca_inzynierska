import { useState,useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
// import Modal from "../components/ui/Modal";
import Modal from 'react-modal'
import { Link } from "react-router-dom";
import Axios from "axios";
import ReservationInnerItemList from "../components/reservation/ReservationInnerItemList";


const DUMMY_DATA = [
    {
        reservation_id: '1',
        orlik_id: '1',
        day: 'Poniedziałek',
        start_hour:'16',
        end_hour: '17',
        user_id:"1",
    },
    {
        reservation_id: '2',
        orlik_id: '1',
        day: 'Poniedziałek',
        start_hour:'17',
        end_hour: '18',
        user_id:"2",
    },
    {
        reservation_id: '3',
        orlik_id: '1',
        day: 'Poniedziałek',
        start_hour:'18',
        end_hour: '19',
        user_id:"",
    },
    {
        reservation_id: '4',
        orlik_id: '1',
        day: 'Poniedziałek',
        start_hour:'19',
        end_hour: '20',
        user_id:"",
    },
    {
        reservation_id: '5',
        orlik_id: '1',
        day: 'Poniedziałek',
        start_hour:'20',
        end_hour: '21',
        user_id:"",
    },
    {
        reservation_id: '6',
        orlik_id: '1',
        day: 'Wtorek',
        start_hour:'16',
        end_hour: '17',
        user_id:"",
    },
    {
        reservation_id: '7',
        orlik_id: '1',
        day: 'Wtorek',
        start_hour:'17',
        end_hour: '18',
        user_id:"6",
    },
    {
        reservation_id: '8',
        orlik_id: '1',
        day: 'Wtorek',
        start_hour:'18',
        end_hour: '19',
        user_id:"",
    },
    {
        reservation_id: '9',
        orlik_id: '1',
        day: 'Wtorek',
        start_hour:'19',
        end_hour: '20',
        user_id:"",
    },
    {
        reservation_id: '10',
        orlik_id: '1',
        day: 'Wtorek',
        start_hour:'20',
        end_hour: '21',
        user_id:"",
    },
    {
        reservation_id: '11',
        orlik_id: '1',
        day: 'Środa',
        start_hour:'16',
        end_hour: '17',
        user_id:"",
    },
    {
        reservation_id: '12',
        orlik_id: '1',
        day: 'Środa',
        start_hour:'17',
        end_hour: '18',
        user_id:"",
    },
    {
        reservation_id: '13',
        orlik_id: '1',
        day: 'Środa',
        start_hour:'18',
        end_hour: '19',
        user_id:"",
    },
    {
        reservation_id: '14',
        orlik_id: '1',
        day: 'Środa',
        start_hour:'19',
        end_hour: '20',
        user_id:"",
    },
    {
        reservation_id: '15',
        orlik_id: '1',
        day: 'Środa',
        start_hour:'20',
        end_hour: '21',
        user_id:"",
    },
    {
        reservation_id: '16',
        orlik_id: '1',
        day: 'Czwartek',
        start_hour:'16',
        end_hour: '17',
        user_id:"",
    },
    {
        reservation_id: '17',
        orlik_id: '1',
        day: 'Czwartek',
        start_hour:'17',
        end_hour: '18',
        user_id:"",
    },
    {
        reservation_id: '18',
        orlik_id: '1',
        day: 'Czwartek',
        start_hour:'18',
        end_hour: '19',
        user_id:"",
    },
    {
        reservation_id: '19',
        orlik_id: '1',
        day: 'Czwartek',
        start_hour:'19',
        end_hour: '20',
        user_id:"",
    },
    {
        reservation_id: '20',
        orlik_id: '1',
        day: 'Czwartek',
        start_hour:'20',
        end_hour: '21',
        user_id:"",
    },
    {
        reservation_id: '21',
        orlik_id: '1',
        day: 'Piątek',
        start_hour:'16',
        end_hour: '17',
        user_id:"",
    },
    {
        reservation_id: '22',
        orlik_id: '1',
        day: 'Piątek',
        start_hour:'17',
        end_hour: '18',
        user_id:"",
    },
    {
        reservation_id: '23',
        orlik_id: '1',
        day: 'Piątek',
        start_hour:'18',
        end_hour: '19',
        user_id:"",
    },
    {
        reservation_id: '24',
        orlik_id: '1',
        day: 'Piątek',
        start_hour:'19',
        end_hour: '20',
        user_id:"",
    },
    {
        reservation_id: '25',
        orlik_id: '1',
        day: 'Piątek',
        start_hour:'20',
        end_hour: '21',
        user_id:"",
    },
    {
        reservation_id: '26',
        orlik_id: '1',
        day: 'Sobota',
        start_hour:'16',
        end_hour: '17',
        user_id:"",
    },
    {
        reservation_id: '27',
        orlik_id: '1',
        day: 'Sobota',
        start_hour:'17',
        end_hour: '18',
        user_id:"",
    },
    {
        reservation_id: '28',
        orlik_id: '1',
        day: 'Sobota',
        start_hour:'18',
        end_hour: '19',
        user_id:"",
    },
    {
        reservation_id: '29',
        orlik_id: '1',
        day: 'Sobota',
        start_hour:'19',
        end_hour: '20',
        user_id:"",
    },
    {
        reservation_id: '30',
        orlik_id: '1',
        day: 'Sobota',
        start_hour:'20',
        end_hour: '21',
        user_id:"",
    },
    {
        reservation_id: '31',
        orlik_id: '1',
        day: 'Niedziela',
        start_hour:'16',
        end_hour: '17',
        user_id:"",
    },
    {
        reservation_id: '32',
        orlik_id: '1',
        day: 'Niedziela',
        start_hour:'17',
        end_hour: '18',
        user_id:"",
    },
    {
        reservation_id: '33',
        orlik_id: '1',
        day: 'Niedziela',
        start_hour:'18',
        end_hour: '19',
        user_id:"",
    },
    {
        reservation_id: '34',
        orlik_id: '1',
        day: 'Niedziela',
        start_hour:'19',
        end_hour: '20',
        user_id:"",
    },
    {
        reservation_id: '35',
        orlik_id: '1',
        day: 'Niedziela',
        start_hour:'20',
        end_hour: '21',
        user_id:"",
    },
];

function OrlikInfo(props){

    const [role, setRole] = useState("");
    const [thisId, setThisId] = useState("1");
    const [day, setDay] = useState("Poniedziałek");
    const [thisHour, setThisHour] = useState("0");
    const [thisData, setThisData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const dataId = location.state;

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

      Axios.defaults.withCredentials = true;

      const [dane, setDane] = useState([]);
      
  
      useEffect(() => {
          const getRezerwacje = () => {

              Axios.get(`http://localhost:3001/rezerwacjeorlik/${dataId.id}`).then((response) => {
              console.log(response.data);
              setDane(response.data);
          });
      
          }
          getRezerwacje();
        }, []);

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
    
      <div className="d-flex border border-3 float-end w-25">
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