import { lazy, Suspense } from "react";
import PropTypes from "prop-types";

const Bar = lazy(async () => {
  const chartjs = await import("chart.js");
  const reactChart = await import("react-chartjs-2");

  const {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } = chartjs;

  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return { default: reactChart.Bar };
});

const BarChart = ({ data, options }) => {
  return (
    <Suspense fallback={<div>Cargando gráfico...</div>}>
      <Bar data={data} options={options} />
    </Suspense>
  );
};

BarChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  options: PropTypes.object,
};

export default BarChart;