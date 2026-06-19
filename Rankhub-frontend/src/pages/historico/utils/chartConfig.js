/**
 * Chart configuration constants and styling
 */

export const CHART_COLORS = [
  "#f9f506", // primary yellow
  "#d1d5db", // secondary gray
  "#cd7f32", // tertiary bronze
  "#22c55e", // winner green
  "#ef4444", // loser red
  "#0F84EB", // blue
  "#65d6a9", // mint
  "#FF7F50", // coral
  "#FF00FF", // magenta
  "#00FFFF", // cyan
  "#590466", // purple
  "#008080", // teal
  "#a19f9f", // gray
  "#ca984d", // brown
  "#b34dca", // morao
  "#b1b448", // olive
];


export const getChartOptions = () => ({
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
});


export const CHART_DIMENSIONS = {
  BASE_WIDTH: 700, // Base min-width when more than 5 labels
  EXTRA_UNIT: 20, // Additional pixels per label beyond 5
  THRESHOLD_LABELS: 5, // Threshold for applying responsive width
};
