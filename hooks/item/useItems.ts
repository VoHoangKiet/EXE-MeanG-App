import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/api/item.api";
import { Item } from "@/types/item.type";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useItems = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: () => getItems().then((res) => res.data),
    enabled: isLoggedIn,
  });
};