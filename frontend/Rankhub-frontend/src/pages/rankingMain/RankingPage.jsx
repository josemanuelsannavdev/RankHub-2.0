import "../../styles/index.css";
import Filters from "./Filters";
import Header from "../../components/Header";
import Podium from "./Podium";
import RankingList from "./RankingList";
import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import gatewayApi from "../../services/gatewayApi";
import { useRanking } from "../../context/RankingContext";
import { useEffect, useState } from "react";

function RankingPage() {
  const { currentRanking } = useRanking();
  const [podiumPlayers, setPodiumPlayers] = useState([]);
  const [restPlayers, setRestPlayers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankingPlayers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        console.log("Fetching players for ranking:", currentRanking);
        const response = await gatewayApi.post(
          `/ranking-service/jugador/torneo/${currentRanking.id}`,
          {
            targetMethod: "GET",
            queryParams: {},
            body: {},
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const players = response.data || [];
        players.sort((a, b) => b.score - a.score); // Ordenar por puntuación descendente
        setPodiumPlayers(players.slice(0, 3)); // Top 3 para el podio
        setRestPlayers(players.slice(3)); // Resto de jugadores
        console.log("Podium Players:", players);
        if (players.length === 0) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ranking players:", error);
      }
    };

    fetchRankingPlayers();
  }, [navigate]);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white">
      <Header title={currentRanking.name} />
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-2xl font-semibold mb-4">
            No hay jugadores en este ranking
          </h2>
          <p className="text-gray-600">
            Invita a tus amigos a unirse y competir por el podio.
          </p>
        </div>
      ) : (
        <>
          <Filters />
          <Podium podiumPlayers={podiumPlayers} />
          <RankingList restPlayers={restPlayers}/>
        </>
      )}
      <BottomNav />
    </div>
  );
}

export default RankingPage;
