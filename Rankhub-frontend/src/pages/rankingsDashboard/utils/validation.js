export default function validateRankingForm({ name, icon }) {
  if (!name || !icon) {
    return { valid: false, message: "Por favor, completa todos los campos." };
  }
  return { valid: true };
}
