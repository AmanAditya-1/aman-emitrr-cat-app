import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../redux/leaderboardSlice';
import { AppDispatch, RootState } from '../redux/store';
import io from 'socket.io-client';


const socket = io(process.env.REACT_APP_BACKEND_URL);

export default function Leaderboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { entries, loading, error } = useSelector((state: RootState) => state.leaderboard);
  const [localEntries, setLocalEntries] = useState(entries);

  useEffect(() => {
    dispatch(fetchLeaderboard());

    socket.on('leaderboardUpdate', (updatedEntries) => {
      setLocalEntries(updatedEntries);
    });

    return () => {
      socket.off('leaderboardUpdate');
    };
  }, [dispatch]);

  useEffect(() => {
    setLocalEntries(entries);
  }, [entries]);

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="max-h-40 overflow-y-auto">
        {localEntries?.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <ul>
            {localEntries?.map((entry, index) => (
              <li key={entry.username} className="mb-2">
                {index + 1}. {entry.username}: {entry.gamesWon} win{entry.gamesWon !== 1 ? 's' : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}