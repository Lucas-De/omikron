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
import { color } from "../../../common/design-tokens/color";

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

export function MacrosLineChart(props: Props) {
  const chartData = formatData(props.data);
  return (
    <div>
      <Line
        options={options}
        data={chartData}
        style={{ height: 275, width: "100%" }}
      />
    </div>
  );
}

export const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      ticks: {
        callback: (value) => `${value}g`,
      },
    },
  },
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
        label: "Protein",
        data: data.map((point) => point.proteins ?? 0),
        borderColor: color.protein,
        backgroundColor: color.protein,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Carbs",
        data: data.map((point) => point.carbs ?? 0),
        borderColor: color.carb,
        backgroundColor: color.carb,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Fat",
        data: data.map((point) => point.fats ?? 0),
        borderColor: color.fat,
        backgroundColor: color.fat,
        cubicInterpolationMode: "monotone",
      },
    ],
  };
}
