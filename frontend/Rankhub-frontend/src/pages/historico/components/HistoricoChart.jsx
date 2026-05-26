import { Line } from "react-chartjs-2";
import { useChartDimensions } from "../hooks/useChartDimensions";
import { getChartOptions } from "../utils/chartConfig";


const HistoricoChart = ({ chartData }) => {
  const options = getChartOptions();
  const minWidthStyle = useChartDimensions(chartData?.labels?.length ?? 0);

  return (
    <div className="bg-surface-container border border-outline/30 rounded-xl p-4 md:p-6 shadow-lg overflow-x-auto">
      <div
        className="h-80 sm:h-96 md:h-[500px] lg:h-[600px]"
        style={{ minWidth: minWidthStyle }}
      >
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HistoricoChart;
