package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"sort"
	"strconv"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/joho/godotenv"
)

var redisClient *redis.Client
var ctx = context.Background()

type LeaderboardEntry struct {
	Username string `json:"username"`
	GamesWon int    `json:"gamesWon"`
}

func main() {
	godotenv.Load();
	redisClient = redis.NewClient(&redis.Options{
		Addr: os.Getenv("REDIS_DB_ADDRESS"),
		Password: os.Getenv("REDIS_DB_PASSWORD"),
		DB: 0,
	})

	router := mux.NewRouter()
	router.HandleFunc("/api/leaderboard", getLeaderboard).Methods("GET")
	router.HandleFunc("/api/win", updateWins).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	})

	handler := c.Handler(router)

	port := os.Getenv("PORT")
	log.Println("Server starting on :8080...")
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func getLeaderboard(w http.ResponseWriter, r *http.Request) {
	entries, err := getLeaderboardData()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)
}

func updateWins(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	// Increment the user's win count by 1
	newWins, err := redisClient.HIncrBy(ctx, "leaderboard", username, 1).Result()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Fetch updated leaderboard
	entries, err := getLeaderboardData()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update the current user's entry with the new win count
	for i, entry := range entries {
		if entry.Username == username {
			entries[i].GamesWon = int(newWins)
			break
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)
}

func getLeaderboardData() ([]LeaderboardEntry, error) {
	leaderboard, err := redisClient.HGetAll(ctx, "leaderboard").Result()
	if err != nil {
		return nil, err
	}

	var entries []LeaderboardEntry
	for username, gamesWonStr := range leaderboard {
		gamesWon, err := strconv.Atoi(gamesWonStr)
		if err != nil {
			log.Printf("Error converting gamesWon for user %s: %v", username, err)
			continue
		}
		entries = append(entries, LeaderboardEntry{Username: username, GamesWon: gamesWon})
	}

	sort.Slice(entries, func(i, j int) bool {
		return entries[i].GamesWon > entries[j].GamesWon
	})

	return entries, nil
}