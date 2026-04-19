import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const RankingContext = createContext();
const EMPTY_RANKING = { id: null, role: null, name: null };

const readStoredRanking = () => {
  try {
    const saved = localStorage.getItem("currentRanking");
    return saved ? JSON.parse(saved) : EMPTY_RANKING;
  } catch {
    return EMPTY_RANKING;
  }
};

const writeStoredRanking = (ranking) => {
  try {
    localStorage.setItem("currentRanking", JSON.stringify(ranking));
  } catch {
    // Ignore storage errors to avoid breaking UI state.
  }
};

const clearStoredRanking = () => {
  try {
    localStorage.removeItem("currentRanking");
  } catch {
    // Ignore storage errors to avoid breaking UI state.
  }
};

export const RankingProvider = ({ children }) => {
  const [currentRanking, setCurrentRanking] = useState(() => {
    return readStoredRanking();
  });

  const selectRanking = (ranking) => {
    const rankingData = {
      id: ranking.id,
      role: ranking.role,
      name: ranking.name,
    };

    setCurrentRanking(rankingData);
    writeStoredRanking(rankingData);
  };

  const clearRanking = () => {
    setCurrentRanking(EMPTY_RANKING);
    clearStoredRanking();
  };

  return (
    <RankingContext.Provider value={{ currentRanking, selectRanking, clearRanking }}>
      {children}
    </RankingContext.Provider>
  );
};

export const useRanking = () => {
  return useContext(RankingContext);
};

RankingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};