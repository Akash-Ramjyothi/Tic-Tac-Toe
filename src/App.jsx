feat: implement complete game orchestration and state logic in App

- Centralized game state management using React useState
- Implemented immutable turn history tracking (latest-first strategy)
- Derived active player dynamically from turn history
- Built derived game board state from recorded turns (no direct mutation)
- Integrated reusable WINNING_COMBINATIONS for winner detection
- Implemented deterministic winner resolution logic
- Added draw detection when board is full with no winner
- Enabled dynamic player name updates via controlled state
- Implemented clean game reset functionality
- Composed Player, GameBoard, Log, and GameOver components
- Ensured unidirectional data flow and predictable state transitions
- Improved separation of concerns with pure helper functions
