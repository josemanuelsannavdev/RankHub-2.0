import { useMemo } from "react";
import { CHART_DIMENSIONS } from "../utils/chartConfig";


export const useChartDimensions = (labelsCount = 0) => {
  return useMemo(() => {
    const { THRESHOLD_LABELS, BASE_WIDTH, EXTRA_UNIT } = CHART_DIMENSIONS;

    if (!labelsCount || labelsCount <= THRESHOLD_LABELS) {
      return "100%";
    }

    const extra = labelsCount - THRESHOLD_LABELS;
    return `${BASE_WIDTH + extra * EXTRA_UNIT}px`;
  }, [labelsCount]);
};
