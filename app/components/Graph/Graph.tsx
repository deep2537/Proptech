"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";

export default function Barchart() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/graph1/");
        if (!response.ok) {
          console.error("Bad Response");
          return;
        }

        const text = await response.text(); // Fetch as text first
        console.log("Raw Response:", text); // Log the raw response

        const data = JSON.parse(text); // Manually parse JSON
        console.log("Parsed Data:", data);
        setChartData(data);
      } catch (error) {
        console.error("Error parsing JSON:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      console.log("Updated chartData:", chartData);

      // Count the occurrences of each type
      const typeCounts = chartData.reduce((acc, item) => {
        const type = item.type;
        if (acc[type]) {
          acc[type]++;
        } else {
          acc[type] = 1;
        }
        return acc;
      }, {});

      // Extract labels and data for the chart
      const labels = Object.keys(typeCounts);
      const data = Object.values(typeCounts);

      // Update the chart with the new data
      if (chartRef.current) {
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
        const context = chartRef.current.getContext("2d");
        const newChart = new Chart(context, {
          type: "bar",
          data: {
            labels: labels, // Use the types as labels
            datasets: [
              {
                label: "Number of Amenities",
                data: data, // Use the counts as data
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132)",
                  "rgba(54, 162, 235)",
                  "rgba(255, 206, 86)",
                  "rgba(75, 192, 192)",
                  "rgba(153, 102, 255)",
                  "rgba(255, 159, 64)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        chartRef.current.chart = newChart;
      }
    }
  }, [chartData]);

  return (
    <div style={{ position: "relative", width: "90vw", height: "80vh" }}>
      <canvas ref={chartRef} />
    </div>
  );
}
