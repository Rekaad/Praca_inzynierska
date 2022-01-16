// import Modal from "../components/ui/Modal";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import ReservationItemList from "../components/reservation/ReservationItemList";
import PlayerItemList from "../components/players/PlayerItemList";

function Profile() {
  //const [role, setRole] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [nextId, setNextId] = useState(sessionStorage.getItem("userId"));
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [dane, setDane] = useState([]);
  const [daneUsers, setDaneUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [akualnehaslozap, setAktualnehaslozap] = useState("");
  const [aktualnehaslo, setAktualneHaslo] = useState("");
  const [nowehaslo, setNoweHaslo] = useState("");
  const [nowehaslo2, setNoweHaslo2] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [phoneChangeStatus, setPhoneChangeStatus] = useState(false);
  const [phoneChangeStatusMess, setPhoneChangeStatusMess] = useState("Numer może zawierać tylko cyfry");
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [numberErr, setNumberErr] = useState(false);
  const [btn, setBtn] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const dataId = location.state;

  Axios.defaults.withCredentials = true;

  const zmianaHasla = () => {
    if (nowehaslo === nowehaslo2) {
      Axios.put(`http://localhost:3001/zmianahasla/${userId}`, {
        email: email,
        oldpassword: aktualnehaslo,
        newpassword: nowehaslo,
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);

          console.log(response);
        } else {
          console.log(response);

          //window.location.reload(false);
          //window.location = "/";
        }
      });
    } else {
      console.log(akualnehaslozap);
      console.log("test");
    }
  };

  const zmianaNumeru = () => {
      Axios.put(`http://localhost:3001/zmiananumeru/${userId}`, {
        id: userId,
        phone: newPhone,
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);

          console.log(response);
          window.location.reload(false);
        } else {
          console.log(response);

          //window.location.reload(false);
          //window.location = "/";
        }
      });
  };

  const numberControl = () => {

if(newPhone.length===9){
    setNumberErr(false);
    zmianaNumeru();
    setModalisOpen(false);
}
else{
    setNumberErr(true);
    console.log("zle dane");
}

  };

  useEffect(() => {
    setIsLoading(true);
    

    Axios.get("http://localhost:3001/zalogowanie").then((response) => {
        if (response.data.loggedIn === true) {
          //setRole("logged");
          setUsername(response.data.user[0].name);
          setAktualnehaslozap(response.data.user[0].password);
          setPhone(response.data.user[0].phone);
         // setUserId(response.data.user[0].user_id);
          //setUserId(response.data.user[0].user_id);
          console.log(response);
        } else {
          // setRole("visitor");
        }
      });

   const getDane = async() => {
   await Axios.get(`http://localhost:3001/uzytkownicy/${userId}`).then(
      (response) => {
        console.log(response);
  
        setDane(response.data);
    setIsLoading(false);
       
      }
    );
   } 

    getDane();
    console.log(userId);
    setNextId(dataId);
  }, []);


  if (isLoading) {
    console.log(dataId);
    return (
      <section>
        <p>Ładowanie...</p>
      </section>
    );
  } else { 

    console.log(dataId);
    console.log(nextId);
        return (
            <div className="w-75 mx-auto">
              <div className="card mb-4 w-75 mx-auto text-center mt-4 border border-5">
                <div className=" text-center">
                  <div className="container text-center">
                    <div className="row align-items-center">
                      <h3 className="dark-color">
                        {" "}
                        {dane.user.name} {dane.user.surname}
                      </h3>
      
                      <div className="">
                        <label className="fw-bold">Numer telefonu</label>
                        <p>{dane.user.phone}</p>
                      </div>
      
                      <div className="">
                        <div className="float-start">
                          <button
                            type="button"
                            className="btn btn-dark btn-lg m-2"
                            onClick={() => {
                              setModalisOpen(true);
                              setBtn(true);
                            }}
                          >
                            Zmień hasło
                          </button>
      
                        </div>
                        <div className="float-end">
                      
                          <button
                            type="button"
                            className="btn btn-dark btn-lg m-2"
                            onClick={() => {
                              setModalisOpen(true);
                              setBtn(false);
                            }}
                          >
                            Zmień numer
                          </button>
      
                        </div>
                        {btn ? 
                        (<Modal
                            isOpen={modalIsOpen}
                            ariaHideApp={false}
                            style={{
                              overlay: {
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(80, 83, 90, 0.75)",
                              },
                              content: {
                                width: "500px",
                                height: "300px",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                right: "40px",
                                bottom: "40px",
                                border: "1px solid #ccc",
                                background: "#fff",
                                overflow: "auto",
                                WebkitOverflowScrolling: "touch",
                                borderRadius: "4px",
                                outline: "none",
                                padding: "0px",
                              },
                            }}
                          >
                            <div className="modal-dialog-scrollable">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h3 className="modal-title">Okno zmiany hasła</h3>
                                </div>
      
                                <div
                                  className="modal-body m-auto mt-4 text-center"
                                  style={{ height: "250px" }}
                                >
                                  <form autoComplete="off">
                                    <div className="col">
                                      <div className="row">
                                       
                                        <div className="text-center">
                                          <label className=""> Wpisz aktualne hasło </label>
                                          <input
                                            type="password"
                                            className="ms-2"
                                            onChange={(e) => {
                                              setAktualneHaslo(e.target.value);
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                       
                                        <div className="text-center">
                                          Wpisz nowe hasło &nbsp;
                                          <input
                                            type="text"
                                            className="ms-4"
                                            onChange={(e) => {
                                              setNoweHaslo(e.target.value);
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                    
                                        <div className="text-center">
                                          Powtórz nowe hasło
                                          <input
                                            type="text"
                                            className="ms-3"
                                            onChange={(e) => {
                                              setNoweHaslo2(e.target.value);
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="fixed-bottom mb-2 me-2">
                                  <button
                                    type="button"
                                    className="border border 1 btn btn-light float-end"
                                    onClick={() => {
                                      setModalisOpen(false);
                                      console.log(modalIsOpen);
                                    }}
                                  >
                                  
                                    Anuluj
                                  </button>
                                  <button
                                    type="button"
                                    className="border border 1 btn btn-dark float-end"
                                    onClick={() => {
                                      setModalisOpen(false);
                                      zmianaHasla();
                                    }}
                                  >
                                  
                                    Zapisz
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Modal>) : 
                          (<Modal
                            isOpen={modalIsOpen}
                            ariaHideApp={false}
                            style={{
                              overlay: {
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(80, 83, 90, 0.75)",
                              },
                              content: {
                                width: "500px",
                                height: "300px",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                right: "40px",
                                bottom: "40px",
                                border: "1px solid #ccc",
                                background: "#fff",
                                overflow: "auto",
                                WebkitOverflowScrolling: "touch",
                                borderRadius: "4px",
                                outline: "none",
                                padding: "0px",
                              },
                            }}
                          >
                            <div className="modal-dialog-scrollable">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h3 className="modal-title">Okno zmiany numeru</h3>
                                </div>
      
                                <div
                                  className="modal-body m-auto mt-3 text-center"
                                  style={{ height: "250px" }}
                                >
                                  <form autoComplete="off">
                                    <div className="col">
                                      <div className="row">
                                       
                                        <div className="text-center">
                                          <h4>Wpisz nowy numer </h4>
                                          <input
                                            type="text"
                                            className="mt-2"
                                            maxLength={9}
                                            minLength={9}
                                            onChange={(e) => {
                                                if(e.target.value.match("^(?:[0-9]{0,9})$")!=null){
                                                    setPhoneChangeStatus(false);
                                                    setNewPhone(e.target.value);
                                                }else{
                                                    setPhoneChangeStatus(true);
                                                     }
                                              
                                            }}
                                          />
                                         <p className={phoneChangeStatus ? ' text-danger' :'d-none text-danger' }>{phoneChangeStatusMess}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="fixed-bottom mb-2 me-2">
                                  <button
                                    type="button"
                                    className="border border 1 btn btn-light float-end"
                                    onClick={() => {
                                      setModalisOpen(false);
                                      console.log(modalIsOpen);
                                    }}
                                  >
                                  
                                    Anuluj
                                  </button>
                                  <button
                                    type="button"
                                    className="border border 1 btn btn-dark float-end"
                                    onClick={() => {
                                      
                                      numberControl();
                                    }}
                                  >
                                  
                                    Zapisz
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Modal>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      
              <div className="w-100 mx-auto">
          
                <div className="w-100">
                <h1 className="text-center" > Mecze użytkownika</h1>
                
                <div
                  className="border border-4 offcanvas-body w-100 m-1"
                  style={{ height: "550px" }}
                >
            <ReservationItemList site="profile" reservation={dane.reservation} game={dane.game} />
            {console.log(dane.game)}
      
                </div>
                </div>
                
              </div>
            </div>
          );
      }

    
  }


export default Profile;
