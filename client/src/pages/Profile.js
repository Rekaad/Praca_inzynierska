import Modal from "../components/ui/Modal";
import {useState, useEffect} from "react";
import Axios from "axios";

function Profile(){

    //const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");


    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
            if(response.data.loggedIn === true){
                //setRole("logged");
                setUsername(response.data.user[0].name);
                setPhone(response.data.user[0].phone);
                console.log(response);
            }else{
               // setRole("visitor");
            }
            
          });
            
            
      

      }, []);

return <div className="w-75 mx-auto">

 <div className="card mb-4 w-75 mx-auto text-center mt-4 border border-5">
<section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center">
                <div className="col px-md-0 ">
                        <div className="">
                            <img className="w-75 float-start" src="http://studio-kreacji.pl/wp-content/uploads/2016/10/blank-avatar.png" title="" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">Opis profilu</h3>
                            <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                            <div className="row about-list mt-5">
                                <div className="col-lg-6">

                                    <div className="media">
                                        <label className="fw-bold">Wiek</label>
                                        <p>22 Yr</p>
                                    </div>

                                   
                                    
                                </div>
                                <div className="col-md-6">



                                <div className="media">
                                        <label className="fw-bold">Numer telefonu</label>
                                        <p>{phone}</p>
                                    </div>
                                  

                                </div>
                                <div className="media">
                                    <div className="count-data text-center">

                                    <button type="button" className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#modalchange">Zmień hasło</button>
                                    </div>
                                  <Modal dane={"haslo"}/>
                                    </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        
</div>

</div>


}

export default Profile;