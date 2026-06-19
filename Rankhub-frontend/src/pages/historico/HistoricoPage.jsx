import Header from "../../components/Header";
import useHistoricoChartData from "./hooks/useHistoricoChartData";
import HistoricoChart from "./components/HistoricoChart";
import HistoricoLoading from "./components/HistoricoLoading";
import HistoricoError from "./components/HistoricoError";
import HistoricoEmpty from "./components/HistoricoEmpty";

const HistoricoPage = () => {
  const { chartData, loading, error, hasData } = useHistoricoChartData();

  let content;

  if (loading) {
    content = <HistoricoLoading />;
  } else if (error) {
    content = <HistoricoError />;
  } else if (hasData) {
    content = <HistoricoChart chartData={chartData} />;
  } else {
    content = <HistoricoEmpty />;
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