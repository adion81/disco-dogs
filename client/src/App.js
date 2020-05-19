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
      <div className="jumbotron bg-dark text-white">
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
        <form className="my-modal-body" onSubmit={ updateDawg }>
          <div className="card">
            <div className="card-header bg-dark text-white">
              Edit Dog
              <a className="close" onClick={e => setEdit(0)} >&times;</a>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Name: </label>
                <input type="text" className="form-control" onChange={ e => setName(e.target.value) } value={ name } />
                { errors.name ? <p className="text-danger">{errors.name.message}</p> : "" }
              </div>
              <div className="form-group">
                <label>Breed: </label>
                <input type="text" className="form-control" onChange={ e => setBreed(e.target.value) } value={ breed } />
                { errors.breed ? <p className="text-danger">{errors.breed.message}</p> : "" }
              </div>
              <div className="form-group">
                <label>Age: </label>
                <input type="number" className="form-control" onChange={ e => setAge(e.target.value) } value={ age } />
                { errors.age ? <p className="text-danger">{errors.age.message}</p> : "" }
              </div>
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
