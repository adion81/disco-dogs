import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";


const EditDog = (props) => {

  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [breed, setBreed] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/dogs/${props._id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setBreed(res.data.breed);
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  const updateDawg = (e) => {
    e.preventDefault();
    const dawg = {name, age, breed};
    axios.put(`http://localhost:8000/api/dogs/${props._id}`, dawg)
      .then(res => {
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }

  const adoptDawg = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/dogs/${props._id}`)
      .then(res => {
        navigate("/");
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ updateDawg }>
      <p>Name: <input type="text" onChange={ e => setName(e.target.value) } value={ name } /></p>
      { errors.name ? <p>{errors.name.message}</p> : "" }
      <p>Breed: <input type="text" onChange={ e => setBreed(e.target.value) } value={ breed } /></p>
      { errors.breed ? <p>{errors.breed.message}</p> : "" }
      <p>Age: <input type="number" onChange={ e => setAge(e.target.value) } value={ age } /></p>
      { errors.age ? <p>{errors.age.message}</p> : "" }
      <input type="submit" value="Update dog" />
      <button onClick={ adoptDawg }>Adopt Dog</button>
    </form>
  )

}

export default EditDog;