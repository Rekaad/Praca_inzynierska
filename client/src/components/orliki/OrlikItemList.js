import OrlikiItem from "./OrlikItem";
import {useState} from 'react';

function OrlikiItemList(props) {

const [searchTerm, setSearchTerm] = useState('');

return(
    <div>
<div className="d-block text-center mb-3">
<input type="text" placeholder="Search..." onChange={event =>{setSearchTerm(event.target.value)}}/>
</div>
<li className="list-group-numbered bg-grey w-75 mx-auto ">
    {props.orliki.filter((val)=> {
        if(searchTerm===""){
            return val;
        }else if(val.address.toLowerCase().includes(searchTerm.toLowerCase())){
            return val;
        }
    }).map((orlik) => (
        <OrlikiItem 
            key={orlik.id} 
            id={orlik.id}
            title={orlik.title}
            image={orlik.image} 
            address={orlik.address} 
            description={orlik.description}
            linkHandle={orlik.linkHandle}
        />))}
</li>
</div>
);
}


export default OrlikiItemList;