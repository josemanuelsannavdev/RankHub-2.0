import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import RankingCard from "./RankingCard";
import BottomNavBar from "./BottomNavBar";
import gatewayApi from "../../services/gatewayApi";
import { useRanking } from "../../context/RankingContext";
import Modal from "../../components/Modal";
import RankingForm from "./RankingForm";
import OptionButton from "../../components/OptionButton";
import CancelButton from "../../components/CancelButton";
function MainPage() {
  const [rankingsAdmin, setRankingsAdmin] = useState([]);
  const [rankingsSubAdmin, setRankingsSubAdmin] = useState([]);
  const [rankingsGuest, setRankingsGuest] = useState([]);
  const navigate = useNavigate();
  const { selectRanking } = useRanking();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRanking, setEditingRanking] = useState(null);
  const [modalOpenOptions, setModalOpenOptions] = useState(false);
  const [optionRanking, setOptionRanking] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await gatewayApi.post(
          `/ranking-service/me/ranking`,
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

        setRankingsAdmin(response.data.filter((r) => r.role === "ADMIN"));
        setRankingsSubAdmin(
          response.data.filter((r) => r.role === "SUB_ADMIN"),
        );
        setRankingsGuest(response.data.filter((r) => r.role === "GUEST"));
      } catch (error) {
        console.error("Error al cargar rankings:", error);
        alert("Error al cargar los rankings. Intenta nuevamente.");
      }
    };

    fetchRankings();
  }, [navigate]);

  const handleCreateRankingButton = () => {
    setEditingRanking(null);
    setModalOpen(true);
  };

  const handleEditRanking = (ranking) => {
    setEditingRanking(ranking); // modo editar
    setModalOpenOptions(false);
    setModalOpen(true);
  };

  const handleRankingCreated = (newRanking) => {
    const updateList = (list) => {
      const index = list.findIndex((r) => r.id === newRanking.id);

      if (index !== -1) {
        // Actualizar: reemplazar en la posición encontrada
        const newList = [...list];
        newList[index] = newRanking;
        return newList;
      }
      // Crear: añadir al final
      return [...list, newRanking];
    };

    if (newRanking.role === "ADMIN") {
      setRankingsAdmin((prev) => updateList(prev));
    } else if (newRanking.role === "SUB_ADMIN") {
      setRankingsSubAdmin((prev) => updateList(prev));
    } else {
      setRankingsGuest((prev) => updateList(prev));
    }
  };

  const handleRankingClick = (ranking) => {
    selectRanking(ranking); //esto es para que el contexto sepa cuál ranking está seleccionado, así lo puede usar en otras partes de la app
    navigate(`/ranking/${ranking.id}`);
  };

  const handleOptionRanking = (ranking) => {
    setOptionRanking(ranking);
    setModalOpenOptions(true);
  };

  const handleDeleteRanking = async (ranking) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await gatewayApi.post(
        `/ranking-service/ranking/${ranking.id}`,
        {
          targetMethod: "Delete",
          queryParams: {},
          body: {},
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Ranking Borrado");
      const updateList = (list) => {
        const index = list.findIndex((r) => r.id === ranking.id);

        if (index !== -1) {
          // ❌ lo encontró → lo eliminamos
          const newList = [...list];
          newList.splice(index, 1);
          return newList;
        }
      };

      if (ranking.role === "ADMIN") {
        setRankingsAdmin((prev) => updateList(prev));
      } else if (ranking.role === "SUB_ADMIN") {
        setRankingsSubAdmin((prev) => updateList(prev));
      } else {
        setRankingsGuest((prev) => updateList(prev));
      }
      setModalOpenOptions(false);
    } catch (error) {
      console.error("Error al borrar el ranking:", error);
      alert("Error al borrar el ranking.");
    }
  };

  const handleExitRanking = async (ranking) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await gatewayApi.post(
        `/ranking-service/me/ranking/${ranking.id}`,
        {
          targetMethod: "Delete",
          queryParams: {},
          body: {},
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Ranking Borrado");
      const updateList = (list) => {
        const index = list.findIndex((r) => r.id === ranking.id);

        if (index !== -1) {
          // ❌ lo encontró → lo eliminamos
          const newList = [...list];
          newList.splice(index, 1);
          return newList;
        }
      };

      if (ranking.role === "ADMIN") {
        setRankingsAdmin((prev) => updateList(prev));
      } else if (ranking.role === "SUB_ADMIN") {
        setRankingsSubAdmin((prev) => updateList(prev));
      } else {
        setRankingsGuest((prev) => updateList(prev));
      }
      setModalOpenOptions(false);
    } catch (error) {
      console.error("Error al borrar el ranking:", error);
      alert("Error al borrar el ranking.");
    }
  };

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Ambient Lighting Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/*<TopNavbar /> */}
      <Header />
      {/*  Main Content */}
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter neon-glow-text">
            YOUR RANKINGS
          </h1>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
        </header>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              SECTION
            </span>
            <h2 className="text-xl font-extrabold uppercase tracking-widest text-on-surface-variant">
              ADMIN
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {rankingsAdmin.map((ranking) => (
              <RankingCard
                ranking={ranking}
                key={ranking.id}
                variant="owner"
                onClickEntry={() => handleRankingClick(ranking)}
                onClickOption={() => handleOptionRanking(ranking)}
              />
            ))}
          </div>
        </section>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant">
              SECTION
            </span>
            <h2 className="text-xl font-extrabold uppercase tracking-widest text-on-surface-variant">
              SUBADMIN
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {rankingsSubAdmin.map((ranking) => (
              <RankingCard
                key={ranking.id}
                ranking={ranking}
                variant="subadmin"
                onClickEntry={() => handleRankingClick(ranking)}
                onClickOption={() => handleOptionRanking(ranking)}
              />
            ))}
          </div>
        </section>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant">
              SECTION
            </span>
            <h2 className="text-xl font-extrabold uppercase tracking-widest text-on-surface-variant">
              GUEST
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {rankingsGuest.map((ranking) => (
              <RankingCard
                key={ranking.id}
                ranking={ranking}
                variant="guest"
                onClickEntry={() => handleRankingClick(ranking)}
                onClickOption={() => handleOptionRanking(ranking)}
              />
            ))}
          </div>
        </section>
      </main>

      {/*Bottom Navbar*/}
      <BottomNavBar onClick={handleCreateRankingButton} />
      {modalOpen && (
        <Modal
          title={editingRanking ? "Edit Ranking" : "New Ranking"}
          description={
            editingRanking
              ? "Modify your ranking"
              : "Configure the details of your new ranking"
          }
        >
          <RankingForm
            onClose={() => setModalOpen(false)}
            onRankingCreated={handleRankingCreated}
            rankingToEdit={editingRanking}
          />
        </Modal>
      )}
      {modalOpenOptions && (
        <Modal
          title="Opciones"
          description="Estas son las opciones del ranking"
        >
          <OptionButton
            text="editar"
            important={false}
            icon="edit"
            onClick={() => handleEditRanking(optionRanking)}
          />
          <OptionButton
            text="editar integrantes"
            important={false}
            icon="person_edit"
          />
          <OptionButton
            text="borrar"
            important={true}
            icon="delete"
            onClick={() => handleDeleteRanking(optionRanking)}
          />

          <OptionButton
            text="salir del ranking"
            important={true}
            icon="cancel"
            onClick={() => handleExitRanking(optionRanking)}
          />
          <CancelButton
            text="Cancelar"
            onClick={() => setModalOpenOptions(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default MainPage;
