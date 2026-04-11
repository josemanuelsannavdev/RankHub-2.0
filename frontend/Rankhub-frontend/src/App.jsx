import "./styles/index.css";
import FormInput from "./components/FormInput";
import Modal from "./components/Modal";
import IconSelect from "./components/IconSelect";
import SubmitButton from "./components/SubmitButton";
import { useState } from "react";
import RankingForm from "./pages/mainPage/RankingForm";
import BottomNavBar from "./pages/mainPage/BottomNavBar";


function App() {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [createRankingModalOpen, setCreateRankingModalOpen] = useState(false);
  const handleCreateRankingButton = () => {
    setCreateRankingModalOpen(true);
  };

  return (
    <>
      <h2>APP</h2>
      <span className="material-symbols-outlined">Expand</span>

      <BottomNavBar onClick={handleCreateRankingButton}/>
      {createRankingModalOpen && 
      <Modal>
        <RankingForm onClose={() => setCreateRankingModalOpen(false)} />
        </Modal>}
    </>
  );
}

export default App;
