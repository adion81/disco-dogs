import React from "react";
import { Link } from "@reach/router";


const Dog = (props) => {

  return (
    <div>
      <h4>{ props.dog.name }</h4>
      <p>Breed: { props.dog.breed }</p>
      <p>Age: { props.dog.age }</p>
      <Link to={"/edit/" + props.dog._id }>Edit</Link>
    </div>  
  );

}

export default Dog;