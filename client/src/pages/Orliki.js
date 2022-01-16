import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import OrlikiItemList from "../components/orliki/OrlikItemList";

function Orliki(){

    Axios.defaults.withCredentials = true;

    const [dane, setDane] = useState([]);
    

    useEffect(() => {
        const getDane = async () => {

           const getdata = await Axios.get("http://localhost:3001/orliki").then((response) => {
            console.log(response.data);
            setDane(response.data);
        });
        
        }
        getDane();
      }, []);

      


console.log(dane);

return(
<div className="list-group"> 
            <h1 className="text-center">Lista orlików</h1> 
            
          <OrlikiItemList orliki={dane}/>
        </div>
        );
}

export default Orliki;