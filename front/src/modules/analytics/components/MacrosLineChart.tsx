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
import { MacroDataPoint } from "../analytics.model";

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
  data: MacroDataPoint[];
}

export const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

export function MacrosLineChart(props: Props) {
  const chartData = formatData(props.data);
  return (
    <Line
      options={options}
      data={chartData}
      style={{ height: 275, width: "100%" }}
    />
  );
}

function formatData(data: MacroDataPoint[]): ChartData<"line"> {
  return {
    labels: data.map((point) => point.label),
    datasets: [
      {
        label: "Protein",
        data: data.map((point) => point.proteins ?? 0),
        borderColor: "#18b88a",
        backgroundColor: "#18b88a",
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Carbs",
        data: data.map((point) => point.carbs ?? 0),
        borderColor: "#007aff",
        backgroundColor: "#007aff",
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Fat",
        data: data.map((point) => point.fats ?? 0),
        borderColor: "#f19f22",
        backgroundColor: "#f19f22",
        cubicInterpolationMode: "monotone",
      },
    ],
  };
}
