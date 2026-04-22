import { useState } from 'react';
import CreateGameBottomNav from './components/CreateGameBottomNav';
import GameModeTabs from './components/GameModeTabs';
import IndividualGameForm from './components/IndividualGameForm';
import TeamGameForm from './components/TeamGameForm';
import DuelGameForm from './components/DuelGameForm';
import Header from '../../components/Header';

function CreateGamePage() {
  const [activeMode, setActiveMode] = useState('individual');

  const renderFormByMode = () => {
    if (activeMode === 'teams') {
      return <TeamGameForm />;
    }

    if (activeMode === 'duel') {
      return <DuelGameForm />;
    }

    return <IndividualGameForm />;
  };

  return (
    <div>
      <Header title="Crear Juego" />

      <main className="px-4 pb-32">
        <GameModeTabs activeMode={activeMode} onModeChange={setActiveMode} />
        {renderFormByMode()}
      </main>

      <CreateGameBottomNav />
    </div>
  );
}

export default CreateGamePage;
