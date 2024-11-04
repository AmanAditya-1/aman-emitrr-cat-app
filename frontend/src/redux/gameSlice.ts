import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  deck: string[];
  drawnCard: string | null;
  gameState: 'idle' | 'playing' | 'won' | 'lost';
  defuseCards: number;
  gamesWon: number;
  gamesLost: number;
}

const initialState: GameState = {
  deck: [],
  drawnCard: null,
  gameState: 'idle',
  defuseCards: 0,
  gamesWon: 0,
  gamesLost: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewGame: (state) => {
      state.deck = generateDeck();
      state.drawnCard = null;
      state.gameState = 'playing';
      state.defuseCards = 0;
    },
    drawCard: (state) => {
      if (state.deck.length > 0 && state.gameState === 'playing') {
        const drawnCard = state.deck.pop()!;
        state.drawnCard = drawnCard;

        switch (drawnCard) {
          case 'exploding kitten':
            if (state.defuseCards > 0) {
              state.defuseCards--;
              // Exploding kitten is removed from the game when defused
            } else {
              state.gameState = 'lost';
              state.gamesLost++;
            }
            break;
          case 'defuse':
            state.defuseCards++;
            break;
          case 'shuffle':
            state.deck = generateDeck();
            break;
          // 'cat' cards are automatically removed by popping from the deck
        }

        if (state.deck.length === 0 && state.gameState !== 'lost') {
          state.gameState = 'won';
          state.gamesWon++;
        }
      }
    },
    updateWins: (state, action: PayloadAction<number>) => {
      state.gamesWon = action.payload;
    },
  },
});

function generateDeck(): string[] {
  const cardTypes = ['cat', 'defuse', 'shuffle', 'exploding kitten'];
  const deck: string[] = [];

  // Generate 5 random cards
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * cardTypes.length);
    deck.push(cardTypes[randomIndex]);
  }

  return shuffleArray(deck);
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const { startNewGame, drawCard, updateWins } = gameSlice.actions;
export default gameSlice.reducer;