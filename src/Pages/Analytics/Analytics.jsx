import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Visualisation } from "./Visualisation";
import Tabulation from "./Tabulation";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

function Analytics() {

    const [ChartType, setChartType] = useState("Line");

  return (
    <>
      <div style={{ marginTop: "20px" }}></div>
      <Typography variant="h5">Analytics</Typography>
      <div style={{ marginTop: "20px" }}></div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardActionArea>
              <CardContent>
                <div style={{ textAlign: "center" }}>
                  <Typography variant="h6">Total Products : 10</Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardActionArea>
              <CardContent>
                <div style={{ textAlign: "center" }}>
                  <Typography variant="h6">Total Orders : 10</Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Customers</Typography>
          <div style={{ marginTop: "20px" }}></div>
          <Tabulation />
        </Grid>

        <Grid item xs={12}>
        <Card>
  <CardContent style={{ position: 'relative' }}>
    <Visualisation ChartType={ChartType}/>
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <IconButton color='inherit' onClick={()=>{
        if(ChartType == "Bar")
        setChartType("Line")
      }}>
        <ShowChartIcon />
      </IconButton>
      <IconButton color='inherit' onClick={()=>{
        if(ChartType == 'Line')
        setChartType("Bar")
      }}>
        <BarChartIcon />
      </IconButton>
    </div>
  </CardContent>
</Card>

        </Grid>
      </Grid>
    </>
  );
}

export default Analytics;
