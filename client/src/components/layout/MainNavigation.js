import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import Axios from "axios";

function MainNavigation () {

    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");

    Axios.defaults.withCredentials = true;
    
    useEffect(() => {
        Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
            if(response.data.loggedIn === true){
                setRole("logged");
                setUsername(response.data.user[0].name);
                console.log(response);
            }else{
                setRole("visitor");
            }
            
          });
            
            
      

      }, []);

    const logout = async() => {

        Axios.get("http://localhost:3001/wylogowanie").then((response) => {
            console.log(response);
            window.location.reload(false);
            window.location = "/";
        });

    }



    if(role==="logged"){
       

    return( 
        <div>
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <div className="navbar-brand">Orlik Lublin</div>
    <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
            <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/'> Strona główna </Link> </li>
            <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/orliki'> Orliki</Link></li>
            <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/gry'> Szukaj orlików </Link></li>
            <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/gracze'> Szukaj graczy </Link></li>
            <li className="nav-item dropdown">
      <li className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {username}
      </li>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
        <li><Link className="dropdown-item" to="/profil">Profil</Link></li>
        <li><Link className="dropdown-item" to="/friends">Znajomi</Link></li>
        <li><button className="dropdown-item" onClick={logout}>Wyloguj</button></li>
      </ul>
    </li>
            {/* <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/rejestracja'> Rejestracja </Link> </li> */}

        </ul>
    </div>
    </div>
    </nav>
    </div>
);


    }
    else{
        return( 
            <div>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <div className="navbar-brand">Orlik Lublin</div>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/'> Strona główna </Link> </li>
                <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/orliki'> Orliki</Link></li>
                <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/login'> Zaloguj się </Link> </li>
                {/* <li className="nav-item"> <Link className="nav-link text-decoration-none" to='/rejestracja'> Rejestracja </Link> </li> */}

            </ul>
        </div>
        </div>
        </nav>
        </div>
    );
    }
    
}

export default MainNavigation;