import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActionArea,
  } from "@mui/material";
  import { useNavigate } from 'react-router-dom';

function Product(props) {

    const navigate = useNavigate()
    

  return (
    <>
    <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: "#2196f3", color: "white" }} id = {props.productID} onClick={()=>{
                navigate('/my-products/details');
            }}>
              <CardActionArea>
                <CardContent >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <img
                        src={props.ProductImageURL}
                        alt="Product"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h5" component="div">
                        {props.ProductName}
                      </Typography>
                      <Typography variant="h6" color="inherit">
                        ${props.ProductPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
    </>
  )
}

export default Product