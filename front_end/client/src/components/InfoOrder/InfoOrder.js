import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser } from "../../store/orderSlice";
import { Table, Tag, Image } from "antd";
import "./InfoOrder.scss";
import { formatPrice } from "../../utils/helpers";
import moment from "moment";
import { getCookie } from "../../helpers/cookie";

const InfoOrder = () => {
  const userId = getCookie("id");
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrdersByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const processedData = orders.map((order) => {
      const products = JSON.parse(order.productJsonArray);
      const address = JSON.parse(order.addressJSON);
      const fullAddress = `Nhà số ${address.number}, đường ${address.street}, phường ${address.ward}, quận ${address.district}, thành phố ${address.city}, SDT: ${order.phone}`;

      return {
        key: order.id,
        id: order.id,
        orderDate: moment(order.orderDate).format("DD/MM/YYYY HH:mm:ss"),
        status: order.status,
        products: products.map((product) => ({
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
  }, [orders]);

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
      render: (tag) => {
        if (tag === "CREATED") {
          return <Tag color="blue">Chờ xác nhận</Tag>;
        } else if (tag === "AWAITING_SHIPMENT") {
          return <Tag color="gold">Đang giao hàng</Tag>;
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
      render: (discountedPrice) => (
        <span className="price-highlight">{formatPrice(discountedPrice)}</span>
      ),
    },
  ];
  return (
    <div className=" my-3">
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        size="middle"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default InfoOrder;
