import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/profile.api";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Profile } from "@/types/profile.type";

export const useProfile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: () => getProfile().then((res) => res.data),
    enabled: isLoggedIn,
  });
};
