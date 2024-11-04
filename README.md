# Exploding Kitten Game

An interactive card game created with **ReactJS**, **Redux**, **Golang**, and **Redis**, inspired by the popular "Exploding Kittens" game. This application allows users to draw cards with a bit of suspense—avoid the bomb, defuse when needed, and try your luck!

## Features

- Interactive gameplay with randomized card draws.
- Smooth game state management with Redux.
- Backend logic implemented in Golang.
- Redis database used for real-time state storage and retrieval.
- Game restart and defuse mechanics to enhance gameplay.

## Tech Stack

- **Frontend**: ReactJS, Redux
- **Backend**: Golang
- **Database**: Redis

## Game Rules

1. **Cat Card**: If a cat card is drawn, it is removed from the deck.
2. **Exploding Kitten (Bomb)**: If the card is a bomb, the player loses the game immediately.
3. **Defusing Card**: Drawn defuse cards are removed from the deck. They can be used to defuse one bomb if drawn later.
4. **Shuffle Card**: If a shuffle card is drawn, the deck is refilled with 5 cards, and the game restarts.

## Live Demo

Try the game live here:
- **Frontend**: [Exploding Kitten Game (Live)](https://aman-emitrr-cat-app.netlify.app/)
- **Backend API**: [Exploding Kitten API (Live)](https://aman-emitrr-cat-app.onrender.com)


## Installation for running locally

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Golang](https://golang.org/)
- [Redis](https://redis.io/)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/exploding-kitten-game.git
   cd exploding-kitten-game

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install

3. **Backend Environment Variables**
   ```bash
   PORT=8080                       # Port for the backend server
   REDIS_DATABASE_ADDRESS=            # Redis server host
   REDIS_DATABASE_PASSWORD=                 # Redis server port


4. **Frontend Environment Variables**
   ```bash
   REACT_APP_BACKEND_URL=

5. **Start the backend server**
   ```bash
   cd backend
   go run main.go

6. **Start the frontend server**
   ```bash
   cd frontend
   npm run start

7. **Open your browser and go to http://localhost:3000.**

8. **Draw cards and try to avoid the bomb while using defuse and shuffle cards strategically!**







