import { Button, Modal } from "antd"; // import Modal from antd
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewOrder = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // state để điều khiển việc hiển thị của hộp thoại
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
  const { id } = useParams();

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/movie/${id}`, config);
      setOrder(result.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of order : {order ? order.id : null}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {order ? order.movieName : null}
                </li>
                <li className="list-group-item">
                  <b>Directors:</b>
                  {order ? order.directors : null}
                </li>
                <li className="list-group-item">
                  <b>Actors:</b>
                  {order ? order.actors : null}
                </li>
              </ul>
            </div>
          </div>
          <Button
            className="btn btn-primary my-2"
            onClick={() => setModalVisible(true)} // Khi nút được bấm, hiển thị hộp thoại bằng cách set state là true
          >
            Show Info
          </Button>

          {/* Modal component */}
          <Modal
            title="Order Information" // Tiêu đề của hộp thoại
            visible={modalVisible} // State để điều khiển việc hiển thị của hộp thoại
            onCancel={() => setModalVisible(false)} // Callback khi hủy bỏ hộp thoại
            footer={[ // Các nút chức năng
              <Button key="back" onClick={() => setModalVisible(false)}>Close</Button>
            ]}
          >
            {/* Nội dung của hộp thoại */}
            <p><b>Name:</b> {order ? order.movieName : null}</p>
            <p><b>Directors:</b> {order ? order.directors : null}</p>
            <p><b>Actors:</b> {order ? order.actors : null}</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
