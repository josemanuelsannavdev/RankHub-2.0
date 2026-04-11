import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const RankingContext = createContext();

export const RankingProvider = ({ children }) => {
  
  const [currentRanking,setCurrentRanking] = useState(() =>{
    const saved = localStorage.getItem("currentRanking");
    return saved ? JSON.parse(saved) : { id: null, role: null, name: null };
  });
  
  const selectRanking = (ranking) => {
    const rankingData = {
      id: ranking.id,
      role: ranking.role,
      name: ranking.name,
    };
    setCurrentRanking(rankingData);
    localStorage.setItem('currentRanking', JSON.stringify(rankingData)); // Persist
  };

  const clearRanking = () => {
    setCurrentRanking({ id: null, role: null, name: null });
    localStorage.removeItem('currentRanking');
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