import PropTypes from "prop-types";

function PlayerAvatar({ player, sizeClassName, borderClassName, onClick }) {
  const hasImage = Boolean(player?.image);
  const canClick = Boolean(player?.id && onClick);

  const content = hasImage ? (
    <div
      className={`${sizeClassName} rounded-full overflow-hidden bg-center bg-cover border-4 ${borderClassName}`}
      style={{ backgroundImage: `url(${player.image})` }}
    />
  ) : (
    <div
      className={`${sizeClassName} bg-slate-700 rounded-full flex items-center justify-center border-4 border-dashed ${borderClassName}`}
    >
      <span className="material-symbols-outlined text-sm text-slate-400">
        person
      </span>
    </div>
  );

  if (!canClick) {
    return content;
  }

  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
}

PlayerAvatar.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
  }),
  sizeClassName: PropTypes.string.isRequired,
  borderClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default PlayerAvatar;
