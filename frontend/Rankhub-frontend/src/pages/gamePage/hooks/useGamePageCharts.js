import { useMemo } from "react";
import {
  buildPositionChartModel,
} from "../utils/gamePageCharts";

const useGamePageCharts = ({ historicos, gameId }) => {
  const positionChartModel = useMemo(
    () => buildPositionChartModel({ historicos, gameId }),
    [historicos, gameId],
  );

 

  return {
    positionChartModel,
  };
};

export default useGamePageCharts;