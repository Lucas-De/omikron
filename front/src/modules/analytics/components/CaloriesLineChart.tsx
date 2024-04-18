import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { NutrientChartDataPoint } from "../analytics.model";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: NutrientChartDataPoint[];
}

export function CaloriesLineChart(props: Props) {
  const chartData = formatData(props.data);
  return (
    <Line
      options={options}
      data={chartData}
      style={{ height: 275, width: "100%" }}
    />
  );
}

export const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { min: 0 } },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: { displayColors: false },
  },
};

function formatData(data: NutrientChartDataPoint[]): ChartData<"line"> {
  return {
    labels: data.map((point) => point.label),
    datasets: [
      {
        label: "Calories",
        data: data.map((point) => point.calories ?? 0),
        borderColor: "white",
        backgroundColor: "white",
        cubicInterpolationMode: "monotone",
      },
    ],
  };
}
