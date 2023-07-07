import { Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiURL from "../../ApiURL";
import axios from "axios";
import Cookies from "js-cookie";

function ProductDetails() {
  const [product, setProductData] = useState(null);
  const navigate = useNavigate();
  const { productID } = useParams();

  const fetchProductDetails = async () => {
    try {
      const url = `${apiURL}/app/buyer/fetch-product/${productID}`;
      const res = await axios.get(url);
      if (res.data.message === "OK") {
        const data = res.data.productData;
        const updatedData = {
          productName: data.ProductName,
          productDescription: data.ProductDescription,
          productImageURL: data.ProductImageURL,
          productPrice: data.Price,
          productQty: data.Qty,
        };
        setProductData(updatedData);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  
  const placeOrder = async()=>{
    const url = `${apiURL}/app/buyer/place-order`;
    const token = await Cookies.get('access_token');
    
    const res =await axios.post(url,{
        token : token,
        ProductID : productID
    })

    console.log(res)

    if((await res).data.message == "OK")
    {
        console.log( res.data)
    }

    else{
        console.log(res.data)
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <>
      {product && (
        <>
        <div className="product-info-container" style={{"display" : "flex", "alignItems" : "center" ,"marginTop" : "20px"}}>
          <div className="product-image-container" style={{"flexGrow" : 0.35}}>
            <img src={product.productImageURL} alt="product Image" />
          </div>
          <div className="product-name-container">
            <Typography variant="h4">{product.productName}</Typography>
          </div>
        </div>
        <Divider color="black"/>
        <div className="description-header" style={{"marginTop" : "10px"}}>
            <Typography variant="h5">
                Product Description
            </Typography>
        </div>
        <div className="description" style={{"marginTop" : "10px" ,"fontSize" : "large", "fontStyle" : "italic"}}>
            {product.productDescription}
        </div>

        <div className="price-container" style={{"marginTop" : "10px"}}>
            <Typography variant="h6">Price : ${product.productPrice}</Typography>
            <Typography variant="h6">Qty left : ${product.productQty}</Typography>
            
        </div>

        <div className="button-container" style={{"marginTop" : "20px"}}>
        <Button variant="contained" onClick={placeOrder}>Place Order</Button>
        </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
