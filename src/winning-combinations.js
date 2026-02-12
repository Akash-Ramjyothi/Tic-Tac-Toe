/**
 * Generates all possible winning combinations for an N x N board.
 * Default: 3x3 (classic Tic-Tac-Toe)
 *
 * @param {number} size - Board size (NxN)
 * @returns {ReadonlyArray<ReadonlyArray<{row: number, column: number}>>}
 */
export function generateWinningCombinations(size = 3) {
  const combinations = [];

  // Rows
  for (let row = 0; row < size; row++) {
    combinations.push(
      Array.from({ length: size }, (_, column) => ({ row, column }))
    );
  }

  // Columns
  for (let column = 0; column < size; column++) {
    combinations.push(
      Array.from({ length: size }, (_, row) => ({ row, column }))
    );
  }

  // Diagonal (Top-left → Bottom-right)
  combinations.push(
    Array.from({ length: size }, (_, i) => ({ row: i, column: i }))
  );

  // Diagonal (Top-right → Bottom-left)
  combinations.push(
    Array.from({ length: size }, (_, i) => ({
      row: i,
      column: size - 1 - i,
    }))
  );

  return Object.freeze(
    combinations.map((combo) => Object.freeze(combo))
  );
}

/**
 * Default 3x3 winning combinations (immutable)
 */
export const WINNING_COMBINATIONS = generateWinningCombinations(3);
