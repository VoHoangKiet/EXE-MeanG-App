import api from ".";

export const createPayment = async (amount: number) => {
  const res = await api.post("/order/create", {
    amount,
  });
  return res.data;
};
