import { useQuery } from "@tanstack/react-query";
import { getItemById } from "@/api/item.api";

export const useItemById = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id),
  });
};
