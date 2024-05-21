import React from "react";
import "./SearchPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import ProductList from "../../components/ProductList/ProductList";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { searchKeyword } = useParams();
  console.log(searchKeyword);
  return <div></div>;
}
