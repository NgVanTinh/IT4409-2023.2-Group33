import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const PaymentCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const responseCode = query.get("vnp_ResponseCode");
    const userId = getCookie("id");

    if (responseCode === "00") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanh toán thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/infoUser`);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Thanh toán thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [location, navigate]);

  return (
    <>
      <h3>
        Cảm ơn bạn đã thanh toán đơn hàng qua VNPAY. Hệ thống TShop luôn chào
        đón bạn với những ưu đãi hấp dẫn nhất.
      </h3>
    </>
  );
};

export default PaymentCallback;
