import { useEffect,useState } from "react";
import Modal from 'react-modal'
import  Axios  from "axios";
function ReservationInnerItem(props){

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userid, setUserId] = useState("");
    const [reservationId, setReservationId] = useState("4");
    const [loginStatus, setLoginStatus] = useState('');

    const initialState = reservationId;

    useEffect(() => {
        Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
            if(response.data.loggedIn === true){
                //setRole("logged");
                setUserId(response.data.user[0].user_id);
                //console.log(response);
            }else{
               // setRole("visitor");
            }
            
          });
            
            
      

      }, []);

    Axios.defaults.withCredentials = true;
    const reserve = () => {
      Axios.put(`http://localhost:3001/rezerwacja/${reservationId}/${userid}`).then((response) => {
          if(response.data.message){
            setLoginStatus(response.data.message);
            console.log(reservationId);
            console.log(userid);
            console.log(response);
            window.location.reload(true);
        }else{
            console.log(response);
        }
      });
    };

    return (
        <div >
        <button className={props.user_id ? "m-auto p-2 bg-danger border-0 text-light pe-none rounded-pill" : "m-auto p-2 bg-success border-0 text-light rounded-pill" } style={{width:"150px"}} onClick={() => {setModalIsOpen(true)}} onMouseOver= { () =>{setReservationId(props.id)}}>

            {props.start_hour}-{props.end_hour}
        </button>
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
      <h3 className="modal-title">Okno rezerwacji</h3>
      </div>
    
    <div className="modal-body m-auto mt-5" style={{height:"250px"}}>
              <h5> Czy chcesz dokonać rezerwacji na godzinę {props.start_hour}?</h5>
 
    
    </div>   
    <div className="fixed-bottom mb-2 me-2">
    <button type="button" className="border border 1 btn btn-light float-end" onClick={() => {setModalIsOpen(false); console.log(modalIsOpen)}}> Anuluj </button>
    <button type="button" className="border border 1 btn btn-dark float-end" onClick={() => {setModalIsOpen(false); reserve()}}> Zarezerwuj </button>
    </div>
       
    </div>
    </div>
 
      </Modal>
        </div>
    );




}

export default ReservationInnerItem;