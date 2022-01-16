import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function PlayerItem(props){

    const [dataId, setDataId] = useState("");

 //   const dajOrlikId = async (id) => {
    
    //    setDataId(id);
      // console.log(dataId);
  //    }

const changeProfile = async (id) => {
    setDataId(id);

}



return <div className=" w-100 h-25 mx-auto">
    <div className="card mb-4 w-100 mx-auto text-center">

   {/*  <div>
        <img className="card-img-top" src={props.image} alt={props.title} />
    </div> */}

       <div className="card-body">
        <h3 className="m-auto w-100 h-100 bg-white border-0"> {props.imie} {props.nazwisko}</h3>
        <h5>Kontakt: {props.telefon[0]}{props.telefon[1]}{props.telefon[2]}-{props.telefon[3]}{props.telefon[4]}{props.telefon[5]}-{props.telefon[6]}{props.telefon[7]}{props.telefon[8]}</h5>


    </div> 
    
    
</div>

</div>

}

export default PlayerItem;