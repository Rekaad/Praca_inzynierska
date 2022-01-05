function Profile(){

return <div className="w-75 mx-auto">


<div className="card mb-4 w-100 mx-auto text-center mt-4 border border-5">

{/*  <div>
    <img className="card-img-top" src={props.image} alt={props.title} />
</div> */}
<div className="card-body w-100">
<div className="mb-4">
<h1>Twój profil</h1>
</div>
  
  <div className="text-start float-start mt-4">
  <h3>Imie: </h3>
  <h3>Nazwisko: </h3>
  <h3>Opis: </h3>
  </div>
  <div className="float-end w-25">
       <img className="img-fluid" src="http://studio-kreacji.pl/wp-content/uploads/2016/10/blank-avatar.png" /> 

  </div>
 


</div>
</div>

</div>


}

export default Profile;