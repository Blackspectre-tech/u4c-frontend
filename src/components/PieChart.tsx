"use client";

import dynamic from "next/dynamic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Pie chart elements + datalabels
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

// Import Pie chart dynamically
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), {
  ssr: false,
});

interface CampaignChartProps {
  data: any;
  options?: any;
  title?: string;
}

export default function CampaignChart({
  data,
  options,
  title = "Donations by Month",
}: CampaignChartProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 8,
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      datalabels: {
        color: "white", // ✅ numbers inside pie slices = white
        formatter: (value: number, context: any) => {
          const dataset = context.chart.data.datasets[0];
          const total = dataset.data.reduce(
            (acc: number, curr: number) => acc + curr,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1); // 1 decimal place
          return `${percentage}%`;
        },
      },
    },
  };

  return <Pie data={data} options={options || defaultOptions} />;
}
