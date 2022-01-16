import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import PlayerItemList from '../components/players/PlayerItemList';

function Players(){


    Axios.defaults.withCredentials = true;

    const [dane, setDane] = useState([]);

    useEffect(() => {
        const getDane = async () => {

           await Axios.get("http://localhost:3001/uzytkownicy").then((response) => 
           {
              console.log(response);
                setDane(response.data);
            }
          );
        };
        
        getDane();
      }, []);

      console.log("test");

      return(
        <div className="list-group"> 
                    <h1 className="text-center">Lista użytkowaników</h1> 
                    
                  <PlayerItemList player={dane}/>
                </div>
                );
}


export default Players;