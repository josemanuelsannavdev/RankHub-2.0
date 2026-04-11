import React from "react";
import PropTypes from "prop-types";

const RankingCard = ({
  ranking,
  variant = "owner",
  onClickEntry,
  onClickEdit,
}) => {
  const isOwner = variant === "owner";

  return (
    <div
      className={` group relative bg-surface-container-low/40 backdrop-blur-md border border-outline-variant p-5 rounded-xl transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden ${
        isOwner ? "hover:border-primary/40" : "hover:border-on-surface/40"
      }`}
    >
      {/* Línea lateral (solo owner) */}
      {isOwner && (
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-300"></div>
      )}

      <div className="flex items-center justify-between">
        {/* IZQUIERDA */}
        <div className="flex items-center gap-4">
          {/* ICONO */}
          <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant">
            <span
              className={`material-symbols-outlined ${
                isOwner ? "text-primary" : "text-zinc-400"
              }`}
            >
              {ranking.icon}
            </span>
          </div>

          {/* TEXTO */}
          <div>
            <h3
              className={`text-lg font-bold transition-colors ${
                isOwner
                  ? "group-hover:text-primary"
                  : "group-hover:text-on-surface"
              }`}
            >
              {ranking.name}
            </h3>

            <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">
              {/** {ranking.subtitle}*/}
              "descripcion generica de ranking"
            </p>
          </div>
        </div>
        {/* BOTÓN Enter */}
        <button
          className={`transition-colors p-2 rounded-lg ${
            isOwner
              ? "text-zinc-500 hover:text-primary active:bg-primary/10"
              : "text-zinc-500 hover:text-on-surface active:bg-white/5"
          }`}
          onClick={onClickEntry}
        >
          <span className="material-symbols-outlined">play_circle</span>
        </button>
        {/* BOTÓN DERECHA */}
        <button
          className={`transition-colors p-2 rounded-lg ${
            isOwner
              ? "text-zinc-500 hover:text-primary active:bg-primary/10"
              : "text-zinc-500 hover:text-on-surface active:bg-white/5"
          }`}
          onClick={() =>onClickEdit(ranking)}
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </div>
  );
};

RankingCard.propTypes = {
  ranking: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // subtitle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.oneOf(["owner", "subadmin", "guest"]),
  onClickEntry: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

export default RankingCard;
