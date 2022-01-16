import { useState } from "react";
import PlayerItem from "./PlayerItem";

function PlayerItemList(props){

    const [searchTerm, setSearchTerm] = useState('');

    return(
        <div>
    <div className="d-block text-center mb-3">
    <input type="text" placeholder="Search..." onChange={event =>{setSearchTerm(event.target.value)}}/>
    </div>
    <li className="list-group-numbered bg-grey w-100 mx-auto ">
        {props.player.filter((val)=> {
            if(searchTerm===""){
                return val;
            }else if(val.surname.toLowerCase().includes(searchTerm.toLowerCase()) || val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;
            }
        }).map((player) => (
            <PlayerItem 
                key={player.user_id} 
                id={player.user_id}
                imie={player.name}
                nazwisko={player.surname}
                telefon = {player.phone}
                
            />))}
    </li>
    </div>
    );


}

    
export default PlayerItemList;