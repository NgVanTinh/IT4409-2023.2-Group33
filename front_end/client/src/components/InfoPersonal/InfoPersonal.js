import { Card } from "antd";
import React from "react";
import { getCookie } from "../../helpers/cookie";
import "./InfoPersonal.scss";

export default function InfoPersonal() {
  const id = getCookie("id");
  const username = getCookie("username");
  const email = getCookie("email");
  const phone = getCookie("phone");
  const address = getCookie("address");
  const fullname = getCookie("fullname");
  return (
    <>
      <Card className="cardInfoPersonal" title={fullname}>
        <p>ID: {id}</p>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Address: {address}</p>
      </Card>
    </>
  );
}
