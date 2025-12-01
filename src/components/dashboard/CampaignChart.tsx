"use client"; // important in Next.js App Router

import dynamic from "next/dynamic";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements (do this once globally)
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

// Import Line chart dynamically (to avoid SSR errors)
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

export default function CampaignChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total donations",
        data: [300, 500, 200, 800, 600, 250, 400, 300, 200],
        borderColor: "#ffffff",
        backgroundColor: "#ffffff",
        tension: 0.3, // smooth line
        fill: true,
      },
    ],
  };

  //     legend: {
  //     display: true,
  //     position: "top" as const,
  //   },
  //   title: {
  //     display: false,
  //     text: "Donations",
  //   },

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "white", // legend text color
        },
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
        color: "white", // chart title color
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis labels
        },
        grid: {
          color: "rgba(255,255,255,0.2)", // X-axis grid lines
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis labels
        },
        grid: {
          color: "rgba(255,255,255,0.2)", // Y-axis grid lines
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
