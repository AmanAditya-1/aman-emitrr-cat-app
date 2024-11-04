import React from 'react';

interface CardProps {
  type: string;
}

export default function Card({ type }: CardProps) {
  const getEmoji = () => {
    switch (type) {
      case 'cat':
        return '😼';
      case 'defuse':
        return '🙅‍♂️';
      case 'shuffle':
        return '🔀';
      case 'exploding kitten':
        return '💣';
      default:
        return '❓';
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
      <h3 className="text-xl font-bold mb-2">Drawn Card</h3>
      <p className="text-6xl">{getEmoji()}</p>
      <p className="mt-2 capitalize">{type}</p>
    </div>
  );
}