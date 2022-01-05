import { useState } from "react";
import PlayerItem from "./PlayerItem";

function PlayerItemList(props){

    const [searchTerm, setSearchTerm] = useState('');

    return(
        <div>
    <div className="d-block text-center mb-3">
    <input type="text" placeholder="Search..." onChange={event =>{setSearchTerm(event.target.value)}}/>
    </div>
    <li className="list-group-numbered bg-grey w-75 mx-auto ">
        {props.player.filter((val)=> {
            if(searchTerm===""){
                return val;
            }else if(val.nazwisko.toLowerCase().includes(searchTerm.toLowerCase()) || val.imie.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;
            }
        }).map((player) => (
            <PlayerItem 
                key={player.id} 
                id={player.id}
                imie={player.imie}
                nazwisko={player.nazwisko} 
                wiek={player.wiek} 
                zdjecie={player.zdjecie}
            />))}
    </li>
    </div>
    );


}

    
export default PlayerItemList;