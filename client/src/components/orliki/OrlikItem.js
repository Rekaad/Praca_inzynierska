import { Link } from "react-router-dom";
import { useState } from "react";

function OrlikiItem (props){

    const [dataId, setDataId] = useState("");

    const dajOrlikId = async (id) => {
    
        setDataId(id);
      // console.log(dataId);
      }

return <div className=" w-75 h-25 mx-auto">
 <Link onMouseOver={() => dajOrlikId(props)} className="text-decoration-none text-body" to={{
          pathname: "/orlikinfo",
          state: dataId // your data array of objects
            }}>
    <div className="border border-3 mb-3 w-100 mx-auto text-center">

   {/*  <div>
        <img className="card-img-top" src={props.image} alt={props.title} />
    </div> */}
    <div className="card-body">
        <h3>{props.adress}</h3>
        <p>{props.school}</p>

    </div>
</div>
</Link>
</div>
}

export default OrlikiItem;