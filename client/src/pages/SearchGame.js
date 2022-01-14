import { useState, useEffect } from "react";
import ReservationItemList from "../components/reservation/ReservationItemList";
import Modal from "../components/ui/Modal";
import Axios from "axios";
function SearchGame () {
    const [dane, setDane] = useState([]);
    const userId = useState(sessionStorage.getItem("userId"));

    Axios.defaults.withCredentials = true;
    useEffect(() =>{
        //console.log(dataId);
        const getMecze = () => {

            Axios.get("http://localhost:3001/mecze").then((response) => {
                 console.log(response.data);
                 setDane(response.data);
             });
             
             }

        getMecze();
      },[]);

  const DUMMY_DATA = [
    {
        id: '1',
        imie: 'Artur',
        nazwisko: 'Góra',
        adres:'Wajdeloty 1',
        data:"19-09-2022",
        
    },
    {
        id: '2',
        imie: 'Darek',
        nazwisko: 'Pieczarek',
        adres:'Wajdeloty 3',
        data:"21-09-2022",
        
    },
];




return <div className="list-group"> 
<h1 className="text-center">Aktualne rezerwacje</h1> 
{/*   <PlayerItemList player={DUMMY_DATA}/> */}
<ReservationItemList site="game" reservation={dane}/>
{/* <Modal dane={DUMMY_DATA}/> */}
</div>;

}

export default SearchGame;