//import Modal from "../ui/Modal";
import { useState } from "react";
import Modal from 'react-modal'
import Axios from "axios";
function ReservationItem(props){

    // const [dataId, setDataId] = useState("");

 //   const dajOrlikId = async (id) => {
    
    //    setDataId(id);
      // console.log(dataId);
  //    }
  const [userid, setUserId] = useState(sessionStorage.getItem("userId"));
  const [thisData, setThisData] = useState([]);
  const [name, setName] = useState("");
  const [adres, setAdres] = useState("");
  const [data, setData] = useState("");
  const [id, setId] = useState("");
  const [player, setPlayer] = useState("");
  const [modalIsOpen, setModalisOpen] = useState(false);

    const initialState = thisData;

function closeModalHandler(){
    setModalisOpen(false);
    setThisData(initialState);
    console.log(thisData);
}

const sendMecz = () => {
    Axios.post(`http://localhost:3001/mecze/${props.id}/${player}/${"1"}`).then((response) => {
        console.log(response.data);
    });
}

const sendZapis = () => {
    Axios.put(`http://localhost:3001/zapisanienagre/${userid}/${props.game_id}`).then((response) => {
        console.log(response.data);
    });
}

 const setDane = async e => {
    setThisData(initialState);
    setName(props.imie);
    setAdres(props.adres);
    setData(props.data);
    setId(props.id);
 }
  function handleData(){
    //setThisData(initialState);
    //setModalisOpen(true);
    //setThisData([name,adres,data,id]);
    setThisData([props.dzien,props.adres,props.orlikId,props.id]);
    console.log(thisData);
};

 function testowa(){

    closeModalHandler();
    //handleData();
 }


 const site=props.siteD;
 if(site === "game"){

     return(
<div className=" w-75 h-25 mx-auto">
    <div className="card mb-4 w-100 mx-auto">

   {/*  <div>
        <img className="card-img-top" src={props.image} alt={props.title} />
    </div> */}
    <div className="card-body" >
    <div className="float-start w-75" >
    <h3>{props.adres}</h3>
        <h4>{props.school}</h4>
        <h4> {props.dzien} {props.id}</h4>
        <h4> Godzina: {props.start} - {props.end}</h4>
        <h4> Właściciel rezerwacji: {props.name} {props.surname}</h4>
    </div>


    <div  className="float-end w-25 m-auto text-center">


  <div className="row" >
    <div className="col-1" >&nbsp;</div>
    <div className="col-1" >&nbsp;</div>
    <div className="col-1" >&nbsp;</div>
    <div className="row" >
    <div className="col-1" ></div>
    <div className="col-10">
    <div className="w-100"  >
        <button type="button" className="btn-lg btn btn-dark mt-4"  onClick={() => {setModalisOpen(true)}}>
         Zapisz sie   
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
      <h3 className="modal-title">Okno szukania graczy</h3>
      </div>
    
    <div className="modal-body m-auto mt-4 text-center" style={{height:"250px"}}>
              <h4> {props.adres}  Godzina: {props.start} {props.id}</h4>
              <h5 className="mb-3"> Czy chcesz się zapisać na tę datę? </h5>

    
    </div>   
    <div className="fixed-bottom mb-2 me-2">
    <button type="button" className="border border 1 btn btn-light float-end" onClick={() => {setModalisOpen(false); console.log(modalIsOpen)}}> Anuluj </button>
    <button type="button" className="border border 1 btn btn-dark float-end" onClick={() => {setModalisOpen(false); sendZapis();}}> Zapisz </button>
    </div>
       
    </div>
    </div>
 
      </Modal>
    </div>
    </div>
    <div className="col-1" >&nbsp;</div>
    </div>
    
    <div className="row" >
    <div className="col-1" >&nbsp;</div>
    <div className="col-1" >&nbsp;</div>
    <div className="col-1" >&nbsp; </div>
    </div>

  </div>


    </div>


    </div>
</div>
{/* {modalIsOpen && (<Modal onCancel={closeModalHandler} dane={thisData}/>)} */}
</div>
     );
             
 }
 else if(site === "player"){
 
     return(
<div className=" w-75 h-25 mx-auto">
    <div className="card mb-4 w-100 mx-auto">

   {/*  <div>
        <img className="card-img-top" src={props.image} alt={props.title} />
    </div> */}
    <div className="card-body" >
    <div className="float-start w-75" >
    <br/>
    <h3>{props.adres}</h3>
        <h4> {props.dzien}</h4>
        <h5> Godzina: {props.start}-{props.end}</h5>
  
    </div>


    <div  className="float-end w-25 m-auto text-center">


  <div className="row" >
    <div className="col-1" >&nbsp;</div>
    <div className="col-1" >&nbsp;</div>
    <div className="col-1" >&nbsp;</div>
    <div className="row" >
    <div className="col-1" ></div>
    <div className="col-10">
    <div className="w-100"  >
        <button type="button" className="btn-lg btn btn-dark mt-4" onClick={() => {setModalisOpen(true)}}>
         Szukaj graczy  
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
      <h3 className="modal-title">Okno szukania graczy</h3>
      </div>
    
    <div className="modal-body m-auto mt-2 text-center" style={{height:"250px"}}>
              <h4> {props.adres}  Godzina: {props.start} {props.id}</h4>
              <h5 className="mb-3"> Wpisz ilu graczy szukasz </h5>
              <input type="text" onChange={event =>{setPlayer(event.target.value)}}/><br/>
    
    </div>   
    <div className="fixed-bottom mb-2 me-2">
    <button type="button" className="border border 1 btn btn-light float-end" onClick={() => {setModalisOpen(false); console.log(modalIsOpen)}}> Anuluj </button>
    <button type="button" className="border border 1 btn btn-dark float-end" onClick={() => {setModalisOpen(false); sendMecz();}}> Szukaj </button>
    </div>
       
    </div>
    </div>
 
      </Modal>

    </div></div>
    <div className="col-1">&nbsp;</div>
    </div>
    
    <div className="row">
    <div className="col-1">&nbsp;</div>
    <div className="col-1">&nbsp;</div>
    <div className="col-1">&nbsp; </div>
    </div>

  </div>


    </div>


    </div>
</div>
</div>
     );
 }



}

export default ReservationItem;