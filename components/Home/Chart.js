import React, { useState, useEffect } from "react";
// import { Pie } from "@ant-design/charts";
import dynamic from "next/dynamic";

const Pie = dynamic(() => import("@ant-design/charts").then((mod) => mod.Pie), {
  ssr: false,
});

const Chart = ({ centerInstitution = { ប្រុស: 0, ស្រី: 0 } }) => {
  const data = [
    {
      type: "ប្រុស",
      value: centerInstitution["ប្រុស"],
    },
    {
      type: "ស្រី",
      value: centerInstitution["ស្រី"],
    },
  ];
  const config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 20,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          fontSize: 25,
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: `
មន្រ្ដីរាជការ

ថ្នាក់់ជាតិ`,
      },
    },
  };
  return <Pie {...config} />;
};

export default Chart;
