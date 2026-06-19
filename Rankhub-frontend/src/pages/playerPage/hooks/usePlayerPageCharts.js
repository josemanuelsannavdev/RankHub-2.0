import { useMemo } from "react";
import {
  buildDuelChartModel,
  buildPositionChartModel,
} from "../utils/playerPageCharts";

const usePlayerPageCharts = ({ historicos, playerId }) => {
  const positionChartModel = useMemo(
    () => buildPositionChartModel({ historicos, playerId }),
    [historicos, playerId],
  );

  const duelChartModel = useMemo(
    () => buildDuelChartModel({ historicos, playerId }),
    [historicos, playerId],
  );

  return {
    positionChartModel,
    duelChartModel,
  };
};

export default usePlayerPageCharts;