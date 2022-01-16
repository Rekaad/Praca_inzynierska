import { useState, useEffect } from "react";
import ReservationItemList from "../components/reservation/ReservationItemList";
import Modal from "../components/ui/Modal";
import Axios from "axios";
function SearchGame () {
    const [dane, setDane] = useState([]);
    const userId = useState(sessionStorage.getItem("userId"));
    const [isLoading, setIsLoading] = useState(true);

    Axios.defaults.withCredentials = true;
    useEffect(() =>{
        setIsLoading(true);
        //console.log(dataId);
        const getMecze = () => {

            Axios.get("http://localhost:3001/mecze").then((response) => {
                 console.log(response.data);
                 setDane(response.data);
                 setIsLoading(false);
             });
             
             }

        getMecze();
      },[]);


if(isLoading){
    return( <section>
        <p>
            Ładowanie
        </p>
    </section>);
   
}
else{
    return (<div className="list-group"> 
    <h1 className="text-center">Aktualne rezerwacje</h1> 
    {/*   <PlayerItemList player={DUMMY_DATA}/> */}
    <ReservationItemList site="game" reservation={dane}/>
    

    {/* <Modal dane={DUMMY_DATA}/> */}
    </div>);
}



}

export default SearchGame;