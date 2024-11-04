import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startNewGame, drawCard, updateWins } from '../redux/gameSlice';
import { updateLeaderboard } from '../redux/leaderboardSlice';
import { AppDispatch, RootState } from '../redux/store';
import Login from './Login';
import Leaderboard from './Leaderboard';
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Shield, Shuffle, Trophy, Frown, Cat, Bomb } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion"

export default function Game() {
  const dispatch = useDispatch<AppDispatch>();
  const { username, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { deck, drawnCard, gameState, defuseCards, gamesWon, gamesLost } = useSelector((state: RootState) => state.game);

  const handleStartGame = useCallback(() => {
    dispatch(startNewGame());
  }, [dispatch]);

  const handleDrawCard = useCallback(() => {
    if (gameState === 'playing') {
      dispatch(drawCard());
    }
  }, [dispatch, gameState]);

  useEffect(() => {
    if (gameState === 'won') {
      dispatch(updateLeaderboard({ username }))
        .unwrap()
        .then((updatedLeaderboard) => {
          const userEntry = updatedLeaderboard.find(entry => entry.username === username);
          if (userEntry) {
            dispatch(updateWins(userEntry.gamesWon));
          }
        });
    }
  }, [dispatch, gameState, username]);

  useEffect(() => {
    if (drawnCard === 'shuffle') {
      const timer = setTimeout(() => {
        dispatch(startNewGame());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [drawnCard, dispatch]);

  if (!isLoggedIn) {
    return <Login />;
  }

  const renderCardIcon = (type: string) => {
    switch (type) {
      case 'cat':
        return <Cat className="w-16 h-16 text-gray-600" />;
      case 'defuse':
        return <Shield className="w-16 h-16 text-blue-500" />;
      case 'shuffle':
        return <Shuffle className="w-16 h-16 text-green-500" />;
      case 'exploding kitten':
        return <Bomb className="w-16 h-16 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <motion.h1 
        className="text-5xl font-bold mb-8 text-center text-white shadow-text"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Exploding Kittens
      </motion.h1>
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <motion.div
          className="w-full md:w-1/3"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">Welcome, {username}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center text-gray-700">
                <Shield className="mr-2 text-blue-500" /> Defuse cards: {defuseCards}
              </p>
              <p className="flex items-center mt-2 text-gray-700">
                <Shuffle className="mr-2 text-green-500" /> Cards left: {deck ? deck.length : 0}
              </p>
              <p className="flex items-center mt-2 text-gray-700">
                <Trophy className="mr-2 text-yellow-500" /> Games won: {gamesWon}
              </p>
              <p className="flex items-center mt-2 text-gray-700">
                <Frown className="mr-2 text-red-500" /> Games lost: {gamesLost}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          className="w-full md:w-1/3"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">Game Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <AnimatePresence mode="wait">
                {gameState === 'idle' && (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button onClick={handleStartGame} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                      Start New Game
                    </Button>
                  </motion.div>
                )}
                {gameState === 'playing' && (
                  <motion.div
                    key="draw"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button onClick={handleDrawCard} className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                      Draw Card
                    </Button>
                  </motion.div>
                )}
                {gameState === 'won' && (
                  <motion.div
                    key="won"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-green-600 mb-4">You Won!</p>
                    <Button onClick={handleStartGame} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                      Play Again
                    </Button>
                  </motion.div>
                )}
                {gameState === 'lost' && (
                  <motion.div
                    key="lost"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <Bomb className="w-16 h-16 text-red-500 mx-auto mb-2" />
                    <p className="text-xl font-bold text-red-600 mb-4">Game Over!</p>
                    <Button onClick={handleStartGame} className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                      Try Again
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          className="w-full md:w-1/3"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Leaderboard />
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <AnimatePresence>
        {drawnCard && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">Drawn Card</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                {renderCardIcon(drawnCard)}
                <p className="mt-4 text-lg font-semibold text-gray-700">{drawnCard}</p>
                {drawnCard === 'shuffle' && (
                  <p className="mt-2 text-sm text-gray-600">Restarting game in 2 seconds...</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}