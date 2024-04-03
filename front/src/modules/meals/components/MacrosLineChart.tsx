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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Protein",
      data: [23, 56, 12, 89, 45, 78, 32],
      borderColor: "#18b88a",
      backgroundColor: "#18b88a",
      cubicInterpolationMode: "monotone",
    },
    {
      label: "Carbs",
      data: [5, 17, 39, 64, 28, 93, 10],
      borderColor: "#007aff",
      backgroundColor: "#007aff",
      cubicInterpolationMode: "monotone",
    },
    {
      label: "Fat",
      data: [77, 42, 19, 55, 88, 33, 70],
      borderColor: "#f19f22",
      backgroundColor: "#f19f22",

      cubicInterpolationMode: "monotone",
    },
  ],
};

export function MacrosLineChart() {
  return (
    <Line
      options={options}
      data={data}
      style={{ height: 275, width: "100%" }}
    />
  );
}
