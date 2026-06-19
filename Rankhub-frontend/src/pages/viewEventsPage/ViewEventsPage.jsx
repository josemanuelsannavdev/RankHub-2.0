import Header from "../../components/Header";
import BottomNavOneButton from "../../components/BottomNavOneButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventStatusTabs from "./EventStatusTabs";
import EventCard from "./EventCard";
import { useEvent } from "./hooks/useEvent";
function ViewEventsPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("En Curso");
  const handleCreateClick = () => {
    navigate("/createEvent");
  };

  const { currentEvents, finishedEvents, closedEvents, handleFinishEvent } = useEvent();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white">
      <Header title="Eventos Apuestas" />
      <main className="px-4 pb-32">
        <EventStatusTabs activeMode={selectedTab} onModeChange={setSelectedTab} />
         {selectedTab === "En Curso" && (
          <div className="mt-4">
            {currentEvents.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No hay eventos en curso.
              </p>
            ) : (
              currentEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        )}
        {selectedTab === "Finalizados" && (
          <div className="mt-4">
            {finishedEvents.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No hay eventos finalizados.
              </p>
            ) : (
              finishedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        )}
        {selectedTab === "Cerrados" && (
          <div className="mt-4">
            {closedEvents.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No hay eventos cerrados.
              </p>
            ) : (
              closedEvents.map((event) => (
                <EventCard key={event.id} event={event} onFinish={handleFinishEvent} />
              ))
            )}
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
