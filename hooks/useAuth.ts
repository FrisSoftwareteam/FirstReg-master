import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  const { user, token, isAuthenticated } = auth || { user: null, token: null, isAuthenticated: false };

  return {
    user,
    isLoading: false, 
    isAuthenticated,
    accessToken: token,
    idToken: null, 
  };
}
