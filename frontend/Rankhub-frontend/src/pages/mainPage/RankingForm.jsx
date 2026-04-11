import { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import IconSelect from "../../components/IconSelect";
import SubmitButton from "../../components/SubmitButton";
import gatewayApi from "../../services/gatewayApi";
import CancelButton from "../../components/CancelButton";
import PropTypes from "prop-types";

const RankingForm = ({ onClose, onRankingCreated, rankingToEdit }) => {
  const [icon, setIcon] = useState(rankingToEdit?.icon || "");
  const [name, setName] = useState(rankingToEdit?.name || "");

  const isEditMode = !!rankingToEdit;

  useEffect(() => {
    setName(rankingToEdit?.name || "");
    setIcon(rankingToEdit?.icon || "");
  }, [rankingToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !icon) {
      alert("Por favor, completa todos los campos.");
    } else {
      try {
        const token = localStorage.getItem("token");
        if (isEditMode) {
          console.log("Editando ranking :", rankingToEdit);
          const response = await gatewayApi.post(
            `/ranking-service/ranking/${rankingToEdit.id}`,
            {
              targetMethod: "PUT",
              queryParams: {},
              body: { name: name, icon: icon },
            },
            { headers: { Authorization: `Bearer ${token}` } },
          );
          console.log("Ranking editado:", response.data);
          const editedRanking = {
            ...rankingToEdit, // Mantiene id, role, etc.
            ...response.data, // Sobrescribe con name e icon actualizados
          };
          alert("Ranking editado exitosamente.");
          onRankingCreated(editedRanking);
        } else {
          const newRanking = await gatewayApi.post(
            "/ranking-service/ranking",
            {
              targetMethod: "POST",
              queryParams: {},
              body: { name: name, icon: icon },
            },
            { headers: { Authorization: `Bearer ${token}` } },
          );
          alert("Ranking creado exitosamente.");
          onRankingCreated(newRanking.data);
        }

        onClose();
      } catch (error) {
        console.error("Error al crear o editar ranking:", error);
        alert("Error al crear o editar el ranking. Intenta nuevamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
        <FormInput
          label="Nombre del ranking"
          type="text"
          placeholder="Ej: Liga de Fútbol 2024"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <IconSelect selected={icon} onSelect={setIcon} />
      </div>
      <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <SubmitButton
          text={isEditMode ? "Guardar cambios" : "Crear ranking"}
          fullWidth
        />
        <CancelButton text="Cancelar" fullWidth onClick={onClose} />
      </div>
    </form>
  );
};

RankingForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRankingCreated: PropTypes.func,
};
export default RankingForm;
