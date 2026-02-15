import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Auto-focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleChange(event) {
    setPlayerName(event.target.value);
    if (error) setError(null);
  }

  function handleSave() {
    const trimmedName = playerName.trim();

    if (!trimmedName) {
      setError("Player name cannot be empty.");
      return;
    }

    onChangeName(symbol, trimmedName);
    setIsEditing(false);
  }

  function handleEditClick() {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSave();
    }

    if (event.key === "Escape") {
      setPlayerName(initialName);
      setIsEditing(false);
      setError(null);
    }
  }

  return (
    <li
      className={`player-item ${isActive ? "active" : ""}`}
      aria-current={isActive ? "true" : "false"}
    >
      <span className="player">
        {isEditing ? (
          <div className="player-edit">
            <input
              ref={inputRef}
              type="text"
              required
              value={playerName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              aria-label={`Edit name for player ${symbol}`}
              maxLength={20}
            />
            {error && <p className="error-text">{error}</p>}
          </div>
        ) : (
          <span className="player-name">{playerName}</span>
        )}

        <span className="player-symbol">{symbol}</span>
      </span>

      <button
        type="button"
        onClick={handleEditClick}
        className="edit-btn"
        aria-label={isEditing ? "Save player name" : "Edit player name"}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}

Player.propTypes = {
  initialName: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChangeName: PropTypes.func.isRequired,
};
