import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";

function MainNavigation () {

    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    
    useEffect(() => {

            setRole("logged");
            setUsername("User1");
      

      }, []);

    const logout = async() => {

        //tutaj zapytanie wylogowania??
        console.log("test1");
        console.log("Wylogowano "+ username);
        setRole("visitor");
        //window.location.reload(false);
        //window.location = "/";

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