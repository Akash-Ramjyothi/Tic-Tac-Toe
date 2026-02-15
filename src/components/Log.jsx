import PropTypes from "prop-types";

export default function Log({ turns }) {
  if (!turns || turns.length === 0) {
    return (
      <div id="log" className="log-empty">
        <p>No moves yet. Start the game!</p>
      </div>
    );
  }

  return (
    <section aria-label="Game move history">
      <ol id="log" className="log-list">
        {[...turns]
          .slice()
          .reverse()
          .map((turn, index) => {
            const moveNumber = turns.length - index;

            return (
              <li
                key={`${turn.player}-${turn.square.row}-${turn.square.col}-${moveNumber}`}
                className="log-item"
              >
                <span className="move-number">#{moveNumber}</span>{" "}
                <span className="move-player">{turn.player}</span>{" "}
                selected{" "}
                <span className="move-position">
                  ({turn.square.row}, {turn.square.col})
                </span>
              </li>
            );
          })}
      </ol>
    </section>
  );
}

Log.propTypes = {
  turns: PropTypes.arrayOf(
    PropTypes.shape({
      player: PropTypes.string.isRequired,
      square: PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
