import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";

interface User {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  department?: string | null;
  is_active?: boolean;
  last_login_at?: string | null;
  profile_picture?: string | null;
  created_at?: string;
  updated_at?: string;
  roles?: any[];
  permissions?: any[];
  name?: string; // Keep for backward compatibility if needed, or derived
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};


export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user"); // Adjust endpoint as needed, user said "get user api here" in dashboard but usually it's /user or /me. I'll assume /user based on standard conventions or check user previous code.
      // User request context: "get user api here which only uses the token... returns object { success: true, user: {...} }"
      // Assuming GET /user (or similar) returns this structure.
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = { ...state.user, ...action.payload.user };
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Assuming response structure: { success: true, user: {...}, ... }
        if (action.payload.success && action.payload.user) {
          state.user = { ...state.user, ...action.payload.user };
        } else if (action.payload.id) {
           // Fallback if payload IS the user object directly
           state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
