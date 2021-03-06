import mainpage from "../img/mainpage.png";
import { useState, useEffect } from "react";
import  Axios  from "axios";
function MainPage() {
  const [role, setRole] = useState(sessionStorage.getItem("role"));
  const [username, setUsername] = useState("");
  const [news, setNews] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  Axios.defaults.withCredentials = true;
    
  useEffect(() => {
    setIsLoading(true);
     const checklogin = async () => {
     await Axios.get("http://localhost:3001/zalogowanie").then((response) => { 
        if(response.data.loggedIn === true){
            //setRole("logged");
            setUsername(response.data.user[0].name);
            console.log(response);
        }else{
            setRole("visitor");
        }
        
      });
     }
     
     const getNews = async() => {

      await Axios.get("http://localhost:3001/aktualnosci").then((response) => {
                 console.log(response);
                 setNews(response.data);
                 setIsLoading(false);
             });

     }
          
        checklogin();  
        getNews();

    }, []);

    console.log(news);
    if (isLoading) {
      return (
        <section>
          <p>Ładowanie...</p>
        </section>
      );
    }else {
      if (role === "logged") {
        return (
          <div className="">
            <div className="float-start w-40 mt-5 ms-5 border border-3 border-dark rounded">
              <div className="card-body">
                <div className="float-start w-75 mt-3">
                  <h1> Orlik Lublin </h1>
                  <div className="ms-2 mb-5">
                    <h4 className="text-secondary"> Zalogowany jako: {sessionStorage.getItem('name')}</h4>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="float-end w-25 m-4">
              <img src={require("../img/mainpage.png").default} alt="" />
            </div>
            <div className="fixed-bottom">
              <h1 className="text-center mt-2 mb-2"> Aktualności </h1>
              <hr />
    
              <div className="m-auto" style={{ width: "60%", height: "250px" }}>
                <div
                  className=" mb-3 text-center border border-4 border border-dark"
                  style={{ height: "40%" }}
                >
    
    
                  <h3 className="mt-4">{news[0].content}</h3>
    
                </div>
    
                <div
                  className=" mb-2 text-center border border-4 border border-dark "
                  style={{ height: "40%" }}
                >
    
                  <h3 className="mt-4">{news[1].content}</h3>
                  
                </div>
                {/* <div className="float-start bg-dark w-25 mb-3" style={{height: "100px"}}> aaa</div>
    
      <div className="border border-1 float-end w-75 mb-3">
      
        <div className=" w-100 m-3">
          <h2 className="mb-1">List group item heading</h2>
    
        </div>
        <h5 className="mb-1">Some placeholder content in a paragraph.</h5>
      </div>
      <div className="float-start bg-dark w-25 " style={{height: "100px"}}> aaa</div>
    
    <div className="border border-1 float-end w-75 mb-3">
    
      <div className="w-100 m-3">
        <h2 className="mb-1">List group item heading</h2>
    
      </div>
      <h5 className="mb-1">Some placeholder content in a paragraph.</h5>
    
    </div> */}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="">
            <div className="float-start w-40 mt-5 ms-5 border border-3 border-dark rounded">
              <div className="card-body">
                <div className="float-start w-75 mt-3">
                  <h1> Orlik Lublin </h1>
                  <div className="ms-2 mb-5">
                    <h4 className="text-secondary">
                      {" "}
                      Zarejestruj się i ciesz się łatwym dostępem do meczy na
                      Lubelskich orlikach!{" "}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="float-end w-25 m-4">
              <img src={require("../img/mainpage.png").default} alt="" />
            </div>
            <div className="fixed-bottom">
              <h1 className="text-center mt-2 mb-2"> Aktualności </h1>
              <hr />
    
              <div className="m-auto" style={{ width: "60%", height: "250px" }}>
              <div
                  className=" mb-3 text-center border border-4 border border-dark"
                  style={{ height: "40%" }}
                >
    
    
                  <h3 className="mt-4">{news[0].content}</h3>
    
                </div>
    
                <div
                  className=" mb-2 text-center border border-4 border border-dark "
                  style={{ height: "40%" }}
                >
    
                  <h3 className="mt-4">{news[1].content}</h3>
                  
                </div>
                {/* <div className="float-start bg-dark w-25 mb-3" style={{height: "100px"}}> aaa</div>
    
      <div className="border border-1 float-end w-75 mb-3">
      
        <div className=" w-100 m-3">
          <h2 className="mb-1">List group item heading</h2>
    
        </div>
        <h5 className="mb-1">Some placeholder content in a paragraph.</h5>
      </div>
      <div className="float-start bg-dark w-25 " style={{height: "100px"}}> aaa</div>
    
    <div className="border border-1 float-end w-75 mb-3">
    
      <div className="w-100 m-3">
        <h2 className="mb-1">List group item heading</h2>
    
      </div>
      <h5 className="mb-1">Some placeholder content in a paragraph.</h5>
    
    </div> */}
              </div>
            </div>
          </div>
        );
      }
    }
 
}

export default MainPage;
