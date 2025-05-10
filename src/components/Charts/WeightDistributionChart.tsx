import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { LogisticsRow } from "@/shared/types/supply.types.ts";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface WeightDistributionChartProps {
  data: LogisticsRow[];
}

const WeightDistributionChart: FC<WeightDistributionChartProps> = ({
  data,
}) => {
  // Extract data for chart
  const labels = data.map((row) => row.requestWagon);

  // Prepare dataset for weight distribution
  const chartData = {
    labels,
    datasets: [
      {
        label: "Weight (tons)",
        data: data.map((row) => row.weight),
        backgroundColor: [
          "rgba(53, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(53, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Weight Distribution by Request",
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default WeightDistributionChart;
