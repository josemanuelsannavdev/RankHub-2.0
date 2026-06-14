import Header from "../../components/Header";
import BottomNavOneButton from "../../components/BottomNavOneButton";
import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EventStatusTabs from "./EventStatusTabs";
import EventCard from "./EventCard";
const event = 
  {
    id: 1,
    title: "Evento 1",
    description: "Descripción del evento 1",
    date: "2023-07-01",
  };
function ViewEventsPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("En Curso");
  const handleCreateClick = () => {
    navigate("/createEvent");
    console.log("Crear evento");
  };
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white">
      <Header title="Eventos Apuestas" />
      <main className="px-4 pb-32">
        <EventStatusTabs activeMode={selectedTab} onModeChange={setSelectedTab} />
         {selectedTab === "En Curso" && (
          <div className="mt-4">
            <EventCard event={event} />
          </div>
        )}
        {selectedTab === "Finalizados" && (
          <div className="mt-4">
            <EventCard event={event} />
          </div>
        )}
      </main>
      <BottomNavOneButton
        buttonTitle="Crear Evento"
        onClick={handleCreateClick}
      />
    </div>
  );
}

export default ViewEventsPage;
