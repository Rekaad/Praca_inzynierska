import ReservationInnerItem from "./ReservationInnerItem";
import Modal from "../ui/Modal";
function ReservationInnerItemList(props){
return(
    <div className="mb-2">

    
    <div> 
    <h5> Poniedziałek</h5> 
    <div className="d-flex justify-content-between ms-2 me-2">
    {props.reservationinner.map(reservation => {
            if(reservation.day === "Poniedziałek"){
                return <ReservationInnerItem
            key = {reservation.reservation_id}
            id = {reservation.reservation_id}
            orlik_id = {reservation.orlik_id}
            start_hour = {reservation.start_hour}
            end_hour = {reservation.end_hour}
            user_id = {reservation.user_id}
            />
            }
        })}
        
        </div>
    </div>
  
    <div>
     <h5> Wtorek</h5>
     <div className="d-flex justify-content-between ms-2 me-2">
     {props.reservationinner.map(reservation => {
            if(reservation.day === "Wtorek"){
                return <ReservationInnerItem
            key = {reservation.reservation_id}
            id = {reservation.reservation_id}
            orlik_id = {reservation.orlik_id}
            start_hour = {reservation.start_hour}
            end_hour = {reservation.end_hour}
            user_id = {reservation.user_id}
            />
            }
            
        })}
        </div>
     </div>

     <div>
     <h5> Środa</h5>
     <div className="d-flex justify-content-between ms-2 me-2">
     {props.reservationinner.map(reservation => {
            if(reservation.day === "Środa"){
                return <ReservationInnerItem
            key = {reservation.reservation_id}
            id = {reservation.reservation_id}
            orlik_id = {reservation.orlik_id}
            start_hour = {reservation.start_hour}
            end_hour = {reservation.end_hour}
            user_id = {reservation.user_id}
            />
            }
            
        })}
        </div>
     </div>

     <div>
     <h5> Czwartek</h5>
     <div className="d-flex justify-content-between ms-2 me-2">
     {props.reservationinner.map(reservation => {
            if(reservation.day === "Czwartek"){
                return <ReservationInnerItem
            key = {reservation.reservation_id}
            id = {reservation.reservation_id}
            orlik_id = {reservation.orlik_id}
            start_hour = {reservation.start_hour}
            end_hour = {reservation.end_hour}
            user_id = {reservation.user_id}
            />
            }
            
        })}
        </div>
     </div>

     <div>
     <h5> Piatek </h5>
     <div className="d-flex justify-content-between ms-2 me-2">
     {props.reservationinner.map(reservation => {
            if(reservation.day === "Piątek"){
                return <ReservationInnerItem
            key = {reservation.reservation_id}
            id = {reservation.reservation_id}
            orlik_id = {reservation.orlik_id}
            start_hour = {reservation.start_hour}
            end_hour = {reservation.end_hour}
            user_id = {reservation.user_id}
            />
            }
            
        })}
        </div>
     </div>
     <div>
     <h5> Sobota </h5>
     <div className="d-flex justify-content-between ms-2 me-2"> 
     {props.reservationinner.map(reservation => {
            if(reservation.day === "Sobota"){
                return <ReservationInnerItem
            key = {reservation.reservation_id}
            id = {reservation.reservation_id}
            orlik_id = {reservation.orlik_id}
            start_hour = {reservation.start_hour}
            end_hour = {reservation.end_hour}
            user_id = {reservation.user_id}
            />
            }
            
        })}
        </div>
     </div>
     <div>
     <h5> Niedziela </h5>
     <div className="d-flex justify-content-between ms-2 me-2">
     {props.reservationinner.map(reservation => {
            if(reservation.day === "Niedziela"){
                return <ReservationInnerItem
            key = {reservation.reservation_id}
            id = {reservation.reservation_id}
            orlik_id = {reservation.orlik_id}
            start_hour = {reservation.start_hour}
            end_hour = {reservation.end_hour}
            user_id = {reservation.user_id}
            />
            }
            
        })}
        
        </div>
     </div>


        {/* {props.reservationinner[0].day}
        {props.reservationinner[6].day} */}
        
        
    </div>
);

}

export default ReservationInnerItemList;