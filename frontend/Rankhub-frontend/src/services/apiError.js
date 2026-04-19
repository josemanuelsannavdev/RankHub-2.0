const DEFAULT_MESSAGE = "Ha ocurrido un error. Intenta nuevamente.";

export const getErrorStatus = (error) => {
  return error?.response?.status ?? null;
};

export const getUserMessageFromApiError = (error, fallbackMessage = DEFAULT_MESSAGE) => {
  const status = getErrorStatus(error);

  if (!status) {
    return "No se pudo conectar con el servidor. Revisa tu conexion e intenta nuevamente.";
  }

  if (status === 400) {
    return "Solicitud invalida. Revisa los datos e intenta nuevamente.";
  }

  if (status === 401) {
    return "Credenciales invalidas o sesion expirada.";
  }

  if (status === 403) {
    return "No tienes permisos para realizar esta accion.";
  }

  if (status === 404) {
    return "El recurso solicitado no existe.";
  }

  if (status >= 500) {
    return "Error del servidor. Intenta nuevamente en unos minutos.";
  }

  return fallbackMessage;
};