import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    "Day",
    "products",
    "Orders"
  ],
  [1, 37.8, 10],
  [2, 30.9, 9],
  [3, 25.4, 15],
  [4, 11.7, 12],
  [5, 11.9, 20],
  [6, 8.8, 19],
  [7, 7.6,30],
  [8, 12.3,35],
  [9, 16.9,32],
  [10, 12.8,39],
  [11, 5.3,40],
  [12, 6.6,37],
  [13, 4.8,45],
  [14, 4.2, 48],
];

export const options = {
  chart: {
    title: "Graph of Products and Orders per day"
  },
};

export function Visualisation(props) {
  return (
    <Chart
      chartType={props.ChartType}
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
