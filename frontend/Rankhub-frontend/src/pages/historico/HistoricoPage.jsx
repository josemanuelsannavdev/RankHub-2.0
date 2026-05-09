import { useNavigate } from "react-router-dom";
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
import { Line } from "react-chartjs-2";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import useHistoricoChartData from "./hooks/useHistoricoChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const HistoricoPage = () => {
  const navigate = useNavigate();
  const { chartData, loading, error, hasData } = useHistoricoChartData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#cbc8ab",
          font: { family: "Lexend", weight: "600" },
        },
      },
    },
    scales: {
      y: {
        reverse: true,
        ticks: { color: "#cbc8ab" },
        grid: { color: "rgba(203, 200, 171, 0.1)" },
      },
      x: {
        ticks: { color: "#cbc8ab" },
        grid: { color: "rgba(203, 200, 171, 0.1)" },
      },
    },
  };

  // Layout tuning: if more than 5 labels on X, expand chart min-width by K px per extra label
  const EXTRA_UNIT = 20; // px per extra label beyond 5
  const BASE_WIDTH = 700; // base min width when more than 5 labels
  const computeMinWidth = () => {
    const labelsCount = chartData?.labels?.length ?? 0;
    if (!labelsCount || labelsCount <= 5) return "100%";
    const extra = labelsCount - 5;
    return `${BASE_WIDTH + extra * EXTRA_UNIT}px`;
  };
  const minWidthStyle = computeMinWidth();

  let content;

  if (loading) {
    content = (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-400 dark:text-slate-400 font-medium">
          Cargando histórico...
        </p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400 dark:text-red-400 font-medium">
          No se pudo cargar el histórico. Intenta nuevamente.
        </p>
      </div>
    );
  } else if (hasData) {
    content = (
      <div className="bg-surface-container border border-outline/30 rounded-xl p-4 md:p-6 shadow-lg overflow-x-auto">
        <div className="h-80 sm:h-96 md:h-[500px] lg:h-[600px]" style={{ minWidth: minWidthStyle }}>
          <Line data={chartData} options={options} />
        </div>
      </div>
    );
  } else {
    content = (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-400 dark:text-slate-400 font-medium">
          No hay datos suficientes para mostrar el gráfico.
        </p>
      </div>
    );
  }


  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Ambient Lighting Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <Header title="Histórico de Partidas" />

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter neon-glow-text">
            Histórico
          </h1>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
        </header>

        {content}
      </main>

      
    </div>
  );
};

export default HistoricoPage;
