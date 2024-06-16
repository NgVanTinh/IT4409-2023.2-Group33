import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser, submitProductRating } from "../../store/orderSlice";
import { Table, Tag, Image, Input, Button } from "antd";
import "./InfoOrder.scss";
import { formatPrice } from "../../utils/helpers";
import moment from "moment";
import { getCookie } from "../../helpers/cookie";
import ReviewModal from "../ReviewOrder/ReviewOrder";
import Swal from "sweetalert2";
import { unwrapResult } from "@reduxjs/toolkit";

const InfoOrder = () => {
  const userId = getCookie("id");
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrdersByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (!searchText) {
      processOrders(orders);
    } else {
      handleSearchProduct(searchText);
    }
  }, [orders, searchText]);

  const processOrders = (orders) => {
    const reversedOrders = [...orders].reverse();
    const processedData = reversedOrders.map((order, index) => {
      const products = JSON.parse(order.productJsonArray);
      const address = JSON.parse(order.addressJSON);
      const fullAddress = `Nhà số ${address.number}, đường ${address.street}, phường ${address.ward}, quận ${address.district}, thành phố ${address.city}, SDT: ${order.phone}`;

      return {
        key: order.id,
        id: order.id,
        orderDate: moment(order.orderDate).format("DD/MM/YYYY HH:mm:ss"),
        status: order.status,
        products: products.map((product) => ({
          id: product.id,
          title: product.title,
          quantity: product.quantity,
          discountedPrice: product.discountedPrice,
          thumbnail: product.thumbnail,
        })),
        discountedPrice: order.discountedPrice,
        address: fullAddress,
        method: order.method,
      };
    });

    setDataSource(processedData);
  };

  const handleSearchProduct = (value) => {
    setSearchText(value);
    if (!value) {
      processOrders(orders);
    } else {
      const filteredData = orders.filter((order) =>
        JSON.parse(order.productJsonArray).some((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        )
      );
      processOrders(filteredData);
    }
  };

  // Rating
  const showReviewModal = (products, orderId) => {
    setSelectedOrderProducts(products);
    setSelectedOrderId(orderId);
    setIsModalVisible(true);
  };

  const handleOk = async (productId, rate, comment) => {
    try {
      const actionResult = await dispatch(
        submitProductRating({
          orderId: selectedOrderId,
          productId,
          rate,
          comment,
        })
      );
      unwrapResult(actionResult);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đánh giá sản phẩm thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Có lỗi xảy ra khi đánh giá sản phẩm",
        text: error.toString(),
        showConfirmButton: true,
      });
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 50,
    },
    {
      title: "Sản phẩm",
      key: "products",
      dataIndex: "products",
      align: "center",
      width: 400,
      render: (products) => (
        <div className="productContainer">
          {products.map((product) => (
            <div key={product.title} className="productItem">
              <Image
                width={50}
                src={product.thumbnail}
                className="productImage"
              />
              <div className="productInfo">
                <strong>{product.title}</strong>
                <p>Số lượng: {product.quantity}</p>
                <p>{formatPrice(product.discountedPrice)}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      key: "status",
      dataIndex: "status",
      align: "center",
      width: 100,
      filters: [
        { text: "Chờ xác nhận", value: "CREATED" },
        { text: "Đang giao hàng", value: "AWAITING_SHIPMENT" },
        { text: "Đã nhận hàng", value: "COMPLETED" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (tag) => {
        if (tag === "CREATED") {
          return <Tag color="blue">Chờ xác nhận</Tag>;
        } else if (tag === "AWAITING_SHIPMENT") {
          return <Tag color="gold">Đang giao hàng</Tag>;
        } else {
          return <Tag color="green">Đã nhận hàng</Tag>;
        }
      },
    },
    {
      title: "Thời gian đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      align: "center",
      width: 100,
    },

    {
      title: "Địa chỉ nhận hàng",
      dataIndex: "address",
      key: "address",
      align: "center",
      width: 200,
      render: (address) => <div className="address-cell-wrap">{address}</div>,
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "method",
      key: "method",
      align: "center",
      width: 100,
      filters: [
        { text: "Thanh toán khi nhận hàng", value: "COD" },
        { text: "Thanh toán bằng VNPAY", value: "VNPay" },
      ],
      onFilter: (value, record) => record.method === value,
      render: (method) => {
        if (method === "COD") {
          return <Tag color="cyan">Thanh toán khi nhận hàng</Tag>;
        } else if (method === "VNPay") {
          return <Tag color="purple">Thanh toán bằng VNPAY</Tag>;
        }
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      align: "center",
      width: 150,
      sorter: (a, b) => a.discountedPrice - b.discountedPrice,
      sortDirections: ["descend", "ascend"],
      filters: [
        { text: "Dưới 1 triệu", value: "under-1m" },
        { text: "1 triệu đến 5 triệu", value: "1m-to-5m" },
        { text: "Trên 5 triệu", value: "over-5m" },
      ],
      onFilter: (value, record) => {
        switch (value) {
          case "under-1m":
            return record.discountedPrice < 1000000;
          case "1m-to-5m":
            return (
              record.discountedPrice >= 1000000 &&
              record.discountedPrice <= 5000000
            );
          case "over-5m":
            return record.discountedPrice > 5000000;
          default:
            return true;
        }
      },
      render: (discountedPrice) => (
        <span className="price-highlight">{formatPrice(discountedPrice)}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) =>
        record.status === "COMPLETED" && (
          <Button onClick={() => showReviewModal(record.products, record.id)}>
            Đánh giá
          </Button>
        ),
    },
  ];

  return (
    <div className="my-3">
      <Input.Search
        placeholder="Tìm sản phẩm..."
        onSearch={handleSearchProduct}
        style={{ marginBottom: 20, width: 200 }}
        allowClear
        value={searchText}
        onChange={(e) => handleSearchProduct(e.target.value)}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        size="middle"
        pagination={{ pageSize: 5 }}
      />
      <ReviewModal
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        products={selectedOrderProducts}
      />
    </div>
  );
};

export default InfoOrder;
