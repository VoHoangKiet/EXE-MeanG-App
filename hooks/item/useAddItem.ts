import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "@/api/item.api";
import { Toast } from "@ant-design/react-native";

export function useAddItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      Toast.success("Thêm item thành công");
    },
  });
}
