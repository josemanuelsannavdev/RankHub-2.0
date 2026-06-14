import { lazy, Suspense } from "react";
import PropTypes from "prop-types";

const Bar = lazy(() =>
  import("react-chartjs-2").then((mod) => ({ default: mod.Bar }))
);

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