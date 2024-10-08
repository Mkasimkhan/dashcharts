import React from "react";
import Layout from "../../layout/Layout";
import { Header } from "../../components/index";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

import "./BankDashboard.css";

// Register chart types and scales for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const BankDashboard = () => {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  ];

  const pieData01 = {
    labels: ['Group A', 'Group B', 'Group C', 'Group D'],
    datasets: [{
      data: [400, 300, 300, 200],
      backgroundColor: ['#03C9D7', '#82ca9d', '#ffc658', '#ff7300'],
      hoverBackgroundColor: ['#02a3b5', '#66b587', '#e6a946', '#e65b00']
    }]
  };

  const pieData02 = {
    labels: ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'D1', 'D2'],
    datasets: [{
      data: [100, 300, 100, 80, 40, 30, 50, 100, 200, 150, 50],
      backgroundColor: ['#03C9D7', '#82ca9d', '#ffc658', '#ff7300', '#8884d8'],
    }]
  };

  // Bar and Line data
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        
        data: data.map(d => d.pv),
        backgroundColor: '#03C9D7',
        borderRadius: { topLeft: 10, topRight: 10 }, // Round top corners only
        borderSkipped: 'bottom',
      },
      {
        label: 'UV',
        data: data.map(d => d.uv),
        backgroundColor: '#82ca9d',
        borderRadius: { topLeft: 10, topRight: 10 },
        borderSkipped: 'bottom',
      }
    ]
  };

  const lineData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: 'PV',
        data: data.map(d => d.pv),
        borderColor: '#03C9D7',
        fill: true,
        backgroundColor: 'rgba(3, 201, 215, 0.2)',
      },
      {
        label: 'UV',
        data: data.map(d => d.uv),
        borderColor: '#82ca9d',
        fill: true,
        backgroundColor: 'rgba(130, 202, 157, 0.2)',
      },
    ]
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Remove grid on X-axis
        },
        ticks: {
          maxRotation: 0, // Ensure labels are horizontal
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: false, // Remove grid on Y-axis
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Remove the legend boxes
      },
    },
  };
  const pieOptions = {
    plugins: {
      legend: {
        display: false, // Keep the pie chart legend if needed
      },
    },
    rotation: 0, // Ensure pie chart text is horizontal
  };

  return (
    <Layout>
      <div className="bankdash m-2 md:m-10 mt-24 p-2 md:p-10 rounded-md bg-[#f7f7f7]">
        <Header category="Bank" title="Dashboard" />
        <div className="bankdash-content">
          <div className="right">
            <div className="row1">
              <div className="charts">
                <div className="chart-container">
                  <Line data={lineData} options={options} />
                </div>
              </div>

              <div className="charts">
                <div className="chart-container">
                  <Line data={lineData} options={options} />
                </div>
              </div>

              <div className="charts">
                <div className="chart-container pie-cont">
                  <Pie data={pieData01} options={pieOptions}/>
                </div>
              </div>
            </div>

            <div className="row2">
              <div className="chart-container">
                <Bar data={chartData} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BankDashboard;
