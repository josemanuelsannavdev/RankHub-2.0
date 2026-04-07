import "../../index.css";
import Filters from "./Filters";
import Header from "../../components/Header";
import Podium from "./Podium"
import RankingList from "./RankingList";
import BottomNav from "../../components/BottomNav";

function RankingPage() {
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

export default RankingPage;
