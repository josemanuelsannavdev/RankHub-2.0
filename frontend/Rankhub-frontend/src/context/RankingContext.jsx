import { createContext, useState, useMemo, use } from "react";
import PropTypes from "prop-types";

const RankingContext = createContext();

const EMPTY_RANKING = { id: null, role: null, name: null };

const STORAGE_KEYS = {
  CURRENT_RANKING: "currentRanking:v1",
};

const readStoredRanking = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_RANKING);
    return saved ? JSON.parse(saved) : EMPTY_RANKING;
  } catch {
    return EMPTY_RANKING;
  }
};

const writeStoredRanking = (ranking) => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_RANKING,
      JSON.stringify(ranking),
    );
  } catch {
    // ignore
  }
};

const clearStoredRanking = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_RANKING);
  } catch {
    // ignore
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

  const value = useMemo(() => {
    return {
      currentRanking,
      selectRanking,
      clearRanking,
    };
  }, [currentRanking]);

  return (
    <RankingContext.Provider value={value}>
      {children}
    </RankingContext.Provider>
  );
};

export const useRanking = () => {
  const context = use(RankingContext);

  if (!context) {
    throw new Error("useRanking must be used within a RankingProvider");
  }

  return context;
};

RankingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};