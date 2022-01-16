//import Modal from "../ui/Modal";
import { useState, useEffect } from "react";
import Modal from 'react-modal'
import Axios from "axios";
function ReservationItem(props){
    Axios.defaults.withCredentials = true;
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
  const [playerErr, setPlayerErr] = useState(false);
  const [playerErrMess, setPlayerErrMess] = useState("Niewłaściwa liczba graczy");
  const [errorLog, setErrorLog] = useState(false)
  const [errorLogMess, setErrorLogMess] = useState("Źle wprowadzone dane")
  const [checkval, setCheckVal] = useState("");
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [oki, setOki] = useState(false);
  const [TnC, setTnC] = useState(false);
  const [check, setCheck] = useState("0");

    const initialState = thisData;

const sendMecz = () => {

    if(Number(player)<12 && (playerErr===false)){
      Axios.post(`http://localhost:3001/mecze/${props.id}/${player}/${check}`).then((response) => {
        console.log(response.data);
    });
    }else{
setErrorLog(true);
    }
   
}

const sendZapis = () => {
    Axios.put(`http://localhost:3001/zapisanienagre/${userid}/${props.game_id}`).then((response) => {
        console.log(response.data);
        window.location.reload(false);
    });
}

const sendWypis = () => {
  Axios.delete(`http://localhost:3001/wypisaniezgry/${userid}/${props.game_id}`).then((response) => {
      console.log(response.data);
      window.location.reload(false);
  });
}

function handleForm(e)
{
  e.preventDefault();
  //sendMecz();
  console.log(TnC);
}
useEffect(() =>{
  const czyzapisany = () => {
    props.playersList.map((item,index) => {
      console.log(item);
      console.log(item.user_id);
      console.log(index);
      console.log(userid);
      if (item.user_id === Number(userid)){
        
        console.log(true);
        setOki(true);
        return true;
      }
      else{
        console.log(false);
        setOki(false);
        return false;
      }
    });
  
  }
  czyzapisany();
},[]);

 const site=props.siteD;
 if(site === "game"){



 console.log(oki);
   // if(props.user_id === Number(userid)){
      if(props.user_id === Number(userid)){    
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
                <h4> {props.dzien}</h4>
                <h4> Godzina: {props.start} - {props.end}</h4>
                <h4> Właściciel rezerwacji: {props.name} {props.surname}</h4>
                <h4> Ilość graczy: {props.players}/12</h4>
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
                <button type="button" className="btn-lg btn btn-dark mt-5 pe-none"  onClick={() => {setModalisOpen(true)}}>
                 Twoja rezerwacja  
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
                      <h4> {props.adres}  Godzina: {props.start}</h4>
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
    //else if(props.user_id !== Number(userid)){
      else if(oki===false && props.user_id !== Number(userid)){

      if(((props.players)<12)){
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
                  <h4> {props.dzien}</h4>
                  <h4> Godzina: {props.start} - {props.end}</h4>
                  <h4> Właściciel rezerwacji: {props.name} {props.surname}</h4>
                  <h4> Ilość graczy: {props.players}/12</h4>
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
                  <button type="button" className="btn-lg btn btn-dark mt-5"  onClick={() => {setModalisOpen(true)}}>
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
                        <h4> {props.adres}  Godzina: {props.start}</h4>
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

        }else{
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
                    <h4> {props.dzien}</h4>
                    <h4> Godzina: {props.start} - {props.end}</h4>
                    <h4> Właściciel rezerwacji: {props.name} {props.surname}</h4>
                    <h4> Ilość graczy: {props.players}/12</h4>
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
                    <button type="button" className="btn-lg btn btn-dark mt-5 pe-none"  onClick={() => {setModalisOpen(true)}}>
                     Max graczy   
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
                          <h4> {props.adres}  Godzina: {props.start}</h4>
                          <h5 className="mb-3"> Czy chcesz się wypisać? </h5>
            
                
                </div>   
                <div className="fixed-bottom mb-2 me-2">
                <button type="button" className="border border 1 btn btn-light float-end" onClick={() => {setModalisOpen(false); console.log(modalIsOpen)}}> Anuluj </button>
                <button type="button" className="border border 1 btn btn-dark float-end" onClick={() => {setModalisOpen(false); sendWypis();}}> Zapisz </button>
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

     
    }else if(oki===true){
      if(((props.players)<12)){
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
                <h4> {props.dzien}</h4>
                <h4> Godzina: {props.start} - {props.end}</h4>
                <h4> Właściciel rezerwacji: {props.name} {props.surname}</h4>
                <h4> Ilość graczy: {props.players}/12</h4>
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
                <button type="button" className="btn-lg btn btn-dark mt-5"  onClick={() => {setModalisOpen(true)}}>
                 Wypisz sie   
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
                      <h4> {props.adres}  Godzina: {props.start}</h4>
                      <h5 className="mb-3"> Czy chcesz się wypisać? </h5>
        
            
            </div>   
            <div className="fixed-bottom mb-2 me-2">
            <button type="button" className="border border 1 btn btn-light float-end" onClick={() => {setModalisOpen(false); console.log(modalIsOpen)}}> Anuluj </button>
            <button type="button" className="border border 1 btn btn-dark float-end" onClick={() => {setModalisOpen(false); sendWypis();}}> Wypis </button>
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
                  else{
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
                              <h4> {props.dzien}</h4>
                              <h4> Godzina: {props.start} - {props.end}</h4>
                              <h4> Właściciel rezerwacji: {props.name} {props.surname}</h4>
                              <h4> Ilość graczy: {props.players}/12 </h4>
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
                              <button type="button" className="btn-lg btn btn-dark mt-5"  onClick={() => {setModalisOpen(true)}}>
                               Wypisz się  
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
                                    <h4> {props.adres}  Godzina: {props.start}</h4>
                                    <h5 className="mb-3"> Czy chcesz się wypisać? </h5>
                      
                          
                          </div>   
                          <div className="fixed-bottom mb-2 me-2">
                          <button type="button" className="border border 1 btn btn-light float-end" onClick={() => {setModalisOpen(false); console.log(modalIsOpen)}}> Anuluj </button>
                          <button type="button" className="border border 1 btn btn-dark float-end" onClick={() => {setModalisOpen(false); sendWypis();}}> Wypisz </button>
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

    }
     
             
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
                  height:"400px",
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
              <h4> {props.adres}  godz. {props.start}</h4>
              <h5 className="mb-3"> Wpisz ilu graczy szukasz </h5>
              <input type="text" onChange={e =>{
                if(e.target.value.match("^(?:[0-9]{1,2})$")!=null){
                    setPlayerErr(false);
                    setErrorLog(false);
                    setPlayer(e.target.value)
                  }else{
                    setPlayerErr(true);
                    
                  }
                
               }} />
                  <p className={playerErr ? ' text-danger' :'d-none text-danger' }>{playerErrMess}</p>

              <h5 className="mt-2">Czy to turniej?</h5>
              <input type="checkbox" onChange={(e) => {setTnC(e.target.checked); console.log(TnC);
                if(TnC === false){
                 setCheck(1);
               }else if(TnC===true) {
                setCheck(0);
               }}} />
              <p className={errorLog ? ' text-danger' :'d-none text-danger' }>{errorLogMess}</p>
    </div>   
    <div className="fixed-bottom mb-2 me-2">
    <button type="button" className="border border 1 btn btn-light float-end" onClick={() => {setModalisOpen(false); console.log(modalIsOpen)}}> Anuluj </button>
    <button type="button" className="border border 1 btn btn-dark float-end" onClick={() => {setModalisOpen(false); sendMecz()}}> Szukaj </button>
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
 else if(site === "profile"){
  return(
    <div className=" w-100 h-25 mx-auto">
        <div className="card mb-4 w-100 mx-auto">
    
       {/*  <div>
            <img className="card-img-top" src={props.image} alt={props.title} />
        </div> */}
        <div className="card-body" >
        <div className="float-start w-100" >
        <h3>{props.adres}</h3>
            <h4> {props.dzien}</h4>
            <h5> Godzina: {props.start}-{props.end}</h5>
            <h5> Ilość graczy: {props.players}/12</h5>
        </div>
    
    
        <div  className="float-end w-25 m-auto text-center">
    
    
        </div>
    
    
        </div>
    </div>
    </div>
         );
 }



}

export default ReservationItem;