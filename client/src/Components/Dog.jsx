import React from "react";
import { Link } from "@reach/router";


const Dog = (props) => {

  return (
    <div className="col-sm-4 mb-3">
      <div className="card">
        <div className="card-header bg-dark text-white">
          { props.dog.name }
        </div>
        <div className="card-body">
          <p>Breed: { props.dog.breed }</p>
          <p>Age: { props.dog.age }</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-link" onClick={e => props.edit(props.dog._id)}>Edit</button>
        </div>
      </div>  
    </div>
  );

}

export default Dog;