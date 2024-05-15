import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ViewOrder = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); // Changed from const {order, setOrder} = useState(); to const [order, setOrder] = useState(null);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
  const { id } = useParams();

  useEffect(() => {
    console.log('4');
    loadOrder();
    // if (localStorage.getItem('token') == null) {
    //         navigate("/");
    // }
  }, []); // Added [] as the second argument to useEffect to ensure it runs only once on component mount

  const loadOrder = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/movie/${id}`, config);
      console.log('2');
      setOrder(result.data);
    } catch (error) {
      console.log('3');
      console.error('Error fetching order:', error);
    }
  };

  console.log(order);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of order : {order ? order.id : null} {/* Added null check */}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {order ? order.movieName : null} {/* Added null check */}
                </li>
                <li className="list-group-item">
                  <b>Directors:</b>
                  {order ? order.directors : null} {/* Added null check */}
                </li>
                <li className="list-group-item">
                  <b>Actors:</b>
                  {order ? order.actors : null} {/* Added null check */}
                </li>
              </ul>
            </div>
          </div>
          <Link
            className="btn btn-primary my-2"
            to="/admin/orders"
          >
            Back 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
