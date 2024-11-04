import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { motion } from "framer-motion"
import { Cat, Bomb, Shield, Shuffle } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username.trim()));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-gray-800 mb-2">Exploding Kittens</CardTitle>
            <CardDescription className="text-lg text-gray-600">Enter your username to start playing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-lg py-2 px-4 rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition"
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                Start Game
              </Button>
            </form>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Game Rules:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><Cat className="mr-2 text-gray-500" /> Draw cards from the deck until you win or lose.</li>
                <li className="flex items-center"><Bomb className="mr-2 text-red-500" /> If you draw an exploding kitten, you lose unless you have a defuse card.</li>
                <li className="flex items-center"><Shield className="mr-2 text-blue-500" /> Defuse cards can save you from exploding kittens.</li>
                <li className="flex items-center"><Shuffle className="mr-2 text-green-500" /> Shuffle cards restart the game with a new deck of 5 cards.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}