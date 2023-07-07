import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Product from "./Product";
import axios from "axios"
import apiURL from "../../ApiURL";
import { useState } from "react";

function BuyerFeed() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async()=>{
        setLoading(true)
        const res = await axios.get(`${apiURL}/app/admin/fetch-products`);
        if(res.data.message=="OK")
        {
            const productsData = res.data.products;
            const updatedData = productsData.map((item)=>({
               productPrice : item.Price,
               productName : item.ProductName,
               productImage : item.ProductImageURL,
                _id : item._id
            }))
            setProducts(updatedData)
        }
        setLoading(false)
    }
    
    useEffect(()=>{
fetchProducts();
    },[])

  return (
    <>
      <div
        className="search-bar-container"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <TextField
          id="outlined-basic"
          label="Search products"
          variant="outlined"
          fullWidth
        />
      </div>
      {
        loading ? (<LinearProgress />) : null
      }

      <div className="products-container">
        <Grid container spacing={2}>
          
        {
            products.map((item)=>{
                console.log(item.productName)
                return (<>
                    <Product productID = {item._id} ProductImageURL={item.productImage} ProductName={item.productName} ProductPrice={item.productPrice}/>
                </>)
            })
        }
          
        </Grid>
      </div>
    </>
  );
}

export default BuyerFeed;
