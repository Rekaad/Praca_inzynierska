import PlayerItemList from "../components/players/PlayerItemList";
import ReservationItemList from "../components/reservation/ReservationItemList";

function SearchPlayers() {

    const DUMMY_DATA = [
        {
            id: '1',
            imie: 'tutaj zalogowany wlasciciel',
            nazwisko: 'Góra',
            adres:'Wajdeloty 1',
            data:"11-09-2022",
            
        },
    ];


    return <div className="list-group"> 
    <h1 className="text-center">Twoje rezerwacje</h1> 
  {/*   <PlayerItemList player={DUMMY_DATA}/> */}
  <ReservationItemList site="player" reservation={DUMMY_DATA} />
</div>;
    

}

export default SearchPlayers;