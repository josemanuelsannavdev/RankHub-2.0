import { createContext, useCallback, useContext, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

const TOAST_VARIANT_CLASSES = {
  success: "border-emerald-400/50 before:bg-emerald-400",
  error: "border-error/60 before:bg-error",
  warning: "border-tertiary-fixed/60 before:bg-tertiary-fixed",
  info: "border-secondary/60 before:bg-secondary",
  default: "border-primary/50 before:bg-primary",
};

const TOAST_PROGRESS_COLORS = {
  success: "#34d399",
  error: "#ffb4ab",
  warning: "#cd7f32",
  info: "#d1d5db",
  default: "#f9f506",
};

const TOAST_AUTO_CLOSE_BY_TYPE = {
  success: 2000,
  warning: 3500,
  error: 4500,
  info: 3200,
  default: 3200,
};

const ICONS_BY_TYPE = {
  success: "check_circle",
  error: "error",
  warning: "warning",
  info: "info",
  default: "notifications",
};

const toastContainerConfig = {
  position: "top-right",
  autoClose: 3200,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: true,
  draggable: false,
  newestOnTop: true,
  limit: 4,
  theme: "dark",
  icon: ({ type }) => (
    <span
      aria-hidden="true"
      className="material-symbols-outlined text-base leading-none text-on-surface"
    >
      {ICONS_BY_TYPE[type] ?? ICONS_BY_TYPE.default}
    </span>
  ),
  toastClassName: ({ type }) =>
    [
      "group relative min-h-0 rounded-2xl border border-outline-variant",
      "bg-surface-container-high/95 text-on-surface shadow-[0_10px_28px_rgba(0,0,0,0.42)]",
      "backdrop-blur-md px-4 py-3 pr-10 font-display",
      "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-2xl",
      TOAST_VARIANT_CLASSES[type] ?? TOAST_VARIANT_CLASSES.default,
    ].join(" "),
  bodyClassName: () =>
    "m-0 p-0 text-sm font-medium leading-5 tracking-[0.01em] text-on-surface",
  closeButton: ({ closeToast }) => (
    <button
      type="button"
      onClick={closeToast}
      className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label="Cerrar notificacion"
    >
      <span aria-hidden="true" className="material-symbols-outlined text-base">
        close
      </span>
    </button>
  ),
};

const getTypeLabel = (type) => {
  if (type === "success") return "success";
  if (type === "error") return "error";
  if (type === "warning") return "warning";
  if (type === "info") return "information";
  return "notification";
};

const buildAutoToastId = (type, message) => {
  return `${type}:${String(message).trim().toLowerCase()}`;
};

export const ToastProvider = ({ children }) => {
  const notify = useCallback((type, message, options = {}) => {
    if (!message) return;

    const resolvedType = type ?? "default";
    const defaultAutoClose = TOAST_AUTO_CLOSE_BY_TYPE[resolvedType] ?? TOAST_AUTO_CLOSE_BY_TYPE.default;
    const defaultProgressColor = TOAST_PROGRESS_COLORS[resolvedType] ?? TOAST_PROGRESS_COLORS.default;
    const {
      dedupe = true,
      toastId: providedToastId,
      ...toastOptions
    } = options;

    const resolvedToastId = dedupe
      ? (providedToastId ?? buildAutoToastId(resolvedType, message))
      : providedToastId;

    const sharedOptions = {
      role: type === "error" ? "alert" : "status",
      ariaLabel: `${getTypeLabel(type)} notification`,
      autoClose: defaultAutoClose,
      ...(resolvedToastId ? { toastId: resolvedToastId } : {}),
      progressStyle: {
        height: 4,
        opacity: 1,
        background: defaultProgressColor,
      },
      ...toastOptions,
    };

    if (type === "success") {
      toast.success(message, sharedOptions);
      return;
    }

    if (type === "error") {
      toast.error(message, sharedOptions);
      return;
    }

    if (type === "warning") {
      toast.warning(message, sharedOptions);
      return;
    }

    if (type === "info") {
      toast.info(message, sharedOptions);
      return;
    }

    toast(message, sharedOptions);
  }, []);

  const success = useCallback(
    (message, options) => {
      notify("success", message, options);
    },
    [notify],
  );

  const warning = useCallback(
    (message, options) => {
      notify("warning", message, options);
    },
    [notify],
  );

  const error = useCallback(
    (message, options) => {
      notify("error", message, options);
    },
    [notify],
  );

  const info = useCallback(
    (message, options) => {
      notify("info", message, options);
    },
    [notify],
  );

  const value = useMemo(
    () => ({ success, warning, error, info, notify }),
    [success, warning, error, info, notify],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer {...toastContainerConfig} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
