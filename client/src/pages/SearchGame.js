import { useState, useEffect } from "react";
import ReservationItemList from "../components/reservation/ReservationItemList";
import Modal from "../components/ui/Modal";
function SearchGame () {


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
<ReservationItemList site="game" />
{/* <Modal dane={DUMMY_DATA}/> */}
</div>;

}

export default SearchGame;