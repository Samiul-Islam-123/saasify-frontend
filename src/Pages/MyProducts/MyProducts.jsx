import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Toolbar,
  IconButton,
  Divider,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import "./MyProducts.css";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import apiURL from "../../ApiURL";
import { useEffect } from "react";
import Product from "./Product";
import LinearProgress from "@mui/material/LinearProgress";


const MyProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const token = await Cookies.get("access_token");
    const res = await axios.get(
      `${apiURL}/app/seller/fetch-product-seller/${token}`
    );
    
    if (res.data.message == "OK") {
      setStatus(res.data.message)
      console.log(res)
      const productsData = res.data.products;
      const updatedData = productsData.map((item) => ({
        productPrice: item.Price,
        productName: item.ProductName,
        productImage: item.ProductImageURL,
        _id: item._id,
      }));
      setProducts(updatedData);
    } else {
      setStatus(res.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    {loading ? <LinearProgress /> : null}
      <div className="header">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h5">My Products</Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <IconButton
              onClick={() => {
                navigate("/my-products/add");
              }}
            >
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </div>

      <Divider />

      <div style={{ marginTop: "20px" }}></div>
      
      {status != "OK" ? (
        <>
          <Typography variant="h5">{status}</Typography>
        </>
      ) : (
        <>Hellow World
          <div className="products-container">
            <Grid container spacing={2}>
              {products.map((item) => {
                console.log(item);
                return (
                  <>
                    <Product
                      productID={item._id}
                      ProductImageURL={item.productImage}
                      ProductName={item.productName}
                      ProductPrice={item.productPrice}
                    />
                  </>
                );
              })}
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default MyProducts;
