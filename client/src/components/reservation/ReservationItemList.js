import { useState } from "react";

import ReservationItem from "./ReservationItem";

function ReservationItemList(props){

    const [searchTerm, setSearchTerm] = useState('');


    const site=props.site;
    if(site === "game"){

        return(

      
            <div>
        <div className="d-block text-center mb-3">
        <input type="text" placeholder="Search..." onChange={event =>{setSearchTerm(event.target.value)}}/>
        </div>
        <li className="list-group-numbered bg-grey w-75 mx-auto ">
            {props.reservation.filter((val)=> {
                if(searchTerm===""){
                    return val;
                }else if(val.adress.toLowerCase().includes(searchTerm.toLowerCase()) || val.day.toLowerCase().includes(searchTerm.toLowerCase()) || val.day.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val;
                }
            }).map((reservation) => (
                <ReservationItem 
                    key={reservation.reservation_id} 
                    id={reservation.reservation_id}
                    orlikId = {reservation.orlik_id}
                    user_id = {reservation.user_id}
                    adres={reservation.adress} 
                    school = {reservation.school}
                    game_id = {reservation.game_id}
                    players = {reservation.players}
                    playersList = {reservation.playersList}
                    dzien={reservation.day}
                    name = {reservation.name}
                    surname = {reservation.surname}
                    start={reservation.start_hour}
                    end={reservation.end_hour}
                    siteD={props.site}
                />))}
        </li>
        
        </div>
        );
                
    }
    else if(site === "player"){
    
        return(

      
            <div>
        <li className="list-group-numbered bg-grey w-75 mx-auto ">
            {props.reservation.map((reservation) => (
                <ReservationItem 
                    key={reservation.reservation_id} 
                    id={reservation.reservation_id}
                    orlikId = {reservation.orlik_id}
                    adres={reservation.adress} 
                    playersList = {[0]}
                    dzien={reservation.day}
                    start={reservation.start_hour}
                    end={reservation.end_hour}
                    siteD={props.site}
                />))}
        </li>
        
        </div>
        );
    }
    else if(site==="profile"){

        
        return(

      
            <div>
        <li className="list-group-numbered bg-grey w-100 mx-auto ">
            {props.game.map((game,index) => (
                <ReservationItem 
                    key={game.game_id} 
                    id={game.game_id}
                    adres= {props.reservation[index].adress}
                    dzien={props.reservation[index].day}
                    start={props.reservation[index].start_hour}
                    end={props.reservation[index].end_hour}
                    players = {game.players}
                    playersList = {[0]}
                    siteD={props.site}
                />))}
        </li>
        
        </div>
        );

    }






    


}

    
export default ReservationItemList;