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
        }else if(val.adress.toLowerCase().includes(searchTerm.toLowerCase())){
            return val;
        }
    }).map((orlik) => (
        <OrlikiItem 
            key={orlik.orlik_id} 
            id={orlik.orlik_id}
            school={orlik.school} 
            adress={orlik.adress} 
            number={orlik.phone}
            email={orlik.email}
            en_terms={orlik.en_terms}
            pl_terms={orlik.pl_terms}
        />))}
</li>
</div>
);
}


export default OrlikiItemList;