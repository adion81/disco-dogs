import React, { useEffect, useState } from "react";
import axios from "axios";
import Dog from "./Dog";


const AllDogs = (props) => {

  const [dogs, setDawgs] = useState([]);

  const fetchDawgs = () => {
    axios.get("http://localhost:8000/api/dogs")
      .then(res => {
        console.log(res);
        setDawgs(res.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchDawgs();
  }, [props]);

  return (
    <div className="row">
      {dogs.map( x => <Dog key={ x._id } dog={ x } edit={_id => props.edit(_id)} /> )}
    </div>
  );

}

export default AllDogs;