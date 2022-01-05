
import OrlikiItemList from "../components/orliki/OrlikItemList";

const DUMMY_DATA = [
    {
        id: '1',
        title: 'pierwszy orlik',
        address: 'Wajdeloty 1',
        image:'https://bielsk.eu/images/stories/2020/05/maj2/12orlikorla.jpg',
        description: 'to jest opis pierwszego orlika',
        linkHandle:"https://lublin.eu/sport/orliki/boiska-orlik-w-lublinie/orlik-lublin-ul-wajdeloty-1,8880,w.html",
    },
    {
        id: '2',
        title: 'drugi orlik',
        address: 'Aleje Racławickie 7',
        image:'https://bielsk.eu/images/stories/2020/05/maj2/12orlikorla.jpg',
        description: 'to jest opis drugiego orlika',
        linkHandle:'https://lublin.eu/sport/orliki/boiska-orlik-w-lublinie/orlik-lublin-aleje-raclawickie-7,8886,w.html',
    },
];


function Orliki(){



return <div className="list-group"> 
            <h1 className="text-center">Lista orlików</h1> 
          <OrlikiItemList orliki={DUMMY_DATA}/>
        </div>;

}

export default Orliki;