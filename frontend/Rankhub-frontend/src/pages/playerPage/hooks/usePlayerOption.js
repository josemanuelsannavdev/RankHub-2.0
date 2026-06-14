import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deletePlayer } from "../../../services/playerApi";
import { useRanking } from "../../../context/RankingContext";
import { useToast } from "../../../context/ToastContext";

export default function usePlayerOption({ player, onEdit, onClose }) {
	const navigate = useNavigate();
	const { currentRanking } = useRanking();
	const toast = useToast();

	const handleEdit = useCallback(() => {
		if (typeof onEdit === "function") onEdit(player);
	}, [onEdit, player]);

	const handleDelete = useCallback(async () => {
		try {
			await deletePlayer(player.id, player, currentRanking?.id);
			if (typeof onClose === "function") onClose();
			toast.success("Jugador eliminado correctamente");
			navigate(`/ranking/${currentRanking?.id}`);
		} catch (err) {
			const message = err?.response?.data?.message || err?.message || "Error al eliminar jugador";
			toast.error(message);
		}
	}, [player, currentRanking, onClose, navigate, toast]);

	return { handleEdit, handleDelete };
}

