import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { LogisticsRow } from "@/shared/types/supply.types.ts";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface PhaseComparisonChartProps {
  data: LogisticsRow[];
}

const PhaseComparisonChart: FC<PhaseComparisonChartProps> = ({ data }) => {
  // Extract data for chart
  const labels = data.map((row) => row.requestWagon);

  // Prepare datasets for each phase
  const datasets = [
    {
      label: "Фаза 1 - Запрошенные вагоны",
      data: data.map((row) => row.phase1_wagonsRequested),
      backgroundColor: "rgba(53, 162, 235, 0.7)",
    },
    {
      label: "Фаза 2 - Планируемые вагоны",
      data: data.map((row) => row.phase2_plannedWagons),
      backgroundColor: "rgba(75, 192, 192, 0.7)",
    },
    {
      label: "Фаза 2 - Собственные вагоны",
      data: data.map((row) => row.phase2_ownedWagons),
      backgroundColor: "rgba(255, 159, 64, 0.7)",
    },
    {
      label: "Фаза 2 - Нанятые вагоны",
      data: data.map((row) => row.phase2_hiredWagons),
      backgroundColor: "rgba(255, 99, 132, 0.7)",
    },
  ];

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Распределение вагонов по запросу",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Количество вагонов",
        },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PhaseComparisonChart;
