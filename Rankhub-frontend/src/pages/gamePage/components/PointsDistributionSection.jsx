import PropTypes from "prop-types";
import BarChart from "../BarChart";

const PointsDistributionSection = ({ chartModel }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-6">
        Distribución de Puntos
      </h2>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="h-80">
          <BarChart data={chartModel.data} options={chartModel.options} />
        </div>
      </div>
    </section>
  );
};

PointsDistributionSection.propTypes = {
  chartModel: PropTypes.shape({
    data: PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string),
      datasets: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    options: PropTypes.object.isRequired,
  }).isRequired,
};

export default PointsDistributionSection;