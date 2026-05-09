export const validatePlayerForm = ({ name }) => {
  if (!name) {
    return {
      valid: false,
      message: "Por favor, completa todos los campos.",
    };
  }

  return { valid: true };
};
