import PropTypes from "prop-types";
import BarChart from "../BarChart";

const DuelSection = ({ duelModel }) => {
  if (!duelModel) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-6">
        Duel Stats
      </h2>

      {/* Duelos Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Total Duelos */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Total Duels
          </p>
          <p className="text-3xl font-black text-primary">{duelModel.stats.totalDueles}</p>
        </div>

        {/* Duelos Ganados */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Won
          </p>
          <p className="text-3xl font-black text-emerald-400">
            {duelModel.stats.ganadosTotales}
          </p>
        </div>

        {/* Duelos Perdidos */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Lost
          </p>
          <p className="text-3xl font-black text-red-400">{duelModel.stats.perdidosTotales}</p>
        </div>
      </div>

      {/* Duelos Chart */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="h-80">
          <BarChart data={duelModel.data} options={duelModel.options} />
        </div>
      </div>
    </section>
  );
};

DuelSection.propTypes = {
  duelModel: PropTypes.shape({
    data: PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string),
      datasets: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    options: PropTypes.object.isRequired,
    stats: PropTypes.shape({
      totalDueles: PropTypes.number.isRequired,
      ganadosTotales: PropTypes.number.isRequired,
      perdidosTotales: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default DuelSection;