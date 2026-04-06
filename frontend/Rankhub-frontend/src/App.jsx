import "./index.css";
import Filters from "./components/Filters";
import Header from "./components/Header";
import Podium from "./components/Podium"
import RankingList from "./components/RankingList";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white">
      <Header />
      <Filters/>
      <Podium></Podium>
      <RankingList></RankingList>
      <BottomNav></BottomNav>
    </div>
  );
}

export default App;
