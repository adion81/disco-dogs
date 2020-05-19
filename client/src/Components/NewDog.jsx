import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";


const NewDog = (props) => {

  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [breed, setBreed] = useState("");
  const [errors, setErrors] = useState({});

  const addDawg = (e) => {
    e.preventDefault();
    const dawg = {name, age, breed};
    axios.post("http://localhost:8000/api/dogs", dawg)
      .then(res => {
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ addDawg }>
      <p>Name: <input type="text" onChange={ e => setName(e.target.value) } /></p>
      { errors.name ? <p>{errors.name.message}</p> : "" }
      <p>Breed: <input type="text" onChange={ e => setBreed(e.target.value) } /></p>
      { errors.breed ? <p>{errors.breed.message}</p> : "" }
      <p>Age: <input type="number" onChange={ e => setAge(e.target.value) } value={ age } /></p>
      { errors.age ? <p>{errors.age.message}</p> : "" }
      <input type="submit" />
    </form>
  )

}

export default NewDog;