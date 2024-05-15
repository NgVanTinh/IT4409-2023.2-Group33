import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import InstanceAxios from "../../api/axios";
const ViewOrder = () => {

  const navigate = useNavigate()
  const {order, setOrder} = useState({
  });
  const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
  const {linkid} = useParams();

  // const loadOrder = async () => {
    
  //   const result = await axios.get(`http://localhost:8080/user/${id}`);
  //   setOrder(result.data);
  // };

  useEffect(() => {
    // loadOrder();
    if (localStorage.getItem('token') == null) {
            navigate("/");
        }

    // InstanceAxios.get(`/movie/${linkid}`, config)
    //     .then(function (response) {
    //         setOrder(response.data)
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    const getData = async() => {
    const result = await axios.get(`http://localhost:8080/api/movie/${linkid}`)
    setOrder(result.data);
  };
})


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              {/* Details of order : {order.id} */}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {/* {order.movieName} */}
                </li>
                <li className="list-group-item">
                  <b>Directors:</b>
                  {/* {order.directors} */}
                </li>
                <li className="list-group-item">
                  <b>Actors:</b>
                  {/* {order.actors} */}
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