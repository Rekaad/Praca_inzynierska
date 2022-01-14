import PlayerItemList from "../components/players/PlayerItemList";
import ReservationItemList from "../components/reservation/ReservationItemList";
import { useState,useEffect } from "react";
import Axios from "axios";

function SearchPlayers() {


    const [role, setRole] = useState(sessionStorage.getItem("role"));
    const [dane, setDane] = useState([]);
    const userId = useState(sessionStorage.getItem("userId"));
    const DUMMY_DATA = [
        {
            id: '1',
            imie: 'tutaj zalogowany wlasciciel',
            nazwisko: 'Góra',
            adres:'Wajdeloty 1',
            data:"11-09-2022",
            
        },
    ];


    Axios.defaults.withCredentials = true;
    useEffect(() =>{
        const checklogin = async() => { 
            await Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
            if(response.data.loggedIn === true){
                //setRole("logged");
                console.log(response.data.user[0].user_id);
                console.log(response);
            }else{
                
                setRole("visitor");
            }
          });}
        //console.log(dataId);
        const getRezerwacje = () => {

            Axios.get(`http://localhost:3001/rezerwacjeuser/${userId}`).then((response) => {
                 console.log(response.data);
                 setDane(response.data);
             });
             
             }

        checklogin();
        getRezerwacje();
        console.log(dane);
        console.log(localStorage);
      },[]);


    return <div className="list-group"> 
    <h1 className="text-center">Twoje rezerwacje</h1> 
  {/*   <PlayerItemList player={DUMMY_DATA}/> */}
  <ReservationItemList site="player" reservation={dane} />
</div>;
    

}

export default SearchPlayers;