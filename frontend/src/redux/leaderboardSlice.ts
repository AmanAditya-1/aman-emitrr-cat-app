import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../config";

export interface LeaderboardEntry {
  username: string;
  gamesWon: number;
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  entries: [],
  loading: false,
  error: null,
};

export const fetchLeaderboard = createAsyncThunk(
  "leaderboard/fetchLeaderboard",
  async () => {
    const response = await fetch(API_ENDPOINTS.LEADERBOARD);
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard");
    }
    return response.json() as Promise<LeaderboardEntry[]>;
  }
);

export const updateLeaderboard = createAsyncThunk(
  "leaderboard/updateLeaderboard",
  async ({ username }: { username: string }) => {
    const response = await fetch(`${API_ENDPOINTS.WIN}?username=${username}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to update leaderboard");
    }
    return response.json() as Promise<LeaderboardEntry[]>;
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch leaderboard";
      })
      .addCase(updateLeaderboard.fulfilled, (state, action) => {
        state.entries = action.payload;
      });
  },
});

export default leaderboardSlice.reducer;
