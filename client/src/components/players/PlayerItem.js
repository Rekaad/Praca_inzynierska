function PlayerItem(props){

    // const [dataId, setDataId] = useState("");

 //   const dajOrlikId = async (id) => {
    
    //    setDataId(id);
      // console.log(dataId);
  //    }

return <div className=" w-75 h-25 mx-auto">
    <div className="card rounded-pill mb-4 w-100 mx-auto text-center">

   {/*  <div>
        <img className="card-img-top" src={props.image} alt={props.title} />
    </div> */}
    <div className="card-body">
        <h3>{props.imie}</h3>
        <p>{props.nazwisko}</p>


    </div>
</div>

</div>

}

export default PlayerItem;