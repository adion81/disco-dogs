import React, { useEffect, useState } from 'react';
import './App.css';
import {Router, Link} from "@reach/router";
import NewDog from "./Components/NewDog";
import AllDogs from "./Components/AllDogs";
import EditDog from "./Components/EditDog";
import axios from "axios";

function App() {

  const [active, setActive] = useState("/");
  const [edit, setEdit] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [breed, setBreed] = useState("");
  const [errors, setErrors] = useState({});
  const [changes, setChanges] = useState(false);

  const updateDawg = (e) => {
    e.preventDefault();
    const dawg = {name, age, breed};
    axios.put(`http://localhost:8000/api/dogs/${edit}`, dawg)
      .then(res => {
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          // TODO: somethings
          setChanges(!changes);
          setEdit(0);
        }
      })
      .catch(err => console.log(err));
  }

  const adoptDawg = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/dogs/${edit}`)
      .then(res => {
        // TODO: something
        setChanges(!changes);
        setEdit(0);
      })
      .catch(err => console.log(err));
  }

  useEffect( () => {
    axios.get(`http://localhost:8000/api/dogs/${edit}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setBreed(res.data.breed);
        console.log(res);
      })
      .catch(err => console.log(err));
  }, [edit]);

  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Disco Dawgs</h1>
      </div>

      <ul className="nav nav-tabs mb-5">
        <li className="nav-item" onClick={e => setActive("/")} >
          <Link className={ active === "/" ? "nav-link active" : "nav-link" } to="/">Home</Link>
        </li>
        <li className="nav-item" onClick={e => setActive("/new")}>
          <Link className={ active === "/new" ? "nav-link active" : "nav-link" } to="/new">New Dog</Link>
        </li>
      </ul>

      <Router>
        <AllDogs path="/" edit={_id => setEdit(_id)} changes={changes} />
        <NewDog path="/new" />
        {/* <EditDog path="/edit/:_id" /> */}
      </Router>

      <div className={ edit ? "my-modal is-active" : "my-modal"}>
        <form onSubmit={ updateDawg }>
          <div className="card">
            <div className="card-header bg-dark text-white">
              Edit Dog
            </div>
            <div className="card-body">
                <p>Name: <input type="text" onChange={ e => setName(e.target.value) } value={ name } /></p>
                { errors.name ? <p>{errors.name.message}</p> : "" }
                <p>Breed: <input type="text" onChange={ e => setBreed(e.target.value) } value={ breed } /></p>
                { errors.breed ? <p>{errors.breed.message}</p> : "" }
                <p>Age: <input type="number" onChange={ e => setAge(e.target.value) } value={ age } /></p>
                { errors.age ? <p>{errors.age.message}</p> : "" }
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-outline-primary">Update</button>
              <button className="btn btn-outline-danger" onClick={ adoptDawg }>Adopt Dog</button>
              <button className="btn btn-outline-dark float-right" onClick={e => setEdit(0)}>Cancel</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

export default App;
