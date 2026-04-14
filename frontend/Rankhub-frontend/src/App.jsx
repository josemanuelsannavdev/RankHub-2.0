import "./styles/index.css";
import FormInput from "./components/FormInput";
import Modal from "./components/Modal";
import IconSelect from "./components/IconSelect";
import SubmitButton from "./components/SubmitButton";
import { useState } from "react";
import RankingForm from "./pages/mainPage/RankingForm";
import BottomNavBar from "./pages/mainPage/BottomNavBar";
import { useToast } from "./context/ToastContext";
function App() {
  const {success,error,warning} = useToast();
  return (
    <>
      <h2>APP</h2>

      
      <button onClick={() => alert("Ole los caracoles") }>aaaaaa</button>
            <button onClick={() => error("te equivocaste manin") }>bbbbbb</button>

      <button onClick={() => warning("Cuidao con la faroooola") }>ccccc</button>

    </>
  );
}

export default App;
