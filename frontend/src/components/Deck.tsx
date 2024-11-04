import React from 'react';

interface DeckProps {
  cardsLeft: number;
  onDraw: () => void;
}

export default function Deck({ cardsLeft, onDraw }: DeckProps) {
  return (
    <div className="text-center">
      <button
        onClick={onDraw}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
        disabled={cardsLeft === 0}
      >
        Draw Card
      </button>
      <p>Cards left: {cardsLeft}</p>
    </div>
  );
}