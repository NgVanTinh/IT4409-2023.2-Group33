import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewOrder = () => {

  const {order, setOrder} = useState({
    id: "",
    actors: "",
    categories: "",
    directors: "",
    movieName: "",
    description:"",
    length: "",
    releaseDate:"",
    imgURL:"",
    posterURL:"",
    trailerURL:""
  });

  const {id} = useParams();

  const loadOrder = async () => {
    
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setOrder(result.data);
  };

  useEffect(() => {
    loadOrder();
  });

  console.log(order);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of order : {order.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {order.movieName}
                </li>
                <li className="list-group-item">
                  <b>Directors:</b>
                  {order.directors}
                </li>
                <li className="list-group-item">
                  <b>Actors:</b>
                  {order.actors}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/admin/orders"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;