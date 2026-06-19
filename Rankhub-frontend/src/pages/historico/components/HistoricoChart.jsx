import { lazy, Suspense } from "react";
import { useChartDimensions } from "../hooks/useChartDimensions";
import { getChartOptions } from "../utils/chartConfig";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Line = lazy(() =>
  import("react-chartjs-2").then((mod) => ({ default: mod.Line }))
);

const HistoricoChart = ({ chartData }) => {
  const options = getChartOptions();
  const minWidthStyle = useChartDimensions(chartData?.labels?.length ?? 0);

  return (
    <Suspense fallback={<div>Cargando gráfico...</div>}>
      <div className="bg-surface-container border border-outline/30 rounded-xl p-4 md:p-6 shadow-lg overflow-x-auto">
        <div
          className="h-80 sm:h-96 md:h-[500px] lg:h-[600px]"
          style={{ minWidth: minWidthStyle }}
        >
          <Line data={chartData} options={options} />
        </div>
      </div>
    </Suspense>
  );
};

HistoricoChart.propTypes = {
  chartData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        borderColor: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        fill: PropTypes.bool.isRequired,
        tension: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default HistoricoChart;