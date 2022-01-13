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
                }else if(val.nazwisko.toLowerCase().includes(searchTerm.toLowerCase()) || val.imie.toLowerCase().includes(searchTerm.toLowerCase()) || val.adres.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val;
                }
            }).map((reservation) => (
                <ReservationItem 
                    key={reservation.id} 
                    id={reservation.id}
                    imie={reservation.imie}
                    nazwisko={reservation.nazwisko} 
                    adres={reservation.adres} 
                    data={reservation.data}
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
                    dzien={reservation.day}
                    start={reservation.start_hour}
                    end={reservation.end_hour}
                    siteD={props.site}
                />))}
        </li>
        
        </div>
        );
    }






    


}

    
export default ReservationItemList;