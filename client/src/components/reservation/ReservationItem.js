import Modal from "../ui/Modal";
import { useState } from "react";
function ReservationItem(props){

    // const [dataId, setDataId] = useState("");

 //   const dajOrlikId = async (id) => {
    
    //    setDataId(id);
      // console.log(dataId);
  //    }
  const [thisData, setThisData] = useState([]);
  const [name, setName] = useState("");
  const [adres, setAdres] = useState("");
  const [data, setData] = useState("");
  const [id, setId] = useState("");
    const [modalIsOpen, setModalisOpen] = useState(false);

    const initialState = thisData;

function closeModalHandler(){
    setModalisOpen(false);
    setThisData(initialState);
    console.log(thisData);
}

const resetData = async e =>{
    setThisData(initialState);
    console.log(thisData);
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
    console.log(thisData);
    setModalisOpen(true);
    //setThisData([name,adres,data,id]);
    setThisData([props.imie,props.adres,props.data,props.id]);
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
        <h4> {props.data}</h4>
        <h4> {props.imie}</h4>
        <h4> id {props.id}</h4>
    </div>


    <div  className="float-end w-25 m-auto text-center">


  <div className="row" onMouseEnter={closeModalHandler}>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="row" >
    <div className="col-1" onMouseEnter={closeModalHandler}></div>
    <div className="col-10">
    <div className="w-100" onMouseOver={handleData} >
        <button type="button" className="btn-lg btn btn-dark mt-4" data-bs-toggle="modal" data-bs-target="#modal2">
         Zapisz sie   
        </button>
        
    </div></div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    </div>
    
    <div className="row" onMouseEnter={closeModalHandler}>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp; </div>
    </div>

  </div>


    </div>


    </div>
</div>
{modalIsOpen && (<Modal onCancel={closeModalHandler} dane={thisData}/>)}
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
        <h4> {props.data}</h4>
  
    </div>


    <div  className="float-end w-25 m-auto text-center">


  <div className="row" onMouseEnter={closeModalHandler}>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="row" >
    <div className="col-1" onMouseEnter={closeModalHandler}></div>
    <div className="col-10">
    <div className="w-100" onMouseOver={handleData} >
        <button type="button" className="btn-lg btn btn-dark mt-4" data-bs-toggle="modal" data-bs-target="#modal3">
         Szukaj graczy  
        </button>
        
    </div></div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    </div>
    
    <div className="row" onMouseEnter={closeModalHandler}>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp;</div>
    <div className="col-1" onMouseEnter={closeModalHandler}>&nbsp; </div>
    </div>

  </div>


    </div>


    </div>
</div>
{modalIsOpen && (<Modal onCancel={closeModalHandler} dane={thisData}/>)}
</div>
     );
 }



}

export default ReservationItem;